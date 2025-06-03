from fastapi import FastAPI

# アプリケーション作成
app = FastAPI()

# 最初のAPI
@app.get("/")
def hello():
    return {"message": "Hello!"}