// API呼び出し用の型定義
interface ConvertRequest {
  value: number;
  from_unit: string;
  to_unit: string;
  category: string;
}

interface ConvertResponse {
  value: number;
  from_unit: string;
  to_unit: string;
  result: number;
  formula: string;
}

interface Category {
  id: string;
  name: string;
}


// 履歴保存用の型（バックエンドのHistorySaveRequestと対応）
interface HistorySaveRequest {
  category: string;     // "distance"
  value: number;        // 5.0
  from_unit: string;    // "m"
  to_unit: string;      // "cm"
  result: number;       // 500.0
}

// 履歴取得用の型
export interface HistoryItem {
  id: number;           // 1
  category: string;     // "distance"
  value: number;        // 5.0
  from_unit: string;    // "m"
  to_unit: string;      // "cm"
  result: number;       // 500.0
  created_at: string;   // "2025-01-09T14:30:00"
}

interface HistoryResponse {
  histories: HistoryItem[];
}


// カテゴリ一覧を取得する関数
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/categories');
  const data = await response.json();
  return data.categories;
};

// 単位変換を実行する関数
export const convertUnits = async (request: ConvertRequest): Promise<ConvertResponse> => {
  const response = await fetch('http://127.0.0.1:8000/api/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('変換に失敗しました');
  }
  
  return await response.json();
};


// 履歴を保存する関数
export const saveHistory = async (request: HistorySaveRequest): Promise<void> => {
  const response = await fetch('http://127.0.0.1:8000/api/history', {
    method: 'POST',                           // POSTメソッド
    headers: {
      'Content-Type': 'application/json',     // JSON形式で送信
    },
    body: JSON.stringify(request),            // データをJSON文字列に変換
  });
  
  if (!response.ok) {
    throw new Error('履歴保存に失敗しました');
  }
  
  // 保存成功（戻り値なし）
};


// 履歴を取得する関数
export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/history');
  
  if (!response.ok) {
    throw new Error('履歴取得に失敗しました');
  }
  
  const data: HistoryResponse = await response.json();
  return data.histories;  // HistoryItem[] の配列を返す
};


