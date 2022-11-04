import React from 'react';
import { fireEvent, render, waitFakeTimer, triggerResize } from '../../../tests/utils';
import PageHeader from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Breadcrumb from '../../breadcrumb';
import ConfigProvider from '../../config-provider';

describe('PageHeader', () => {
  mountTest(PageHeader);
  rtlTest(PageHeader);

  const mockGetBoundingClientRect = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

  beforeAll(() => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100 } as DOMRect);
  });

  afterAll(() => {
    mockGetBoundingClientRect.mockRestore();
  });

  it('pageHeader should not contain back it back', () => {
    const routes = [
      { path: 'index', breadcrumbName: 'First-level Menu' },
      { path: 'first', breadcrumbName: 'Second-level Menu' },
      { path: 'second', breadcrumbName: 'Third-level Menu' },
    ];
    const { container } = render(<PageHeader title="Page Title" breadcrumb={{ routes }} />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb', () => {
    const routes = [{ path: 'index', breadcrumbName: 'First-level Menu' }];
    const { container } = render(<PageHeader title="Page Title" breadcrumb={{ routes }} />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb (component)', () => {
    const routes = [{ path: 'index', breadcrumbName: 'First-level Menu' }];
    const { container } = render(
      <PageHeader title="Page Title" breadcrumb={<Breadcrumb routes={routes} />} />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender', () => {
    const { container } = render(
      <PageHeader title="Page Title" breadcrumbRender={() => <div id="test">test</div>} />,
    );
    expect(container.querySelectorAll('#test')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender return false', () => {
    const { container } = render(<PageHeader title="Page Title" breadcrumbRender={() => false} />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader do not has title', () => {
    const routes = [{ path: 'index', breadcrumbName: 'First-level Menu' }];
    const { container } = render(<PageHeader breadcrumb={{ routes }}>test</PageHeader>);
    expect(container.querySelector('.ant-page-header-heading-lef')).toBeFalsy();
    expect(container.querySelector('.ant-page-header-heading')).toBeFalsy();
  });

  it('pageHeader should no contain back', () => {
    const { container } = render(<PageHeader title="Page Title" backIcon={false} />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should contain back it back', () => {
    const callback = jest.fn(() => true);
    const { container } = render(<PageHeader title="Page Title" onBack={callback} />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', () => {
    const callback = jest.fn(() => true);
    const { container } = render(<PageHeader title="Page Title" onBack={callback} />);
    fireEvent.click(container.querySelector('div.ant-page-header-back-button')!);
    expect(callback).toHaveBeenCalled();
  });

  it('pageHeader should support className', () => {
    const { container } = render(
      <PageHeader title="Page Title" className="not-works" backIcon={false} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('pageHeader should not render blank dom', () => {
    const { container } = render(<PageHeader title={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('breadcrumbs and back icon can coexist', () => {
    const routes = [
      { path: 'index', breadcrumbName: 'First-level Menu' },
      { path: 'first', breadcrumbName: 'Second-level Menu' },
      { path: 'second', breadcrumbName: 'Third-level Menu' },
    ];
    const { container, rerender } = render(<PageHeader title="Title" breadcrumb={{ routes }} />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    rerender(<PageHeader title="Title" breadcrumb={{ routes }} onBack={() => {}} />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
  });

  it('pageHeader should render correctly int RTL direction', () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <PageHeader title="Page Title" />
      </ConfigProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('change container width', async () => {
    jest.useFakeTimers();
    const { container } = render(<PageHeader title="Page Title" extra="extra" />);
    triggerResize(container.firstChild as HTMLDivElement);
    await waitFakeTimer();
    expect(container.querySelector('div.ant-page-header')).toHaveClass('ant-page-header-compact');
    jest.useRealTimers();
  });
});
