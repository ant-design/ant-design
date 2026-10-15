import React from 'react';

import type { SelectProps } from '..';
import Select from '..';
import accessibilityDemoTest, { accessibilityTest } from '../../../tests/shared/accessibilityTest';
import { render } from '../../../tests/utils';

accessibilityDemoTest('select', { disabledRules: ['label', 'button-name'] });

// https://github.com/ant-design/ant-design/issues/11600
describe('Select popup a11y', () => {
  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom', disabled: true },
  ];

  const groupedOptions: SelectProps['options'] = [
    {
      label: 'Manager',
      title: 'manager',
      options: [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
      ],
    },
    {
      label: 'Engineer',
      title: 'engineer',
      options: [{ value: 'chloe', label: 'Chloe' }],
    },
  ];

  // Render the popup next to the selector so that axe checks the listbox together with the combobox
  const OpenSelect: React.FC<SelectProps> = (props) => (
    <div>
      <Select
        aria-label="Person"
        open
        options={options}
        getPopupContainer={(trigger) => trigger.parentElement!}
        {...props}
      />
    </div>
  );

  it('should link the combobox to a listbox of options', () => {
    const { container } = render(<OpenSelect defaultValue="lucy" virtual={false} />);

    const combobox = container.querySelector<HTMLElement>('[role="combobox"]')!;
    const listbox = container.querySelector<HTMLElement>('[role="listbox"]')!;

    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);

    const optionNodes = listbox.querySelectorAll('[role="option"]');
    expect(optionNodes).toHaveLength(3);
    expect(optionNodes[0]).toHaveAttribute('aria-selected', 'false');
    expect(optionNodes[1]).toHaveAttribute('aria-selected', 'true');
    expect(optionNodes[2]).toHaveAttribute('aria-disabled', 'true');
  });

  it('should point aria-activedescendant to an option in virtual mode', () => {
    const { container } = render(<OpenSelect defaultValue="lucy" />);

    const combobox = container.querySelector<HTMLElement>('[role="combobox"]')!;
    const listbox = container.querySelector<HTMLElement>('[role="listbox"]')!;
    const activeId = combobox.getAttribute('aria-activedescendant')!;

    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
    expect(listbox.querySelector(`[id="${activeId}"]`)).toHaveAttribute('role', 'option');
    expect(listbox.querySelector('[role="option"][aria-selected="true"]')).toHaveTextContent(
      'lucy',
    );
  });

  it('should mark every selected option in multiple mode', () => {
    const { container } = render(
      <OpenSelect mode="multiple" defaultValue={['jack', 'lucy']} virtual={false} />,
    );

    const selectedOptions = container.querySelectorAll(
      '[role="listbox"] [role="option"][aria-selected="true"]',
    );
    expect(Array.from(selectedOptions).map((node) => node.getAttribute('title'))).toEqual([
      'Jack',
      'Lucy',
    ]);
  });

  describe('single', () => {
    accessibilityTest(() => <OpenSelect defaultValue="lucy" />);
  });

  describe('single without virtual list', () => {
    accessibilityTest(() => <OpenSelect defaultValue="lucy" virtual={false} />);
  });

  describe('single with search', () => {
    accessibilityTest(() => <OpenSelect showSearch />);
  });

  describe('multiple', () => {
    accessibilityTest(() => <OpenSelect mode="multiple" defaultValue={['lucy']} />);
  });

  describe('tags', () => {
    accessibilityTest(() => (
      <OpenSelect mode="tags" options={options.filter((option) => !option.disabled)} />
    ));
  });

  describe('grouped options without virtual list', () => {
    accessibilityTest(() => <OpenSelect options={groupedOptions} virtual={false} />);
  });
});
