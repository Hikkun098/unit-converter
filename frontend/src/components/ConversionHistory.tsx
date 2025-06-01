import React, { useState } from 'react';

export const ConversionHistory = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const historyData = [
    { conversion: "5 meters → 500 cm", time: "2分前" },
    { conversion: "1024 MB → 1 GB", time: "5分前" },
    { conversion: "100°C → 212°F", time: "10分前" }
  ];

  return (
    <aside className={`bg-white rounded-xl shadow border border-blue-200 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-6 overflow-hidden' : 'w-80'
    }`}>
      {isCollapsed ? (
        // 折りたたみ状態：とても細いバー
        <div className="h-full flex flex-col items-center justify-start pt-4">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors rotate-0 hover:scale-110"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      ) : (
        // 展開状態：通常の履歴表示
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Conversion History ({historyData.length})
            </h2>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors hover:scale-110"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {historyData.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <div className="text-sm text-gray-600">{item.conversion}</div>
                <div className="text-xs text-gray-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};