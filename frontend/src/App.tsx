import React, { useState } from 'react';
import {unitData} from './data/unitData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { ConversionHistory } from './components/ConversionHistory';
import { ConversionModal } from './components/ConversionModal';


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
        <ConversionHistory />
      </div>

      {/* フッター */}
      <Footer />

      <ConversionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedCategory={selectedCategory}
        inputValue={inputValue}
        outputValue={outputValue}
        fromUnit={fromUnit}
        toUnit={toUnit}
        onInputChange={setInputValue}
        onFromUnitChange={setFromUnit}
        onToUnitChange={setToUnit}
        onConvert={handleConvert}
      />

    </div>
  );
}

export default App;