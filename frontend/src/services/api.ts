// API呼び出し用の型定義

// services/api.ts
const API_BASE_URL = 'https://unit-converter-api.onrender.com';
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
  category: string;
  value: number;
  from_unit: string;
  to_unit: string;
  result: number;
}

// 履歴取得用の型
export interface HistoryItem {
  id: number;
  category: string;
  value: number;
  from_unit: string;
  to_unit: string;
  result: number;
  created_at: string;
}

interface HistoryResponse {
  histories: HistoryItem[];
}

// カテゴリ一覧を取得する関数
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  const data = await response.json();
  return data.categories;
};

// 単位変換を実行する関数
export const convertUnits = async (request: ConvertRequest): Promise<ConvertResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/convert`, {
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
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('履歴保存に失敗しました');
  }
};

// 履歴を取得する関数
export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  
  if (!response.ok) {
    throw new Error('履歴取得に失敗しました');
  }
  
  const data: HistoryResponse = await response.json();
  return data.histories;
};