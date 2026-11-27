import { supabase } from './supabase'
import type { Todo } from '../types'

/**
 * Where todos live.
 *
 * Two implementations sit behind this: `localStore` (browser, synchronous,
 * used by signed-out guests) and `createRemoteStore(userId)` (Postgres, async,
 * used once someone signs in). `useTodos` picks one and never cares which.
 *
 * Every method rejects on failure rather than swallowing the error — the hook
 * needs to know a write didn't land so it can roll the UI back.
 */
export type TodoStore = {
  load(): Promise<Todo[]>
  add(todo: Todo): Promise<void>
  addMany(todos: Todo[]): Promise<void>
  setDone(id: string, done: boolean): Promise<void>
  remove(id: string): Promise<void>
  removeMany(ids: string[]): Promise<void>
}

/* ============================================================
   Local — the original localStorage behaviour, unchanged
   ============================================================ */

const STORAGE_KEY = 'todo-cat.todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.text === 'string' &&
    typeof t.done === 'boolean' &&
    typeof t.createdAt === 'number'
  )
}

/**
 * Read persisted todos. Anything unparseable is treated as "no todos" rather
 * than as a crash — a corrupted key in localStorage shouldn't brick the app.
 */
export function readLocalTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTodo) : []
  } catch {
    return []
  }
}

export function clearLocalTodos() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to do — if we can't remove it we also couldn't have written it.
  }
}

/* --- Import offer bookkeeping ---------------------------------
   Remembers which accounts have already said no to importing the
   device's todos, so the banner asks once per account instead of
   on every single page load.
   ------------------------------------------------------------ */

const DISMISSED_KEY = 'todo-cat.import-dismissed'

function readDismissed(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(DISMISSED_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : []
  } catch {
    return []
  }
}

export function wasImportDismissed(userId: string): boolean {
  return readDismissed().includes(userId)
}

export function dismissImport(userId: string) {
  try {
    const next = [...new Set([...readDismissed(), userId])]
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(next))
  } catch {
    // Worst case the banner asks again next time. Not worth failing over.
  }
}

function writeLocalTodos(todos: Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // Private-mode quota errors and friends: degrade to in-memory only.
  }
}

/**
 * Local mutations are read-modify-write. That's wasteful in principle and
 * completely free in practice — the list is tiny and localStorage is sync —
 * and it keeps the shape identical to the remote store's per-row operations.
 */
export const localStore: TodoStore = {
  async load() {
    return readLocalTodos()
  },
  async add(todo) {
    writeLocalTodos([...readLocalTodos(), todo])
  },
  async addMany(todos) {
    writeLocalTodos([...readLocalTodos(), ...todos])
  },
  async setDone(id, done) {
    writeLocalTodos(readLocalTodos().map((t) => (t.id === id ? { ...t, done } : t)))
  },
  async remove(id) {
    writeLocalTodos(readLocalTodos().filter((t) => t.id !== id))
  },
  async removeMany(ids) {
    const doomed = new Set(ids)
    writeLocalTodos(readLocalTodos().filter((t) => !doomed.has(t.id)))
  },
}

/* ============================================================
   Remote — Supabase, one row per todo
   ============================================================ */

type TodoRow = {
  id: string
  text: string
  done: boolean
  created_at: string
}

/**
 * Postgres stores an ISO timestamptz; the app has always used epoch millis.
 * Translating here means `src/types.ts` and every component stay untouched.
 */
function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    text: row.text,
    done: row.done,
    createdAt: Date.parse(row.created_at),
  }
}

function todoToRow(todo: Todo, userId: string) {
  return {
    id: todo.id,
    user_id: userId,
    text: todo.text,
    done: todo.done,
    created_at: new Date(todo.createdAt).toISOString(),
  }
}

/**
 * `user_id` is passed explicitly on insert even though the column defaults to
 * `auth.uid()`. Belt and braces: the RLS `with check` would reject a mismatch
 * anyway, so the two can never silently disagree.
 *
 * No `.eq('user_id', ...)` filters appear below. They'd be redundant — RLS
 * scopes every statement to the caller's own rows at the database level, and
 * writing the filter by hand invites the assumption that it's what's keeping
 * you safe.
 */
export function createRemoteStore(userId: string): TodoStore {
  function client() {
    if (!supabase) throw new Error('Supabase is not configured')
    return supabase
  }

  async function run(promise: PromiseLike<{ error: { message: string } | null }>) {
    const { error } = await promise
    if (error) throw new Error(error.message)
  }

  return {
    async load() {
      const { data, error } = await client()
        .from('todos')
        .select('id, text, done, created_at')
        .order('created_at', { ascending: true })
      if (error) throw new Error(error.message)
      return (data ?? []).map(rowToTodo)
    },
    async add(todo) {
      await run(client().from('todos').insert(todoToRow(todo, userId)))
    },
    async addMany(todos) {
      if (todos.length === 0) return
      await run(client().from('todos').insert(todos.map((t) => todoToRow(t, userId))))
    },
    async setDone(id, done) {
      await run(client().from('todos').update({ done }).eq('id', id))
    },
    async remove(id) {
      await run(client().from('todos').delete().eq('id', id))
    },
    async removeMany(ids) {
      if (ids.length === 0) return
      await run(client().from('todos').delete().in('id', ids))
    },
  }
}
