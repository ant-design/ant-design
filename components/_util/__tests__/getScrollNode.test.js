/**
 * @jest-environment node
 */
import getScroll from '../getScroll';

const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

describe('getScroll node', () => {
  it('getScroll return 0 in node environment', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      expect(getScroll(null, true)).toBe(0);
      expect(getScroll(null, false)).toBe(0);
    }));
});
