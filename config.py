from os import environ


class Config:
    """Set Flask configuration vars from .env file."""

    FLASK_DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://taboo:qkTVzUaAQXxeAw9P@taboo.cebb6zpk0nys.us-east-1.rds.amazonaws.com/taboo_db'

