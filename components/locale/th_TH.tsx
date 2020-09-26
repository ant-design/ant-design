/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/th_TH';
import DatePicker from '../date-picker/locale/th_TH';
import TimePicker from '../time-picker/locale/th_TH';
import Calendar from '../calendar/locale/th_TH';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} ไม่ใช่ ${type} ที่ถูกต้อง';

const localeValues: Locale = {
  locale: 'th',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'กรุณาเลือก',
  },
  Table: {
    filterTitle: 'ตัวกรอง',
    filterConfirm: 'ยืนยัน',
    filterReset: 'รีเซ็ต',
    filterEmptyText: 'ไม่มีตัวกรอง',
    emptyText: 'ไม่มีข้อมูล',
    selectAll: 'เลือกทั้งหมดในหน้านี้',
    selectInvert: 'กลับสถานะการเลือกในหน้านี้',
    selectionAll: 'เลือกข้อมูลทั้งหมด',
    sortTitle: 'เรียง',
    expand: 'แสดงแถวข้อมูล',
    collapse: 'ย่อแถวข้อมูล',
    triggerDesc: 'คลิกเรียงจากมากไปน้อย',
    triggerAsc: 'คลิกเรียงจากน้อยไปมาก',
    cancelSort: 'คลิกเพื่อยกเลิกการเรียง',
  },
  Modal: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
    justOkText: 'ตกลง',
  },
  Popconfirm: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ค้นหา',
    itemUnit: 'ชิ้น',
    itemsUnit: 'ชิ้น',
    remove: 'นำออก',
    selectCurrent: 'เลือกทั้งหมดในหน้านี้',
    removeCurrent: 'นำออกทั้งหมดในหน้านี้',
    selectAll: 'เลือกข้อมูลทั้งหมด',
    removeAll: 'นำข้อมูลออกทั้งหมด',
    selectInvert: 'กลับสถานะการเลือกในหน้านี้',
  },
  Upload: {
    uploading: 'กำลังอัปโหลด...',
    removeFile: 'ลบไฟล์',
    uploadError: 'เกิดข้อผิดพลาดในการอัปโหลด',
    previewFile: 'ดูตัวอย่างไฟล์',
    downloadFile: 'ดาวน์โหลดไฟล์',
  },
  Empty: {
    description: 'ไม่มีข้อมูล',
  },
  Icon: {
    icon: 'ไอคอน',
  },
  Text: {
    edit: 'แก้ไข',
    copy: 'คัดลอก',
    copied: 'คัดลอกแล้ว',
    expand: 'ขยาย',
  },
  PageHeader: {
    back: 'ย้อนกลับ',
  },
  Form: {
    optional: '(ไม่จำเป็น)',
    defaultValidateMessages: {
      default: 'ฟิลด์ ${label} ไม่ผ่านเงื่อนไขการตรวจสอบ',
      required: 'กรุณากรอก ${label}',
      enum: '${label} ต้องเป็นค่าใดค่าหนึ่งใน [${enum}]',
      whitespace: '${label} ไม่สามารถเป็นช่องว่างได้',
      date: {
        format: 'รูปแบบวันที่ ${label} ไม่ถูกต้อง',
        parse: '${label} ไม่สามารถแปลงเป็นวันที่ได้',
        invalid: '${label} เป็นวันที่ที่ไม่ถูกต้อง',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} ต้องมี ${len} ตัวอักษร',
        min: '${label} ต้องมีอย่างน้อย ${min} ตัวอักษร',
        max: '${label} มีได้สูงสุด ${max} ตัวอักษร',
        range: '${label} ต้องมี ${min}-${max} ตัวอักษร',
      },
      number: {
        len: '${label} ต้องมี ${len} ตัว',
        min: 'ค่าต่ำสุด ${label} คือ ${min}',
        max: 'ค่าสูงสุด ${label} คือ ${max}',
        range: '${label} ต้องมีค่า ${min}-${max}',
      },
      array: {
        len: 'ต้องมี ${len} ${label}',
        min: 'ต้องมีอย่างน้อย ${min} ${label}',
        max: 'มีได้สูงสุด ${max} ${label}',
        range: 'จำนวน ${label} ต้องอยู่ในช่วง ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} ไม่ตรงกับรูปแบบ ${pattern}',
      },
    },
  },
};

export default localeValues;
