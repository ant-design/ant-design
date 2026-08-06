import { isDocument } from '../is';

describe('is', () => {
  it('detects documents when the global Document constructor is unavailable', () => {
    const originalDocument = globalThis.Document;

    Reflect.deleteProperty(globalThis, 'Document');

    try {
      expect(isDocument(document)).toBe(true);
    } finally {
      globalThis.Document = originalDocument;
    }
  });
});
