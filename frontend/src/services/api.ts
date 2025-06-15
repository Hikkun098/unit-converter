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