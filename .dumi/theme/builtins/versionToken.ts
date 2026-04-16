import rawTokenMeta from 'antd/es/version/token-meta.json';
import rawTokenData from 'antd/es/version/token.json';

export type GlobalTokenSource = 'seed' | 'map' | 'alias';

export interface GlobalTokenMeta {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  type: string;
  source: GlobalTokenSource;
}

export interface ComponentTokenMeta {
  source: string;
  token: string;
  type: string;
  desc: string;
  descEn: string;
  name: string;
  nameEn: string;
}

export interface VersionTokenMeta {
  global: Record<string, GlobalTokenMeta>;
  components: Record<string, ComponentTokenMeta[]>;
}

export type VersionTokenValue = string | number | boolean;

export interface ComponentTokenStatistic {
  global?: string[];
  component: Record<string, VersionTokenValue>;
}

export type VersionTokenStatistic = Record<string, ComponentTokenStatistic>;

export const tokenMeta = rawTokenMeta as VersionTokenMeta;

export const tokenData = rawTokenData as VersionTokenStatistic;
