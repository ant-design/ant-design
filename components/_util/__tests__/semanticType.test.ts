import type { GenerateSemantic } from '../hooks/semanticType';

type DemoSemanticType = {
  classNames: {
    root?: string;
    popup?: string | { root?: string };
  };
  styles: {
    root?: React.CSSProperties;
    popup?: { root?: React.CSSProperties };
  };
};

type DemoClassNamesType = GenerateSemantic<DemoSemanticType, DemoProps>;
interface DemoProps {
  disabled?: boolean;
  classNames?: DemoClassNamesType['classNamesAndFn'];
  styles?: DemoClassNamesType['stylesAndFn'];
  classNamesNoString?: DemoClassNamesType['classNamesNoString'];
}

describe('semanticType', () => {
  it('type test', async () => {
    const demoConfig: DemoProps = {
      classNames: { root: 'root-class', popup: { root: 'popup-root-class' } },
      styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
      classNamesNoString: { popup: { root: 'popup-root-class' } },
    };
    const demoConfig3: DemoProps = {
      classNames: { root: 'root-class', popup: 'string' },
      styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
    };

    const demoConfig2: DemoProps = {
      classNames: ({ props }): DemoClassNamesType['classNames'] => ({
        root: props ? 'a' : 'b',
        popup: { root: 'c' },
      }),
      styles: ({ props }): DemoClassNamesType['styles'] => ({
        root: { color: props ? 'pink' : 'gray' },
        popup: { root: { backgroundColor: 'black' } },
      }),
    };

    expect(demoConfig).toBeTruthy();
    expect(demoConfig2).toBeTruthy();
    expect(demoConfig3).toBeTruthy();
  });
});
