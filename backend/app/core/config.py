from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Voxa Reader API"
    API_V1_STR: str = "/api/v1"
    
    # SQLite for starting simple
    DATABASE_URL: str = "sqlite:///./voxa_db.sqlite"
    
    SECRET_KEY: str = "voxa_super_secret_jwt_key_123!"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    class Config:
        case_sensitive = True

settings = Settings()
