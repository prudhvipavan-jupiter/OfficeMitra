"""OfficeMitra Intelligence Engine configuration."""
from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = Field(
        default="",
        validation_alias=AliasChoices("DATABASE_URL", "POSTGRES_URL"),
    )
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    intelligence_api_key: str = "dev-intelligence-key"
    monitor_interval_minutes: int = 30
    resend_api_key: str = ""
    email_from: str = "OfficeMitra Intelligence <noreply@theofficemitra.com>"
    admin_email: str = "admin@theofficemitra.com"
    request_timeout_seconds: int = 30
    user_agent: str = "OfficeMitra-Intelligence/1.0 (+https://theofficemitra.com)"


settings = Settings()
