import React from 'react';
import { unitData } from '../data/unitData';

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
        <div className="mb-6">
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
              {(unitData as any)[selectedCategory]?.units.map((unit: string) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <button
              onClick={onConvert}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ⇄
            </button>
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
              {(unitData as any)[selectedCategory]?.units.map((unit: string) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
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