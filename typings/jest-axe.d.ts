declare module 'jest-axe' {
  export type JestAxeConfigureOptions = import('axe-core').RunOptions & {
    globalOptions?: import('axe-core').Spec;
    impactLevels?: import('axe-core').ImpactValue[];
  };

  export type JestAxe = (
    html: Element | string,
    options?: import('axe-core').RunOptions,
  ) => Promise<import('axe-core').AxeResults>;

  export interface AssertionsResult {
    actual: import('axe-core').Result[];
    message: () => string;
    pass: boolean;
  }

  export const axe: JestAxe;
  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe;
  export const toHaveNoViolations: {
    toHaveNoViolations: (results?: Partial<import('axe-core').AxeResults>) => AssertionsResult;
  };
}
