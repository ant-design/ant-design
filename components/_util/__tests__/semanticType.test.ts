import type { GenerateSemantic } from '../hooks/semanticType';

type MenuSemanticType = {
  classNames: {
    root?: string;
    popup?: string | { root?: string };
    popup2?: { root?: string };
  };
  styles: {
    root?: React.CSSProperties;
    popup?: { root?: React.CSSProperties };
  };
};

type MenuClassNamesType = GenerateSemantic<MenuSemanticType, MenuProps>;
interface MenuProps {
  disabled?: boolean;
  classNames?: MenuClassNamesType['classNames'] | MenuClassNamesType['classNamesFn'];
  styles?: MenuClassNamesType['styles'] | MenuClassNamesType['stylesFn'];
  classNamesNoString?: MenuClassNamesType['classNamesNoString'];
}

describe('semanticType', () => {
  it('test scrollTo', async () => {
    const menuConfig: MenuProps = {
      classNames: { root: 'root-class', popup: { root: 'popup-root-class' } },
      styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
      classNamesNoString: { popup: { root: 'popup-root-class' } },
    };
    const menuConfig3: MenuProps = {
      classNames: { root: 'root-class', popup: 'string', popup2: { root: 'root' } },
      styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
    };

    const menuConfig2: MenuProps = {
      classNames: ({ props }): MenuClassNamesType['classNames'] => ({
        root: props ? 'a' : 'b',
        popup: { root: 'c' },
      }),
      styles: ({ props }): MenuClassNamesType['styles'] => ({
        root: { color: props ? 'pink' : 'gray' },
        popup: { root: { backgroundColor: 'black' } },
      }),
    };

    expect(menuConfig).toBeTruthy();
    expect(menuConfig2).toBeTruthy();
    expect(menuConfig3).toBeTruthy();
  });
});
