import React, { useState } from 'react';

export const ConversionHistory = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const historyData = [
    { conversion: "5 meters → 500 cm", time: "2分前" },
    { conversion: "1024 MB → 1 GB", time: "5分前" },
    { conversion: "100°C → 212°F", time: "10分前" }
  ];

  return (
    <aside className="w-80 bg-white rounded-xl shadow p-6 border border-blue-200">
      {/* ヘッダー部分（クリック可能） */}
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Conversion History ({historyData.length})
        </h2>
        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          ▶️
        </div>
      </div>
      
      {/* 履歴リスト（条件付きレンダリング） */}
      {isExpanded && (
        <div className="space-y-3">
          {historyData.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-gray-600">{item.conversion}</div>
              <div className="text-xs text-gray-400">{item.time}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};