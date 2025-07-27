import React from 'react';
import { convertUnits } from '../services/api';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  inputValue: string;
  outputValue: string;
  fromUnit: string;
  toUnit: string;
  onInputChange: (value: string) => void;
  onFromUnitChange: (unit: string) => void;
  onToUnitChange: (unit: string) => void;
  onConvert: () => void;
}

export const ConversionModal = ({
  isOpen,
  onClose,
  selectedCategory,
  inputValue,
  outputValue,
  fromUnit,
  toUnit,
  onInputChange,
  onFromUnitChange,
  onToUnitChange,
  onConvert
}: ConversionModalProps) => {
  if (!isOpen) return null;

  // 単位の切り替え機能
  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    onFromUnitChange(toUnit);
    onToUnitChange(tempUnit);
    
    // 値も切り替え
    if (outputValue && outputValue !== "変換結果") {
      onInputChange(outputValue);
    }
  };

  // カテゴリ名の日本語変換（シンプル版）
  const getCategoryNameInJapanese = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      // 基本の単位変換
      'distance': '距離',
      'data_size': 'データサイズ',
      'weight': '重量',
      'time': '時間',
      'temperature': '温度',
      'area': '面積',
      'volume': '体積',
      'speed': '速度',
      'pressure': '圧力',
      'energy': 'エネルギー',
      
      // シンプルな追加変換のみ
      'angle': '角度',
      'fuel_efficiency': '燃費'
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  const getUnitOptions = () => {
    switch (selectedCategory.toLowerCase()) {
      // 基本の単位変換
      case 'distance':
        return [
          { value: 'm', label: 'm' },
          { value: 'km', label: 'km' },
          { value: 'cm', label: 'cm' },
          { value: 'mm', label: 'mm' },
          { value: 'ft', label: 'ft' },
          { value: 'inch', label: 'inch' }
        ];
      case 'data_size':
        return [
          { value: 'B', label: 'B' },
          { value: 'KB', label: 'KB' },
          { value: 'MB', label: 'MB' },
          { value: 'GB', label: 'GB' },
          { value: 'TB', label: 'TB' }
        ];
      case 'weight':
        return [
          { value: 'g', label: 'g' },
          { value: 'kg', label: 'kg' },
          { value: 'lb', label: 'lb' },
          { value: 'oz', label: 'oz' }
        ];
      case 'time':
        return [
          { value: 's', label: 's' },
          { value: 'min', label: 'min' },
          { value: 'h', label: 'h' },
          { value: 'day', label: 'day' }
        ];
      case 'temperature':
        return [
          { value: 'C', label: '°C' },
          { value: 'F', label: '°F' },
          { value: 'K', label: 'K' }
        ];
      case 'area':
        return [
          { value: 'm2', label: 'm²' },
          { value: 'km2', label: 'km²' },
          { value: 'cm2', label: 'cm²' },
          { value: 'ft2', label: 'ft²' }
        ];
      case 'volume':
        return [
          { value: 'L', label: 'L' },
          { value: 'mL', label: 'mL' },
          { value: 'm3', label: 'm³' },
          { value: 'gal', label: 'gal' }
        ];
      case 'speed':
        return [
          { value: 'm/s', label: 'm/s' },
          { value: 'km/h', label: 'km/h' },
          { value: 'mph', label: 'mph' },
          { value: 'ft/s', label: 'ft/s' }
        ];
      case 'pressure':
        return [
          { value: 'Pa', label: 'Pa' },
          { value: 'kPa', label: 'kPa' },
          { value: 'bar', label: 'bar' },
          { value: 'psi', label: 'psi' }
        ];
      case 'energy':
        return [
          { value: 'J', label: 'J' },
          { value: 'kJ', label: 'kJ' },
          { value: 'cal', label: 'cal' },
          { value: 'kWh', label: 'kWh' }
        ];
        
      // シンプルな追加変換のみ
      case 'angle':
        return [
          { value: 'deg', label: '度 (°)' },
          { value: 'rad', label: 'ラジアン (rad)' },
          { value: 'grad', label: 'グラード (grad)' },
          { value: 'turn', label: '回転 (turn)' }
        ];
      case 'fuel_efficiency':
        return [
          { value: 'km/L', label: 'km/L' },
          { value: 'L/100km', label: 'L/100km' },
          { value: 'mpg_us', label: 'mpg (US)' },
          { value: 'mpg_uk', label: 'mpg (UK)' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">{getCategoryNameInJapanese(selectedCategory)} 変換</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* 変換元 */}
        <div className="mb-4">
          <label className="block text-blue-600 font-medium mb-2 text-sm">変換元</label>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onConvert()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                placeholder="値を入力"
              />
              {/* 変換ボタンを中央に配置 */}
              <div className="flex justify-center">
                <button
                  onClick={onConvert}
                  className="px-8 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                >
                  変換
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <select
                value={fromUnit}
                onChange={(e) => onFromUnitChange(e.target.value)}
                className="px-4 py-3 bg-gray-50 text-gray-700 rounded-lg min-w-[80px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              >
                {getUnitOptions().map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSwapUnits}
                className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors group"
                title="単位を切り替え"
              >
                <svg 
                  className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors transform group-hover:rotate-180 duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 変換先 */}
        <div className="mb-6">
          <label className="block text-blue-600 font-medium mb-2 text-sm">変換先</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={outputValue}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium"
              placeholder="変換結果"
            />
            <select
              value={toUnit}
              onChange={(e) => onToUnitChange(e.target.value)}
              className="px-4 py-3 bg-gray-50 text-gray-700 rounded-lg min-w-[80px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {getUnitOptions().map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};