# Locale 添加参考资源

## 现有 Locale 文件列表

当前 ant-design 支持 76 种语言，位于 `components/locale/` 目录下。

### 完整列表

ar_EG, az_AZ, bg_BG, bn_BD, by_BY, ca_ES, cs_CZ, da_DK, de_DE, el_GR, en_GB, en_US, es_ES, es_US, et_EE, eu_ES, fa_IR, fi_FI, fr_BE, fr_CA, fr_FR, ga_IE, gl_ES, he_IL, hi_IN, hr_HR, hu_HU, hy_AM, id_ID, is_IS, it_IT, ja_JP, ka_GE, kk_KZ, km_KH, kmr_IQ, kn_IN, ko_KR, ku_IQ, lt_LT, lv_LV, mk_MK, ml_IN, mn_MN, mr_IN, ms_MY, my_MM, nb_NO, ne_NP, nl_BE, nl_NL, pl_PL, pt_BR, pt_PT, ro_RO, ru_RU, si_LK, sk_SK, sl_SI, sr_RS, sv_SE, ta_IN, th_TH, tk_TK, tr_TR, uk_UA, ur_PK, uz_UZ, vi_VN, zh_CN, zh_HK, zh_TW

## Locale 文件层级

```
components/locale/xx_XX.ts          # 主 locale 文件（聚合所有组件的翻译）
components/date-picker/locale/xx_XX.ts  # DatePicker 专用
components/calendar/locale/xx_XX.ts     # Calendar 专用（通常复用 DatePicker）
components/time-picker/locale/xx_XX.ts  # TimePicker 专用
@rc-component/picker/lib/locale/xx_XX.ts       # rc-component picker locale
@rc-component/pagination/lib/locale/xx_XX.ts   # rc-component pagination locale
```

## Locale Interface 定义

参考 `components/locale/index.tsx` 中的 `Locale` interface：

```typescript
export interface Locale {
  locale: string;
  Pagination?: PaginationLocale;
  DatePicker?: DatePickerLocale;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  Table?: TableLocale;
  Modal?: ModalLocale;
  Tour?: TourLocale;
  Popconfirm?: PopconfirmLocale;
  Transfer?: TransferLocale;
  Select?: Record<string, any>;
  Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: { placeholder?: string; close?: string; sortable?: string };
  Icon?: Record<string, any>;
  Text?: { edit?: any; copy?: any; copied?: any; expand?: any; collapse?: any };
  Form?: { optional?: string; defaultValidateMessages: ValidateMessages };
  QRCode?: { expired?: string; refresh?: string; scanned?: string };
  ColorPicker?: { presetEmpty: string; transparent: string; singleColor: string; gradientColor: string };
}
```

## 使用 useLocale 的组件列表

以下组件通过 `useLocale` 消费 locale 数据：

| 组件 | Locale Key | 文件 |
|---|---|---|
| Modal | Modal | `components/modal/shared.tsx` |
| Pagination | Pagination | `components/pagination/Pagination.tsx` |
| Upload | Upload | `components/upload/Upload.tsx` |
| Transfer | Transfer | `components/transfer/index.tsx` |
| Popconfirm | Popconfirm | `components/popconfirm/PurePanel.tsx` |
| Tour | Tour, global | `components/tour/panelRender.tsx` |
| QRCode | QRCode | `components/qr-code/index.tsx` |
| Typography | Text | `components/typography/Base/index.tsx` |
| Table | global | `components/table/InternalTable.tsx` |

## 测试文件

`components/locale/__tests__/index.test.tsx` 包含所有 locale 的导入测试。

每次添加新 locale 后，必须在该文件中添加对应的导入和基础测试。

## 文档文件

- `docs/react/i18n.en-US.md` — 英文国际化文档
- `docs/react/i18n.zh-CN.md` — 中文国际化文档

文档中应包含完整的语言列表和使用示例。
