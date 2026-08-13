import React from 'react';

import type { UploadProps } from '..';
import Upload from '..';
import { render, screen } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import zhTW from '../../locale/zh_TW';

const fileList: UploadProps['fileList'] = [
  {
    uid: 'report',
    name: 'report.pdf',
    status: 'done',
    url: '/report.pdf',
  },
];

describe('Upload accessibility', () => {
  it('uses the merged locale for default file actions', () => {
    render(
      <Upload
        fileList={fileList}
        listType="picture-card"
        locale={{ removeFile: 'Localized remove' }}
        showUploadList={{ showDownloadIcon: true }}
      />,
    );

    expect(screen.getByRole('link', { name: 'Preview file' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download file' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized remove' })).toBeInTheDocument();
  });

  it('keeps localized action names when custom icons have their own names', () => {
    render(
      <ConfigProvider locale={zhTW}>
        <Upload
          fileList={fileList}
          listType="picture-card"
          showUploadList={{
            showDownloadIcon: true,
            removeIcon: () => <span role="img" aria-label="Remove icon" />,
            previewIcon: () => <span role="img" aria-label="Preview icon" />,
            downloadIcon: () => <span role="img" aria-label="Download icon" />,
          }}
        />
      </ConfigProvider>,
    );

    expect(screen.getByRole('button', { name: '移除檔案' })).toHaveAttribute('title', '移除檔案');
    expect(screen.getByRole('link', { name: '預覽檔案' })).toHaveAttribute('title', '預覽檔案');
    expect(screen.getByRole('button', { name: '下載檔案' })).toHaveAttribute('title', '下載檔案');
  });

  it('keeps the icon fallback when an action locale is empty', () => {
    render(
      <Upload
        fileList={fileList}
        listType="picture-card"
        locale={{ removeFile: '', previewFile: '' }}
      />,
    );

    expect(screen.getByRole('button', { name: 'delete' })).not.toHaveAttribute('aria-label');
    expect(screen.getByRole('link', { name: 'eye' })).not.toHaveAttribute('aria-label');
  });
});
