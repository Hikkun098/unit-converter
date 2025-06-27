import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { ConversionHistory } from './components/ConversionHistory';
import { ConversionModal } from './components/ConversionModal';
import { convertUnits, getCategories } from './services/api';

// 型定義を追加
interface Category {
  id: string;
  name: string;
}


function App() {
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [categories, setCategories] = useState<Category[]>([]);

  // カテゴリ取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('カテゴリ取得エラー:', error);
      }
    };
    
    fetchCategories();
  }, []);

const handleCategoryClick = (categoryName: string) => {
  setSelectedCategory(categoryName);
  setIsModalOpen(true);
  
  // とりあえず固定値で初期設定
  setFromUnit('m');
  setToUnit('km');
};

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory('');
    setInputValue('');
    setOutputValue('');
  };

  // 変換処理
const handleConvert = async () => {
  try {
    const result = await convertUnits({
      value: parseFloat(inputValue),
      from_unit: fromUnit,
      to_unit: toUnit,
      category: selectedCategory.toLowerCase() // 小文字に変換
    });
    
    setOutputValue(result.result.toString());  // ← 正しい関数名
    
  } catch (error) {
    console.error('変換エラー:', error);
    setOutputValue('変換に失敗しました');       // ← 正しい関数名
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
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}        // ← APIから取得した日本語名
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
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