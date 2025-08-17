// カテゴリの型定義
export interface Category {
  id: string;        // バックエンドAPIで使うID
  name: string;      // 日本語表示名
  units: string[];   // 選択可能な単位リスト（ドロップダウン用）
}

// 🎯 シンプル！12個のカテゴリ（バックエンドのunit_data.pyと一致）
export const ALL_CATEGORIES: Category[] = [
  { 
    id: 'distance', 
    name: '距離',
    units: ['m', 'km', 'cm', 'mm', 'ft', 'inch']
  },
  { 
    id: 'weight', 
    name: '重量',
    units: ['g', 'kg', 'lb', 'oz']
  },
  { 
    id: 'time', 
    name: '時間',
    units: ['s', 'min', 'h', 'day', 'week', 'month', 'year']
  },
  { 
    id: 'data_size', 
    name: 'データサイズ',
    units: ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  },
  { 
    id: 'area', 
    name: '面積',
    units: ['m2', 'km2', 'cm2', 'ft2', 'acre', 'hectare']
  },
  { 
    id: 'volume', 
    name: '体積',
    units: ['L', 'mL', 'm3', 'gal', 'qt', 'cup']
  },
  { 
    id: 'speed', 
    name: '速度',
    units: ['m/s', 'km/h', 'mph', 'ft/s', 'knot']
  },
  { 
    id: 'pressure', 
    name: '圧力',
    units: ['Pa', 'kPa', 'MPa', 'bar', 'psi', 'atm']
  },
  { 
    id: 'energy', 
    name: 'エネルギー',
    units: ['J', 'kJ', 'cal', 'kcal', 'Wh', 'kWh']
  },
  { 
    id: 'angle', 
    name: '角度',
    units: ['deg', 'rad', 'grad', 'turn']
  },
  { 
    id: 'fuel_efficiency', 
    name: '燃費',
    units: ['km/L', 'L/100km', 'mpg_us', 'mpg_uk']
  },
  // 12個目がない？バックエンドを確認して追加
];

// デフォルト単位設定（最初に選択される単位）
export const DEFAULT_UNITS = {
  'distance': { from: 'm', to: 'km' },
  'weight': { from: 'kg', to: 'g' },
  'time': { from: 'h', to: 'min' },
  'data_size': { from: 'MB', to: 'GB' },
  'area': { from: 'm2', to: 'km2' },
  'volume': { from: 'L', to: 'mL' },
  'speed': { from: 'km/h', to: 'm/s' },
  'pressure': { from: 'Pa', to: 'kPa' },
  'energy': { from: 'J', to: 'kJ' },
  'angle': { from: 'deg', to: 'rad' },
  'fuel_efficiency': { from: 'km/L', to: 'L/100km' }
} as const;