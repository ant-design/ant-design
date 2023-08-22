/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef } from 'react';
import Tour from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';
import type { TourProps } from '../interface';

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
    const { getByText, baseElement } = render(<App />);
    expect(getByText('cover title')).toBeTruthy();
    expect(getByText('cover description.')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });

  it('steps props indicatorsRender', () => {
    const onClickMock = jest.fn();
    const indicatorsRenderMock = jest.fn();
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>
          <Tour
            type="default"
            indicatorsRender={indicatorsRenderMock}
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
    const { baseElement } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(onClickMock).toHaveBeenCalledTimes(5);
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement } = render(<App />);
    expect(baseElement.querySelector('#btnName')).toHaveTextContent('defaultBtn');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(baseElement.querySelector('#btnName')).toHaveTextContent('nextButton');
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(baseElement.querySelector('#btnName')).toHaveTextContent('prevButton');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(baseElement.querySelector('#btnName')).toHaveTextContent('finishButton');
    expect(baseElement).toMatchSnapshot();
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
    const { getByText, baseElement } = render(<App />);
    expect(getByText('primary description.')).toBeTruthy();
    expect(baseElement.querySelector('.ant-tour-content')?.parentElement).toHaveClass(
      'ant-tour-primary',
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('step support Primary', () => {
    const App: React.FC = () => {
      const coverBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button disabled ref={coverBtnRef} type="button">
            Cover
          </button>

          <Tour
            type="default"
            steps={[
              {
                title: 'cover title',
                description: 'cover description.',
                target: () => coverBtnRef.current!,
              },
              {
                title: 'primary title',
                description: 'primary description.',
                target: () => coverBtnRef.current!,
                type: 'primary',
              },
            ]}
          />
        </>
      );
    };
    const { getByText, container, baseElement } = render(<App />);
    expect(getByText('cover description.')).toBeTruthy();
    expect(container.querySelector('.ant-tour-primary .ant-tour-content')).toBeFalsy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('primary description.')).toBeTruthy();
    expect(container.querySelector('.ant-tour-primary .ant-tour-content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
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
    const { getByText, container, baseElement } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Show' }));
    expect(getByText('Show in Center')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('Here is the content of Tour.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('Adjust Placement')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(container.querySelector('.ant-tour')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('panelRender should correct render when total is undefined or null', () => {
    [undefined, null].forEach((total: undefined) => {
      const { container } = render(<Tour open steps={[{ title: <div>test</div>, total }]} />);
      expect(
        container.querySelector<HTMLDivElement>('.ant-tour-content .ant-tour-indicators'),
      ).toBeFalsy();
    });
  });

  it('panelRender should correct render when title is undefined or null', () => {
    [undefined, null].forEach((title) => {
      const { container } = render(<Tour open steps={[{ title, total: 1 }]} />);
      expect(
        container.querySelector<HTMLDivElement>('.ant-tour-content .ant-tour-header'),
      ).toBeFalsy();
    });
  });

  it('custom step pre btn & next btn className & style', () => {
    const App: React.FC = () => (
      <Tour
        steps={[
          {
            title: 'Show in Center',
            description: 'Here is the content of Tour.',
            nextButtonProps: {
              className: 'customClassName',
              style: {
                backgroundColor: 'rgb(69,69,255)',
              },
            },
          },
          {
            title: 'With Cover',
            description: 'Here is the content of Tour.',
            cover: (
              <img
                alt="tour.png"
                src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
              />
            ),
          },
        ]}
      />
    );

    const { container } = render(<App />);
    // className
    expect(screen.getByRole('button', { name: 'Next' }).className.includes('customClassName')).toBe(
      true,
    );
    // style
    expect(screen.getByRole('button', { name: 'Next' }).style.backgroundColor).toEqual(
      'rgb(69, 69, 255)',
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('custom indicator', () => {
    const steps: TourProps['steps'] = [
      {
        title: 'Upload File',
        description: 'Put your files here.',
      },
      {
        title: 'Save',
        description: 'Save your changes.',
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
      },
    ];
    const App: React.FC = () => (
      <Tour
        open
        steps={steps}
        indicatorsRender={(current, total) => (
          <span className="custom-indicator">
            {current + 1} / {total}
          </span>
        )}
      />
    );
    const { container } = render(<App />);
    expect(container.querySelector<HTMLSpanElement>('.custom-indicator')).toBeTruthy();
  });

  it('controlled current', () => {
    const App: React.FC = () => {
      const [current, setCurrent] = React.useState(0);
      return (
        <>
          <div>
            <button
              type="button"
              onClick={() => {
                setCurrent(1);
              }}
            >
              SetCurrent
            </button>
          </div>

          <Tour
            open
            current={current}
            steps={[
              {
                title: 'Show in Center',
                description: 'Here is the content of Tour.',
              },
              {
                title: 'Primary title',
                description: 'Primary description.',
                type: 'primary',
              },
            ]}
            onChange={setCurrent}
          />
        </>
      );
    };
    const { getByText, container, baseElement } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'SetCurrent' }));
    expect(getByText('Primary description.')).toBeTruthy();
    expect(container.querySelector('.ant-tour-primary .ant-tour-content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
