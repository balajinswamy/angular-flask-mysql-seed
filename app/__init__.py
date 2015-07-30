from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
app.config['APPLICATION_ROOT'] = '/api/v1'
db = SQLAlchemy(app)

logging.basicConfig(filename='vsnLookup.log', level=logging.DEBUG)

logging.info('Started')

# from app.routes import index
from app.routes import indexMysql
# from app.routes import indexMysqlSwagger

