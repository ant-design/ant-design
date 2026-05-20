import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    label: 'Thành phố Hà Nội',
    value: 'ha_noi',
    children: [
      { label: 'Phường Ba Đình', value: 'ha_noi_ba_dinh' },
      { label: 'Phường Bạch Mai', value: 'ha_noi_bach_mai' },
      { label: 'Phường Bồ Đề', value: 'ha_noi_bo_de' },
      { label: 'Phường Cầu Giấy', value: 'ha_noi_cau_giay' },
      { label: 'Phường Chương Mỹ', value: 'ha_noi_chuong_my' },
      { label: 'Phường Cửa Nam', value: 'ha_noi_cua_nam' },
      { label: 'Phường Đại Mỗ', value: 'ha_noi_dai_mo' },
      { label: 'Phường Định Công', value: 'ha_noi_dinh_cong' },
      { label: 'Phường Đống Đa', value: 'ha_noi_dong_da' },
      { label: 'Phường Đông Ngạc', value: 'ha_noi_dong_ngac' },
      { label: 'Phường Hoàng Liệt', value: 'ha_noi_hoang_liet' },
      { label: 'Phường Hoàng Mai', value: 'ha_noi_hoang_mai' },
      { label: 'Phường Hồng Hà', value: 'ha_noi_hong_ha' },
      { label: 'Phường Khương Đình', value: 'ha_noi_khuong_dinh' },
      { label: 'Phường Kiến Hưng', value: 'ha_noi_kien_hung' },
      { label: 'Phường Kim Liên', value: 'ha_noi_kim_lien' },
      { label: 'Phường Láng', value: 'ha_noi_lang' },
      { label: 'Phường Lĩnh Nam', value: 'ha_noi_linh_nam' },
      { label: 'Phường Long Biên', value: 'ha_noi_long_bien' },
      { label: 'Phường Nghĩa Đô', value: 'ha_noi_nghia_do' },
      { label: 'Phường Ngọc Hà', value: 'ha_noi_ngoc_ha' },
      { label: 'Phường Ô Chợ Dừa', value: 'ha_noi_o_cho_dua' },
      { label: 'Phường Phú Diễn', value: 'ha_noi_phu_dien' },
      { label: 'Phường Phú Lương', value: 'ha_noi_phu_luong' },
      { label: 'Phường Phú Thượng', value: 'ha_noi_phu_thuong' },
      { label: 'Phường Phúc Lợi', value: 'ha_noi_phuc_loi' },
      { label: 'Phường Phương Liệt', value: 'ha_noi_phuong_liet' },
      { label: 'Phường Tây Hồ', value: 'ha_noi_tay_ho' },
      { label: 'Phường Tây Mỗ', value: 'ha_noi_tay_mo' },
      { label: 'Phường Tây Tựu', value: 'ha_noi_tay_tuu' },
      { label: 'Phường Thanh Liệt', value: 'ha_noi_thanh_liet' },
      { label: 'Phường Thanh Xuân', value: 'ha_noi_thanh_xuan' },
      { label: 'Phường Thượng Cát', value: 'ha_noi_thuong_cat' },
      { label: 'Phường Từ Liêm', value: 'ha_noi_tu_liem' },
      { label: 'Phường Tương Mai', value: 'ha_noi_tuong_mai' },
      { label: 'Phường Văn Miếu - Quốc Tử Giám', value: 'ha_noi_van_mieu' },
      { label: 'Phường Việt Hưng', value: 'ha_noi_viet_hung' },
      { label: 'Phường Vĩnh Hưng', value: 'ha_noi_vinh_hung' },
      { label: 'Phường Vĩnh Tuy', value: 'ha_noi_vinh_tuy' },
      { label: 'Phường Xuân Đỉnh', value: 'ha_noi_xuan_dinh' },
      { label: 'Phường Xuân Phương', value: 'ha_noi_xuan_phuong' },
      { label: 'Phường Yên Hòa', value: 'ha_noi_yen_hoa' },
      { label: 'Phường Yên Nghĩa', value: 'ha_noi_yen_nghia' },
      { label: 'Phường Yên Sở', value: 'ha_noi_yen_so' },
      { label: 'Xã An Khánh', value: 'ha_noi_an_khanh' },
      { label: 'Xã Bát Tràng', value: 'ha_noi_bat_trang' },
      { label: 'Xã Bình Minh', value: 'ha_noi_binh_minh' },
      { label: 'Xã Chương Dương', value: 'ha_noi_chuong_duong' },
      { label: 'Xã Đa Phúc', value: 'ha_noi_da_phuc' },
      { label: 'Xã Đại Thanh', value: 'ha_noi_dai_thanh' },
    ],
  },
  {
    label: 'Thành phố Cần Thơ',
    value: 'can_tho',
    children: [
      { label: 'Phường An Bình', value: 'can_tho_an_binh' },
      { label: 'Phường Bình Thủy', value: 'can_tho_binh_thuy' },
      { label: 'Phường Cái Khế', value: 'can_tho_cai_khe' },
      { label: 'Phường Cái Răng', value: 'can_tho_cai_rang' },
      { label: 'Phường Hưng Phú', value: 'can_tho_hung_phu' },
      { label: 'Phường Long Tuyền', value: 'can_tho_long_tuyen' },
      { label: 'Phường Mỹ Xuyên', value: 'can_tho_my_xuyen' },
      { label: 'Phường Ninh Kiều', value: 'can_tho_ninh_kieu' },
      { label: 'Phường Phú Lợi', value: 'can_tho_phu_loi' },
      { label: 'Phường Sóc Trăng', value: 'can_tho_soc_trang' },
      { label: 'Phường Tân An', value: 'can_tho_tan_an' },
      { label: 'Phường Thới An Đông', value: 'can_tho_thoi_an_dong' },
      { label: 'Phường Vị Tân', value: 'can_tho_vi_tan' },
      { label: 'Phường Vị Thanh', value: 'can_tho_vi_thanh' },
    ],
  },
];

const App: React.FC = () => {
  const onChange: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
    console.log(value);
  };

  return (
    <Cascader
      style={{ width: '100%' }}
      options={options}
      onChange={onChange}
      multiple
      maxTagCount="responsive"
      showSearch
      placeholder="Chọn tỉnh / phường"
    />
  );
};

export default App;
