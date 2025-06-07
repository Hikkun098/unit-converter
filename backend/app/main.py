from fastapi import FastAPI

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