// Inject in __mocks__/@rc-component/trigger.tsx
declare var triggerProps: import('@rc-component/trigger').TriggerProps;

// Inject in tests/setupPuppeteer.ts
declare var browser: import('puppeteer').Browser;
declare var page: import('puppeteer').Page;
declare var resetPage: () => Promise<void>;
declare var testConfig: Record<string, any>;
