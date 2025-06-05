from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello!"}

# 新しく追加 ↓
@app.get("/api/categories")
def get_categories():
    return {
        "categories": [
            {"id": "distance", "name": "Distance"},
            {"id": "data_size", "name": "Data Size"},
            {"id": "weight", "name": "Weight"},
            {"id": "time", "name": "Time"},
            {"id": "temperature", "name": "Temperature"}
        ]
    }