/**
 * @import {Nodes, Parents} from 'hast'
 */

/**
 * Get the plain-text value of a hast node.
 *
 * @param {Nodes} node
 *   Node to serialize.
 * @returns {string}
 *   Serialized node.
 */
export function toString(node) {
  // “The concatenation of data of all the Text node descendants of the context
  // object, in tree order.”
  if ('children' in node) {
    return all(node)
  }

  // “Context object’s data.”
  return 'value' in node ? node.value : ''
}

/**
 * @param {Nodes} node
 *   Node.
 * @returns {string}
 *   Serialized node.
 */
function one(node) {
  if (node.type === 'text') {
    return node.value
  }

  return 'children' in node ? all(node) : ''
}

/**
 * @param {Parents} node
 *   Node.
 * @returns {string}
 *   Serialized node.
 */
function all(node) {
  let index = -1
  /** @type {Array<string>} */
  const result = []

  while (++index < node.children.length) {
    result[index] = one(node.children[index])
  }

  return result.join('')
}
