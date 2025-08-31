from fastapi import FastAPI, Depends 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .data.unit_data import UNIT_DATA
from .database import SessionLocal, ConversionHistory
from datetime import datetime


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
    allow_origins=[
        "http://localhost:3000",  # ローカル開発用
        "https://unit-converter-two-murex.vercel.app"  # 本番用（追加）
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            {"id": "energy", "name": "エネルギー"},
            {"id": "angle", "name": "角度"},
            {"id": "fuel_efficiency", "name": "燃費"}
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


# データベースセッション取得
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 履歴保存用のデータモデル
class HistorySaveRequest(BaseModel):
    category: str
    value: float
    from_unit: str
    to_unit: str
    result: float

# 履歴保存API
@app.post("/api/history")
def save_history(request: HistorySaveRequest, db: Session = Depends(get_db)):
    # 新しい履歴レコードを作成
    db_history = ConversionHistory(
        category=request.category,
        value=request.value,
        from_unit=request.from_unit,
        to_unit=request.to_unit,
        result=request.result,
        created_at=datetime.utcnow()
    )
    
    # データベースに保存
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    
    return {"message": "履歴を保存しました", "id": db_history.id}

# 履歴取得API
@app.get("/api/history")
def get_history(db: Session = Depends(get_db)):
    # 最新10件の履歴を取得
    histories = db.query(ConversionHistory).order_by(ConversionHistory.created_at.desc()).limit(10).all()
    
    return {
        "histories": [
            {
                "id": h.id,
                "category": h.category,
                "value": h.value,
                "from_unit": h.from_unit,
                "to_unit": h.to_unit,
                "result": h.result,
                "created_at": h.created_at.isoformat()
            }
            for h in histories
        ]
    }