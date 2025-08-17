import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { ConversionHistory } from './components/ConversionHistory';
import { ConversionModal } from './components/ConversionModal';
import { convertUnits } from './services/api';
import { saveHistory } from './services/api';
import { ALL_CATEGORIES, DEFAULT_UNITS } from './constants/categories';

function App() {
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  // 履歴更新トリガー
  const [historyUpdateTrigger, setHistoryUpdateTrigger] = useState(0);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
    
    // categories.ts の DEFAULT_UNITS を使用
    const defaults = DEFAULT_UNITS[categoryName as keyof typeof DEFAULT_UNITS] || { from: 'm', to: 'km' };
    setFromUnit(defaults.from);
    setToUnit(defaults.to);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory('');
    setInputValue('');
    setOutputValue('');
  };

  const handleConvert = async () => {
    try {
      const result = await convertUnits({
        value: parseFloat(inputValue),
        from_unit: fromUnit,
        to_unit: toUnit,
        category: selectedCategory.toLowerCase()
      });
      
      setOutputValue(result.result.toString());
      
      await saveHistory({
        category: selectedCategory.toLowerCase(),
        value: parseFloat(inputValue),
        from_unit: fromUnit,
        to_unit: toUnit,
        result: result.result
      });

      setHistoryUpdateTrigger(prev => prev + 1);

    } catch (error) {
      console.error('変換エラー:', error);
      setOutputValue('変換に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex gap-6 p-4">
        <main className="flex-1">
          <div className="grid grid-cols-3 gap-4 max-w-4xl">
            {/* ALL_CATEGORIES を使用 */}
            {ALL_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </main>

        <ConversionHistory updateTrigger={historyUpdateTrigger} />
      </div>

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