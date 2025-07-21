import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { ConversionHistory } from './components/ConversionHistory';
import { ConversionModal } from './components/ConversionModal';
import { convertUnits, getCategories } from './services/api';
import { saveHistory } from './services/api';

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
  
  // カテゴリを拡張（固定データで先にテスト）
  const [categories, setCategories] = useState<Category[]>([
    // 既存の単位変換
    { id: 'distance', name: '距離' },
    { id: 'data_size', name: 'データサイズ' },
    { id: 'weight', name: '重量' },
    { id: 'time', name: '時間' },
    { id: 'temperature', name: '温度' },
    { id: 'area', name: '面積' },
    { id: 'volume', name: '体積' },
    { id: 'speed', name: '速度' },
    { id: 'pressure', name: '圧力' },
    { id: 'energy', name: 'エネルギー' },
    
    // 新しく追加する科学計算系
    { id: 'currency', name: '通貨' },
    { id: 'angle', name: '角度' },
    { id: 'fuel_efficiency', name: '燃費' },
    { id: 'bmi_calculator', name: 'BMI計算' },
    { id: 'physics_force', name: '物理（力学）' },
    { id: 'chemistry_molar', name: '化学（モル濃度）' }
  ]);

  // カテゴリ取得（一旦コメントアウトして固定データでテスト）
  /*
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('🔍 カテゴリ取得開始');
        const data = await getCategories();
        console.log('📦 取得データ:', data);
        setCategories(data);
        console.log('✅ categories state更新完了');
      } catch (error) {
        console.error('❌ カテゴリ取得エラー:', error);
      }
    };
    
    fetchCategories();
  }, []);
  */

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
    
    // カテゴリ別の初期単位設定
    const defaultUnits = {
      'distance': { from: 'm', to: 'km' },
      'data_size': { from: 'MB', to: 'GB' },
      'weight': { from: 'kg', to: 'g' },
      'time': { from: 'h', to: 'min' },
      'temperature': { from: 'C', to: 'F' },
      'area': { from: 'm2', to: 'km2' },
      'volume': { from: 'L', to: 'mL' },
      'speed': { from: 'km/h', to: 'm/s' },
      'pressure': { from: 'Pa', to: 'kPa' },
      'energy': { from: 'J', to: 'kJ' },
      'currency': { from: 'JPY', to: 'USD' },
      'angle': { from: 'deg', to: 'rad' },
      'fuel_efficiency': { from: 'km/L', to: 'L/100km' },
      'bmi_calculator': { from: 'height_weight', to: 'bmi' },
      'physics_force': { from: 'mass_acceleration', to: 'force' },
      'chemistry_molar': { from: 'moles_volume', to: 'molarity' }
    };
    
    const defaults = defaultUnits[categoryName as keyof typeof defaultUnits] || { from: 'm', to: 'km' };
    setFromUnit(defaults.from);
    setToUnit(defaults.to);
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
        category: selectedCategory.toLowerCase()
      });
      
      setOutputValue(result.result.toString());
      
      // 履歴保存を追加
      await saveHistory({
        category: selectedCategory.toLowerCase(),
        value: parseFloat(inputValue),
        from_unit: fromUnit,
        to_unit: toUnit,
        result: result.result
      });
      
    } catch (error) {
      console.error('変換エラー:', error);
      setOutputValue('変換に失敗しました');
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
                name={category.name}
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