from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

# FastAPIアプリケーションのインスタンスを作成
app = FastAPI(title="単位変換API")

# リクエストボディのモデル
class ConversionRequest(BaseModel):
    value: float
    from_unit: str
    to_unit: str
    category: Optional[str] = "data_size"  # デフォルトはデータサイズ

# レスポンスモデル
class ConversionResponse(BaseModel):
    value: float
    from_unit: str
    to_unit: str
    result: float
    formula: str

# ルートエンドポイント
@app.get("/")
def read_root():
    return {"message": "単位変換APIへようこそ！", "version": "1.0.0"}

# 単位変換カテゴリを取得するエンドポイント
@app.get("/categories")
def get_categories():
    return {
        "categories": [
            {"id": "data_size", "name": "データサイズ"},
            {"id": "length", "name": "長さ"},
            {"id": "temperature", "name": "温度"}
        ]
    }

# データサイズ変換エンドポイント
@app.post("/convert/data-size", response_model=ConversionResponse)
def convert_data_size(request: ConversionRequest):
    # 単位の定義（bit基準）
    units = {
        "bit": 1,
        "byte": 8,
        "kilobyte": 8 * 1024,
        "megabyte": 8 * 1024 * 1024,
        "gigabyte": 8 * 1024 * 1024 * 1024,
        "terabyte": 8 * 1024 * 1024 * 1024 * 1024,
    }
    
    # 変換先または変換元の単位が未定義の場合はエラー
    if request.from_unit not in units or request.to_unit not in units:
        return {"error": "未対応の単位です"}
    
    # 変換ロジック
    value_in_bits = request.value * units[request.from_unit]
    result = value_in_bits / units[request.to_unit]
    
    # 変換式の文字列表現
    formula = f"{request.value} {request.from_unit} → {result} {request.to_unit}"
    
    return {
        "value": request.value,
        "from_unit": request.from_unit,
        "to_unit": request.to_unit,
        "result": result,
        "formula": formula
    }