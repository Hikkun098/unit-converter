import React, { useState } from 'react';

function App() {
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  // カテゴリクリック時の処理
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
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
      // 簡単な変換例（m to km）
      if (fromUnit === 'm' && toUnit === 'km') {
        setOutputValue((value / 1000).toString());
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー部分 */}
      <header className="p-4">
        <h1 className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 from-0% via-blue-400 via-50% to-indigo-600 to-100%">
          ConvertPro
        </h1>
      </header>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex gap-6 p-4">
        {/* 左側：メインコンテンツ */}
        <main className="flex-1">
          <div className="grid grid-cols-3 gap-4 max-w-4xl">
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Distance')}
            >
              <div className="text-blue-500 font-medium text-center">Distance</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Data Size')}
            >
              <div className="text-blue-500 font-medium text-center">Data Size</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Weight')}
            >
              <div className="text-blue-500 font-medium text-center">Weight</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Time')}
            >
              <div className="text-blue-500 font-medium text-center">Time</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Transfer Rate')}
            >
              <div className="text-blue-500 font-medium text-center">Transfer Rate</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Temperature')}
            >
              <div className="text-blue-500 font-medium text-center">Temperature</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Volume')}
            >
              <div className="text-blue-500 font-medium text-center">Volume</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Velocity')}
            >
              <div className="text-blue-500 font-medium text-center">Velocity</div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
              onClick={() => handleCategoryClick('Accelerate')}
            >
              <div className="text-blue-500 font-medium text-center">Accelerate</div>
            </div>
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
      <footer className="bg-white border-t border-gray-200 p-4 text-center">
        <p className="text-gray-500 text-sm">© 2025 ConvertPro - シンプルな単位変換ツール</p>
      </footer>

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
                <div className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg min-w-[60px] text-center">
                  {fromUnit}
                </div>
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
                <div className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg min-w-[60px] text-center">
                  {toUnit}
                </div>
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