import React from 'react';

function App() {
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
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Distance</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Data Size</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Weight</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Time</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Transfer Rate</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Temperature</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Volume</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
              <div className="text-blue-500 font-medium text-center">Velocity</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
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
    </div>
  );
}

export default App;