import React from 'react';
import Upload from '..';
import type { UploadFile } from '..';
import { render, waitFor } from '../../../tests/utils';

function createFile(): UploadFile {
  return {
    uid: 'photo',
    name: 'photo.png',
    status: 'done',
    originFileObj: Object.assign(new File(['image'], 'photo.png', { type: 'image/png' }), {
      uid: 'photo',
    }),
  };
}

describe('Upload thumbnails with frozen controlled files', () => {
  it('generates a preview for a mutable file as a control', async () => {
    const previewFile = jest.fn().mockResolvedValue('data:image/png;base64,aW1hZ2U=');
    const { container } = render(
      <Upload fileList={[createFile()]} listType="picture" previewFile={previewFile} />,
    );
    await waitFor(() =>
      expect(container.querySelector('img')?.getAttribute('src')).toBe(
        'data:image/png;base64,aW1hZ2U=',
      ),
    );
    expect(previewFile).toHaveBeenCalledTimes(1);
  });

  it.each(['picture', 'picture-card', 'picture-circle'] as const)(
    'renders %s with a frozen file',
    async (listType) => {
      const file = Object.freeze(createFile());
      const previewFile = jest.fn().mockResolvedValue('data:image/png;base64,aW1hZ2U=');
      const { container } = render(
        <Upload fileList={[file]} listType={listType} previewFile={previewFile} />,
      );
      await waitFor(() =>
        expect(container.querySelector('img')?.getAttribute('src')).toBe(
          'data:image/png;base64,aW1hZ2U=',
        ),
      );
      expect(file.thumbUrl).toBeUndefined();
    },
  );

  it('reuses the thumbnail when the parent replaces the fileList array', async () => {
    const file = Object.freeze(createFile());
    const previewFile = jest.fn().mockResolvedValue('data:image/png;base64,aW1hZ2U=');
    const { container, rerender } = render(
      <Upload fileList={[file]} listType="picture" previewFile={previewFile} />,
    );
    await waitFor(() =>
      expect(container.querySelector('img')?.getAttribute('src')).toBe(
        'data:image/png;base64,aW1hZ2U=',
      ),
    );
    rerender(<Upload fileList={[file]} listType="picture" previewFile={previewFile} />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'data:image/png;base64,aW1hZ2U=',
    );
    expect(previewFile).toHaveBeenCalledTimes(1);
    expect(file.thumbUrl).toBeUndefined();
  });

  it('generates a new thumbnail for a replacement frozen file with the same uid', async () => {
    const file = Object.freeze(createFile());
    const replacement = Object.freeze(createFile());
    const previewFile = jest
      .fn()
      .mockResolvedValueOnce('data:image/png;base64,b2xk')
      .mockResolvedValueOnce('data:image/png;base64,bmV3');
    const { container, rerender } = render(
      <Upload fileList={[file]} listType="picture" previewFile={previewFile} />,
    );
    await waitFor(() =>
      expect(container.querySelector('img')?.getAttribute('src')).toBe(
        'data:image/png;base64,b2xk',
      ),
    );
    rerender(<Upload fileList={[replacement]} listType="picture" previewFile={previewFile} />);
    await waitFor(() =>
      expect(container.querySelector('img')?.getAttribute('src')).toBe(
        'data:image/png;base64,bmV3',
      ),
    );
    expect(previewFile).toHaveBeenCalledTimes(2);
    expect(replacement.thumbUrl).toBeUndefined();
  });

  it('preserves an explicit thumbnail on a frozen file', () => {
    const file = Object.freeze({ ...createFile(), thumbUrl: 'data:image/png;base64,aW1hZ2U=' });
    const previewFile = jest.fn();
    const { container } = render(
      <Upload fileList={[file]} listType="picture" previewFile={previewFile} />,
    );
    expect(container.querySelector('img')?.getAttribute('src')).toBe(file.thumbUrl);
    expect(previewFile).not.toHaveBeenCalled();
  });
});
