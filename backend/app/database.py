# 道具を取り出す
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# データベースファイルの場所を指定
SQLALCHEMY_DATABASE_URL = "sqlite:///./conversion_history.db"

# データベースエンジンを起動
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# データベースとの接続を管理する道具
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# テーブル設計図の基本型
Base = declarative_base()

# 履歴テーブルの設計図
class ConversionHistory(Base):
    __tablename__ = "conversion_history"
    
    id = Column(Integer, primary_key=True, index=True)      # 連番（1,2,3...）
    category = Column(String, index=True)                   # カテゴリ名
    value = Column(Float)                                   # 入力値
    from_unit = Column(String)                              # 変換前単位
    to_unit = Column(String)                                # 変換後単位
    result = Column(Float)                                  # 変換結果
    created_at = Column(DateTime, default=datetime.utcnow) # 作成日時

# テーブルを実際に作成
Base.metadata.create_all(bind=engine)