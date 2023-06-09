import useData from '../hooks/useData';

const dataSource = [
  { key: 'a', title: 'a' },
  { key: 'b', title: 'b' },
  { key: 'c', title: 'c' },
  { key: 'd', title: 'd' },
];

describe('useData', () => {
  const [mergedDataSource, leftDataSource, rightDataSource] = useData(
    dataSource,
    (record) => record.key,
  );
  expect(mergedDataSource).toEqual([
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c' },
    { key: 'd', title: 'd' },
  ]);
  expect(leftDataSource).toEqual([
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c' },
    { key: 'd', title: 'd' },
  ]);
  expect(rightDataSource).toEqual([]);
});
