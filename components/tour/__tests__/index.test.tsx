import React, { useRef, useEffect } from 'react';
import Tour from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';
import panelRender from '../panelRender';

describe('Tour', () => {
  mountTest(Tour);
  rtlTest(Tour);

  it('single', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>
          <Tour
            steps={[
              {
                title: 'cover title',
                description: 'cover description.',
                target: () => coverBtnRef.current!,
              },
            ]}
          />
        </>
      );
    };
    const { getByText, container } = render(<App />);
    expect(getByText('cover title')).toBeTruthy();
    expect(getByText('cover description.')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('steps is empty', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>
          <Tour steps={[]} />
          <Tour />
        </>
      );
    };
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('steps props stepRender', () => {
    const onClickMock = jest.fn();
    const stepRenderMock = jest.fn();
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>
          <Tour
            type="default"
            stepRender={stepRenderMock}
            steps={[
              {
                title: 'With Cover',
                nextButtonProps: {
                  onClick: onClickMock,
                },
              },
              {
                title: 'With Cover',
                nextButtonProps: {
                  onClick: onClickMock,
                },
                prevButtonProps: {
                  onClick: onClickMock,
                },
              },
              {
                title: 'With Cover',
                prevButtonProps: {
                  onClick: onClickMock,
                },
                nextButtonProps: {
                  onClick: onClickMock,
                },
              },
            ]}
          />
        </>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(onClickMock).toHaveBeenCalledTimes(5);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('button props onClick', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      const [btnName, steBtnName] = React.useState<string>('defaultBtn');
      return (
        <>
          <span id="btnName">{btnName}</span>
          <button disabled ref={coverBtnRef} type="button">
            target
          </button>

          <Tour
            steps={[
              {
                title: '',
                description: '',
                target: () => coverBtnRef.current!,
                nextButtonProps: {
                  onClick: () => steBtnName('nextButton'),
                },
              },
              {
                title: '',
                target: () => coverBtnRef.current!,
                prevButtonProps: {
                  onClick: () => steBtnName('prevButton'),
                },
                nextButtonProps: {
                  onClick: () => steBtnName('finishButton'),
                },
              },
            ]}
          />
        </>
      );
    };
    const { container } = render(<App />);
    expect(container.querySelector('#btnName')).toHaveTextContent('defaultBtn');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(container.querySelector('#btnName')).toHaveTextContent('nextButton');
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(container.querySelector('#btnName')).toHaveTextContent('prevButton');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(container.querySelector('#btnName')).toHaveTextContent('finishButton');
  });

  it('Primary', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>

          <Tour
            type="primary"
            steps={[
              {
                title: 'primary title',
                description: 'primary description.',
                target: () => coverBtnRef.current!,
              },
            ]}
          />
        </>
      );
    };
    const { getByText, container } = render(<App />);
    expect(getByText('primary description.')).toBeTruthy();
    expect(container.querySelector('.ant-tour')).toHaveClass('ant-tour-primary');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('basic', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      const placementBtnRef = useRef<HTMLButtonElement>(null);

      const [show, setShow] = React.useState<boolean>();

      useEffect(() => {
        if (show === false) {
          setShow(true);
        }
      }, [show]);

      return (
        <>
          <div>
            <button
              type="button"
              onClick={() => {
                setShow(false);
              }}
            >
              Show
            </button>
            <button disabled ref={coverBtnRef} type="button">
              Cover
            </button>
            <button disabled ref={placementBtnRef} type="button">
              Placement
            </button>
          </div>

          {show && (
            <Tour
              steps={[
                {
                  title: 'Show in Center',
                  description: 'Here is the content of Tour.',
                  target: null,
                },
                {
                  title: 'With Cover',
                  description: 'Here is the content of Tour.',
                  target: () => coverBtnRef.current!,
                  cover: (
                    <img
                      alt="tour.png"
                      src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                    />
                  ),
                },
                {
                  title: 'Adjust Placement',
                  description: 'Here is the content of Tour which show on the right.',
                  placement: 'right',
                  target: () => placementBtnRef.current!,
                },
              ]}
            />
          )}
        </>
      );
    };
    const { getByText, container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Show' }));
    expect(getByText('Show in Center')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('Here is the content of Tour.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('Adjust Placement')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(container.querySelector('.ant-tour')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });
  it('panelRender should correct render when total is undefined', () => {
    expect(() => {
      panelRender({ total: undefined, title: <div>test</div> }, 0, 'default');
    }).not.toThrow();
  });
});
