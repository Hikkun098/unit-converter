import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ヘッダー部分 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 from-0% via-blue-400 via-50% to-indigo-600 to-100%">
          ConvertPro
        </h1>
      </header>

      {/* カテゴリグリッド */}
      <main className="mt-8">
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
            <div className="text-blue-500 font-medium text-center">Information Volume</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
            <div className="text-blue-500 font-medium text-center">Transfer Rate</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
            <div className="text-blue-500 font-medium text-center">Temperature</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
            <div className="text-blue-500 font-medium text-center">Hour</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
            <div className="text-blue-500 font-medium text-center">Accelerate</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200">
            <div className="text-blue-500 font-medium text-center">Velocity</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;