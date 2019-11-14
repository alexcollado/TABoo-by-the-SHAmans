from flask import Flask

from backend.models import db

app = Flask(__name__)


from backend import routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://your-username:your-password@localhost/development'

from backend import models
db.init_app(app)
