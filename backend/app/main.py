from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL許可
    allow_credentials=True,
    allow_methods=["*"],  # 全HTTPメソッド許可
    allow_headers=["*"],  # 全ヘッダー許可
)

@app.get("/")  # 既存のコードはそのまま

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
            {"id": "temperature", "name": "温度"},
            {"id": "area", "name": "面積"},
            {"id": "volume", "name": "体積"},
            {"id": "speed", "name": "速度"},
            {"id": "pressure", "name": "圧力"},
            {"id": "energy", "name": "エネルギー"}
        ]
    }

# 単位変換API
@app.post("/api/convert", response_model=ConvertResponse)
def convert_units(request: ConvertRequest):
    # 温度は特殊計算
    if request.category == "temperature":
        result = convert_temperature(request.value, request.from_unit, request.to_unit)
    elif request.category in UNIT_DATA:
        # 通常の倍率計算
        units = UNIT_DATA[request.category]
        base_value = request.value * units[request.from_unit]
        result = base_value / units[request.to_unit]
    else:
        # 未対応カテゴリ
        return ConvertResponse(
            value=request.value, from_unit=request.from_unit, to_unit=request.to_unit,
            result=0, formula="未対応のカテゴリです"
        )
    
    return ConvertResponse(
        value=request.value, from_unit=request.from_unit, to_unit=request.to_unit,
        result=result, formula=f"{request.value} {request.from_unit} → {result} {request.to_unit}"
    )

# 温度変換関数
def convert_temperature(value, from_unit, to_unit):
    # 摂氏に変換
    if from_unit == "C":
        celsius = value
    elif from_unit == "F":
        celsius = (value - 32) * 5/9
    elif from_unit == "K":
        celsius = value - 273.15
    
    # 摂氏から目標単位に変換
    if to_unit == "C":
        return celsius
    elif to_unit == "F":
        return celsius * 9/5 + 32
    elif to_unit == "K":
        return celsius + 273.15