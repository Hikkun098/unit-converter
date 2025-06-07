from fastapi import FastAPI
from pydantic import BaseModel

# リクエストの形を定義
class ConvertRequest(BaseModel):
    value: float        # 5.0
    from_unit: str      # "m" 
    to_unit: str        # "cm"
    category: str       # "distance"

# レスポンスの形を定義  
class ConvertResponse(BaseModel):
    value: float        # 5.0
    from_unit: str      # "m"
    to_unit: str        # "cm" 
    result: float       # 500.0
    formula: str        # "5 m → 500 cm"


app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello!"}

@app.get("/api/categories")
def get_categories():
    return {
        "categories": [
            {"id": "distance", "name": "距離"},
            {"id": "data_size", "name": "データサイズ"}, 
            {"id": "weight", "name": "重量"},
            {"id": "time", "name": "時間"},
            {"id": "temperature", "name": "温度"}
        ]
    }

# 単位変換API
@app.post("/api/convert", response_model=ConvertResponse)
def convert_units(request: ConvertRequest):
    # 距離の変換データ（フロントエンドと同じ）
    distance_units = {
        "m": 1,         # 基準単位
        "km": 1000,
        "cm": 0.01,
        "mm": 0.001,
        "ft": 0.3048,
        "inch": 0.0254
    }
    
    # 現在は距離のみ対応
    if request.category == "distance":
        # 基準単位（m）に変換
        value_in_meters = request.value * distance_units[request.from_unit]
        # 目標単位に変換
        result = value_in_meters / distance_units[request.to_unit]
        
        # 結果を返す
        return ConvertResponse(
            value=request.value,
            from_unit=request.from_unit,
            to_unit=request.to_unit,
            result=result,
            formula=f"{request.value} {request.from_unit} → {result} {request.to_unit}"
        )
    else:
        # 他のカテゴリは後で実装
        return ConvertResponse(
            value=request.value,
            from_unit=request.from_unit,
            to_unit=request.to_unit,
            result=0,
            formula="未対応のカテゴリです"
        )