import React, { useState } from 'react';
import {unitData} from './data/unitData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';


function App() {
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

const handleCategoryClick = (categoryName: string) => {
  setSelectedCategory(categoryName);
  setIsModalOpen(true);
  
  // 選択されたカテゴリの単位を取得
  const currentUnits = (unitData as any)[categoryName]?.units || [];
  if (currentUnits.length > 0) {
    setFromUnit(currentUnits[0]);  // 最初の単位を設定
    setToUnit(currentUnits[1] || currentUnits[0]);  // 2番目の単位を設定
  }
};

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory('');
    setInputValue('');
    setOutputValue('');
  };

  // 変換処理（簡単な例：距離の場合）
const handleConvert = () => {
  const value = parseFloat(inputValue);
  if (!isNaN(value)) {
    const conversions = (unitData as any)[selectedCategory]?.conversions;
    if (conversions) {
      // 基準単位に変換してから目標単位に変換
      const baseValue = value * conversions[fromUnit];
      const result = baseValue / conversions[toUnit];
      setOutputValue(result.toString());
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex gap-6 p-4">
        {/* 左側：メインコンテンツ */}
        <main className="flex-1">
          <div className="grid grid-cols-3 gap-4 max-w-4xl">
            <CategoryCard 
              name="Distance" 
              onClick={() => handleCategoryClick('Distance')} 
            />
            
            <CategoryCard 
              name="Data Size" 
              onClick={() => handleCategoryClick('Data Size')} 
            />
            
            <CategoryCard 
              name="Weight" 
              onClick={() => handleCategoryClick('Weight')} 
            />
            
            <CategoryCard 
              name="Time" 
              onClick={() => handleCategoryClick('Time')} 
            />
            
            <CategoryCard 
              name="Transfer Rate" 
              onClick={() => handleCategoryClick('Transfer Rate')} 
            />
            
            <CategoryCard 
              name="Temperature" 
              onClick={() => handleCategoryClick('Temperature')} 
            />
            
            <CategoryCard 
              name="Volume" 
              onClick={() => handleCategoryClick('Volume')} 
            />
            
            <CategoryCard 
              name="Velocity" 
              onClick={() => handleCategoryClick('Velocity')} 
            />
            
            <CategoryCard 
              name="Accelerate" 
              onClick={() => handleCategoryClick('Accelerate')} 
            />
          </div>
        </main>

        {/* 右側：変換履歴 */}
        <aside className="w-80 bg-white rounded-xl shadow p-6 border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Conversion History</h2>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-gray-600">5 meters → 500 cm</div>
              <div className="text-xs text-gray-400">2分前</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-gray-600">1024 MB → 1 GB</div>
              <div className="text-xs text-gray-400">5分前</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-gray-600">100°C → 212°F</div>
              <div className="text-xs text-gray-400">10分前</div>
            </div>
          </div>
        </aside>
      </div>

      {/* フッター */}
      <Footer />

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-center">{selectedCategory} 変換</h2>
            
            {/* Before conversion */}
            <div className="mb-6">
              <label className="block text-blue-500 font-medium mb-2">Before conversion</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="値を入力"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg min-w-[80px] border focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(unitData as any)[selectedCategory]?.units.map((unit: string) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleConvert}
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
                  onChange={(e) => setToUnit(e.target.value)}
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
              onClick={closeModal}
              className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;