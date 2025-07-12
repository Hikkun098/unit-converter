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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">{selectedCategory} 変換</h2>
        
        {/* Before conversion */}
        <div className="mb-4">
          <label className="block text-blue-500 font-medium mb-2">Before conversion</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="値を入力"
            />
            <select
              value={fromUnit}
              onChange={(e) => onFromUnitChange(e.target.value)}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg min-w-[80px] border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            {/* 各カテゴリの単位 */}
          {selectedCategory.toLowerCase() === 'distance' && (
            <>
              <option value="m">m</option>
              <option value="km">km</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="ft">ft</option>
              <option value="inch">inch</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'data_size' && (
            <>
              <option value="B">B</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'weight' && (
            <>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'time' && (
            <>
              <option value="s">s</option>
              <option value="min">min</option>
              <option value="h">h</option>
              <option value="day">day</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'temperature' && (
            <>
              <option value="C">°C</option>
              <option value="F">°F</option>
              <option value="K">K</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'area' && (
            <>
              <option value="m2">m²</option>
              <option value="km2">km²</option>
              <option value="cm2">cm²</option>
              <option value="ft2">ft²</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'volume' && (
            <>
              <option value="L">L</option>
              <option value="mL">mL</option>
              <option value="m3">m³</option>
              <option value="gal">gal</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'speed' && (
            <>
              <option value="m/s">m/s</option>
              <option value="km/h">km/h</option>
              <option value="mph">mph</option>
              <option value="ft/s">ft/s</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'pressure' && (
            <>
              <option value="Pa">Pa</option>
              <option value="kPa">kPa</option>
              <option value="bar">bar</option>
              <option value="psi">psi</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'energy' && (
            <>
              <option value="J">J</option>
              <option value="kJ">kJ</option>
              <option value="cal">cal</option>
              <option value="kWh">kWh</option>
            </>
          )}
            </select>
            <button
              onClick={onConvert}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ⇄
            </button>
          </div>
        </div>

        {/* 矢印アイコン */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>

        {/* After conversion */}
        <div className="mb-6">
          <label className="block text-blue-500 font-medium mb-2">After conversion</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={outputValue}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="変換結果"
            />
            <select
              value={toUnit}
              onChange={(e) => onToUnitChange(e.target.value)}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg min-w-[80px] border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* 各カテゴリの単位 */}
            {selectedCategory.toLowerCase() === 'distance' && (
              <>
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
                <option value="ft">ft</option>
                <option value="inch">inch</option>
              </>
            )}
            {selectedCategory.toLowerCase() === 'data_size' && (
              <>
                <option value="B">B</option>
                <option value="KB">KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </>
            )}
            {selectedCategory.toLowerCase() === 'weight' && (
              <>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </>
            )}
            {selectedCategory.toLowerCase() === 'time' && (
              <>
                <option value="s">s</option>
                <option value="min">min</option>
                <option value="h">h</option>
                <option value="day">day</option>
              </>
            )}
          {selectedCategory.toLowerCase() === 'temperature' && (
            <>
              <option value="C">°C</option>
              <option value="F">°F</option>
              <option value="K">K</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'area' && (
            <>
              <option value="m2">m²</option>
              <option value="km2">km²</option>
              <option value="cm2">cm²</option>
              <option value="ft2">ft²</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'volume' && (
            <>
              <option value="L">L</option>
              <option value="mL">mL</option>
              <option value="m3">m³</option>
              <option value="gal">gal</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'speed' && (
            <>
              <option value="m/s">m/s</option>
              <option value="km/h">km/h</option>
              <option value="mph">mph</option>
              <option value="ft/s">ft/s</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'pressure' && (
            <>
              <option value="Pa">Pa</option>
              <option value="kPa">kPa</option>
              <option value="bar">bar</option>
              <option value="psi">psi</option>
            </>
          )}
          {selectedCategory.toLowerCase() === 'energy' && (
            <>
              <option value="J">J</option>
              <option value="kJ">kJ</option>
              <option value="cal">cal</option>
              <option value="kWh">kWh</option>
            </>
          )}
            </select>
            <button className="px-4 py-3 bg-gray-300 text-gray-500 rounded-lg">
              ⇄
            </button>
          </div>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};