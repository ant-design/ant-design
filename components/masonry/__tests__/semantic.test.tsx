import type { MasonryProps } from '..';

describe('Masonry.Semantic', () => {
  it('should support classNames and styles props types', () => {
    const customClassNames = {
      root: 'custom-root-class',
      item: 'custom-item-class',
    };

    const customStyles = {
      root: {
        border: '2px solid red',
        backgroundColor: 'blue',
      },
      item: {
        padding: '10px',
        margin: '5px',
      },
    };

    const classNamesFn = ({ props }: { props: MasonryProps }) => ({
      root: `dynamic-root-${typeof props.columns === 'number' ? props.columns : 'default'}`,
      item: 'dynamic-item',
    });

    const stylesFn = ({ props }: { props: MasonryProps }) => ({
      root: {
        backgroundColor: props.columns ? 'lightblue' : 'lightgray',
      },
      item: {
        padding: '12px',
      },
    });

    // These should compile without TypeScript errors
    expect(customClassNames.root).toBe('custom-root-class');
    expect(customClassNames.item).toBe('custom-item-class');
    expect(customStyles.root.border).toBe('2px solid red');
    expect(customStyles.item.padding).toBe('10px');

    // Function types should also work
    expect(typeof classNamesFn).toBe('function');
    expect(typeof stylesFn).toBe('function');

    // Test the function calls
    const mockProps = { columns: 3 } as MasonryProps;
    const dynamicClassNames = classNamesFn({ props: mockProps });
    const dynamicStyles = stylesFn({ props: mockProps });

    expect(dynamicClassNames.root).toBe('dynamic-root-3');
    expect(dynamicStyles.root.backgroundColor).toBe('lightblue');
  });

  it('should support function form classNames and styles with different props', () => {
    // Test function behavior with different prop values
    const classNamesFn = ({ props }: { props: MasonryProps }) => ({
      root: `cols-${typeof props.columns === 'number' ? props.columns : 'responsive'}`,
      item: `gutter-${Array.isArray(props.gutter) ? props.gutter[0] : props.gutter || 0}`,
    });

    const stylesFn = ({ props }: { props: MasonryProps }) => {
      const isWideLayout = typeof props.columns === 'number' && props.columns >= 4;
      return {
        root: {
          backgroundColor: isWideLayout ? '#e6f7ff' : '#f6ffed',
          padding: isWideLayout ? '24px' : '16px',
        },
        item: {
          borderRadius: isWideLayout ? '8px' : '4px',
        },
      };
    };

    // Test with columns = 4 (wide layout)
    const wideProps = { columns: 4, gutter: 16 } as MasonryProps;
    const wideClassNames = classNamesFn({ props: wideProps });
    const wideStyles = stylesFn({ props: wideProps });

    expect(wideClassNames.root).toBe('cols-4');
    expect(wideClassNames.item).toBe('gutter-16');
    expect(wideStyles.root.backgroundColor).toBe('#e6f7ff');
    expect(wideStyles.root.padding).toBe('24px');
    expect(wideStyles.item.borderRadius).toBe('8px');

    // Test with columns = 2 (narrow layout)
    const narrowProps = { columns: 2, gutter: [8, 12] } as MasonryProps;
    const narrowClassNames = classNamesFn({ props: narrowProps });
    const narrowStyles = stylesFn({ props: narrowProps });

    expect(narrowClassNames.root).toBe('cols-2');
    expect(narrowClassNames.item).toBe('gutter-8');
    expect(narrowStyles.root.backgroundColor).toBe('#f6ffed');
    expect(narrowStyles.root.padding).toBe('16px');
    expect(narrowStyles.item.borderRadius).toBe('4px');

    // Test with responsive columns
    const responsiveProps = { columns: { xs: 1, md: 3 }, gutter: 0 } as MasonryProps;
    const responsiveClassNames = classNamesFn({ props: responsiveProps });
    const responsiveStyles = stylesFn({ props: responsiveProps });

    expect(responsiveClassNames.root).toBe('cols-responsive');
    expect(responsiveClassNames.item).toBe('gutter-0');
    expect(responsiveStyles.root.backgroundColor).toBe('#f6ffed');
  });
});
