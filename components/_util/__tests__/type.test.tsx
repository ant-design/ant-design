import * as React from 'react';

import type { GetProp, GetProps, GetRef } from '../type';

describe('type', () => {
  class CC extends React.Component<{ bamboo?: number }> {
    render() {
      return this.props.bamboo;
    }
  }

  interface TestRef {
    nativeElement: HTMLDivElement;
  }

  const RefFC = React.forwardRef<TestRef, { bamboo?: number }>((props, ref) => {
    const eleRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      nativeElement: eleRef.current!,
    }));

    return <div ref={eleRef}>{props.bamboo}</div>;
  });

  describe('GetProps', () => {
    it('FC', () => {
      const FC = (props: { bamboo: number }) => props.bamboo;
      type Props = GetProps<typeof FC>;
      const props: Props = { bamboo: 123 };

      expect(FC).toBeTruthy();
      expect(props).toBeTruthy();
    });

    it('CC', () => {
      type Props = GetProps<typeof CC>;
      const props: Props = { bamboo: 123 };

      expect(props).toBeTruthy();
    });

    it('RefFc', () => {
      type Props = GetProps<typeof RefFC>;
      const props: Props = { bamboo: 123 };

      expect(props).toBeTruthy();
    });
  });

  describe('GetRef', () => {
    it('CC', () => {
      type Ref = GetRef<CC>;
      const ref = React.createRef<Ref>();

      expect(<CC ref={ref} />).toBeTruthy();
    });

    it('RefFC', () => {
      type Ref = GetRef<typeof RefFC>;
      const ref = React.createRef<Ref>();

      expect(<RefFC ref={ref} />).toBeTruthy();
    });

    it('Support ForwardRefExoticComponent type', () => {
      interface InnerProps {
        test: number;
      }
      interface InnerRef {
        bamboo: number;
      }
      type TestComponent = React.ForwardRefExoticComponent<
        InnerProps & React.RefAttributes<InnerRef>
      >;
      type ExtractedTestRef = GetRef<TestComponent>;

      const a: ExtractedTestRef = { bamboo: 123 };
      expect(a).toBeTruthy();
    });
  });

  describe('GetProp', () => {
    it('optional', () => {
      const Optional = (props: { list?: { bamboo: string }[] }) => props.list?.length;
      type ListItemType = GetProp<typeof Optional, 'list'>[number];

      const item: ListItemType = { bamboo: '123' };
      expect(Optional).toBeTruthy();
      expect(item).toBeTruthy();
    });

    it('interface directly', () => {
      interface Props {
        bamboo: number;
      }

      type BambooType = GetProp<Props, 'bamboo'>;
      const bamboo: BambooType = 123;
      expect(bamboo).toBeTruthy();
    });
  });
});
