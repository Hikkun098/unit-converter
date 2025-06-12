from fastapi import FastAPI
from pydantic import BaseModel
from data.unit_data import UNIT_DATA


class ConvertRequest(BaseModel):
    value: float
    from_unit: str
    to_unit: str
    category: str

class ConvertResponse(BaseModel):
    value: float
    from_unit: str
    to_unit: str
    result: float
    formula: str

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
    # データを外部ファイルから取得
    if request.category in UNIT_DATA:
        units = UNIT_DATA[request.category]
        base_value = request.value * units[request.from_unit]
        result = base_value / units[request.to_unit]
        
        return ConvertResponse(
            value=request.value, from_unit=request.from_unit, to_unit=request.to_unit,
            result=result, formula=f"{request.value} {request.from_unit} → {result} {request.to_unit}"
        )
    else:
        # 未対応カテゴリ
        return ConvertResponse(
            value=request.value, from_unit=request.from_unit, to_unit=request.to_unit,
            result=0, formula="未対応のカテゴリです"
        )