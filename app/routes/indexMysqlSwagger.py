from app import app

from flask import Flask
from flask.ext.restplus import Api, Resource, fields

api = Api(app, version='1.0', title='TrueCar API',
    description='A simple TrueCar API borrowed from flask-restful example!',
)

ns = api.namespace('vsnLookup', description='TrueCar API')

#todo: not now probably continue later