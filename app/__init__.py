from flask import Flask
import logging

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
app.config['APPLICATION_ROOT'] = '/api/v1'


logging.basicConfig(filename='myapp.log', level=logging.DEBUG)

logging.info('Started')
logging.info(app.config)


from app.routes import indexMysql


