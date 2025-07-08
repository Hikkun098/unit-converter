import React, { useState, useEffect } from 'react';
import { getHistory, HistoryItem } from '../services/api';

export const ConversionHistory = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]); // ← 型指定

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryData(data);
      } catch (error) {
        console.error('履歴取得エラー:', error);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <aside className={`bg-white rounded-xl shadow border border-blue-200 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-6 overflow-hidden' : 'w-80'
    }`}>
      {isCollapsed ? (
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
                <div className="text-sm text-gray-600">
                  {item.value} {item.from_unit} → {item.result} {item.to_unit}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};