from app import app
from flask import json, request
from flask_restful import Resource, Api

import logging

api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class MyData(Resource):
	def get(self):
		logging.info('inside the route -Started')
		return {'hello': 'myData'}

	def post(self):
		logging.info('inside the route mydata-Post')
		_name = request.form['data']
		return {'hello': 'Posting myData' + _name}	

api.add_resource(HelloWorld, '/hello')
api.add_resource(MyData, '/mydata')


@app.route('/')
def root():
    return app.send_static_file('index.html')
