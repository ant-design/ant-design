/**
 * Z-Index theme values.
 *
 * Currently, we simply set those used by controls individually, but we endevour
 * to eventually have a naming scheme that's similar to that used elsewhere:
 *
 * See https://github.com/allenai/varnish/issues/153.
 */
// eslint-disable-next-line import/prefer-default-export
export const zIndex = {
  badge: 'auto',
  tableFixed: 'auto',
  // 0-5 reserved for user
  affix: 10,
  backTop: 10,
  pickerPanel: 10,
  popupClose: 10,
  // 20-900 reserved for user
  header: 950,
  modal: 1000,
  modalMask: 1000,
  message: 1010,
  notification: 1010,
  popover: 1030,
  dropdown: 1050,
  picker: 1050,
  popoconfirm: 1060,
  tooltip: 1070,
  // 1100-2000 reserved for user
};
