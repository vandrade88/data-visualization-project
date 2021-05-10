import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func

import simplejson as json

from flask import Flask, jsonify, after_this_request

from flask_pymongo import PyMongo
from pymongo import MongoClient

from bson import json_util

# flask setup
app = Flask(__name__)

# mongo database setup
app.config["MONGO_URI"] = "mongodb://localhost:27017/geojson"
mongo = PyMongo(app)

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb://localhost:27017/geojson")
db = client.mydb

def parse_json(data):
    return json.loads(json_util.dumps(data))

# flask routes
@app.route("/")
def welcome():    
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/whr/2020<br/>"
        f"/whr/2019<br/>"
        f"/whr/2018<br/>"
        f"/whr/2017<br/>"
        f"/whr/2016<br/>"
        f"/whr/year/<year>"
    )

@app.route("/whr/2020", methods=['POST','GET'])
def r2020():
    @after_this_request
    def add_header(response):
        # response = flask.jsonify({'some': 'data'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers.add('Content-Security-Policy', 'self')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))

    whr2020 = parse_json(mongo.db.whr2020.find({}))

    for items in range(len(countries[0]['features'])):
    
        for idx,d in enumerate(countries[0]['features']):
            countries[0]['features'][items]['countryName'] = ""
            countries[0]['features'][items]['score'] = ""
            countries[0]['features'][items]['rank'] = ""

            countryName = countries[0]['features'][items]['properties']['ADMIN']

            for item in whr2020:
                if (item['country']) == countryName:
                    country = item['country']
                    score = item['score']
                    rank = item['overall_rank']
                    countries[0]['features'][items]['score'] = score
                    countries[0]['features'][items]['countryName'] = country
                    countries[0]['features'][items]['rank'] = rank

            if countries[0]['features'][items]['score'] == "":
                countries[0]['features'][items]['score'] = 0

    sortedCountries = sorted(countries[0]['features'], key=lambda x: float(x['score']), reverse = True)

    return json.dumps(sortedCountries)


@app.route("/whr/2019", methods=['POST','GET'])
def r2019():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))

    whr2019 = parse_json(mongo.db.whr2019.find({}))

    for items in range(len(countries[0]['features'])):
    
        for idx,d in enumerate(countries[0]['features']):
            countries[0]['features'][items]['countryName'] = ""
            countries[0]['features'][items]['score'] = ""
            countries[0]['features'][items]['rank'] = ""

            countryName = countries[0]['features'][items]['properties']['ADMIN']

            for item in whr2019:
                if (item['country']) == countryName:
                    country = item['country']
                    score = item['score']
                    rank = item['overall_rank']
                    countries[0]['features'][items]['score'] = score
                    countries[0]['features'][items]['countryName'] = country
                    countries[0]['features'][items]['rank'] = rank
  
            if countries[0]['features'][items]['score'] == "":
                countries[0]['features'][items]['score'] = 0

    sortedCountries = sorted(countries[0]['features'], key=lambda x: float(x['score']), reverse = True)

    return json.dumps(sortedCountries)


@app.route("/whr/2018", methods=['POST','GET'])
def r2018():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))

    whr2018 = parse_json(mongo.db.whr2018.find({}))

    for items in range(len(countries[0]['features'])):
    
        for idx,d in enumerate(countries[0]['features']):
            countries[0]['features'][items]['countryName'] = ""
            countries[0]['features'][items]['score'] = ""
            countries[0]['features'][items]['rank'] = ""

            countryName = countries[0]['features'][items]['properties']['ADMIN']

            for item in whr2018:
                if (item['country']) == countryName:
                    country = item['country']
                    score = item['score']
                    rank = item['overall_rank']
                    countries[0]['features'][items]['score'] = score
                    countries[0]['features'][items]['countryName'] = country
                    countries[0]['features'][items]['rank'] = rank
            
            if countries[0]['features'][items]['score'] == "":
                countries[0]['features'][items]['score'] = 0

    sortedCountries = sorted(countries[0]['features'], key=lambda x: float(x['score']), reverse = True)

    return json.dumps(sortedCountries)


@app.route("/whr/2017", methods=['POST','GET'])
def r2017():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))

    whr2017 = parse_json(mongo.db.whr2017.find({}))

    for items in range(len(countries[0]['features'])):
    
        for idx,d in enumerate(countries[0]['features']):
            countries[0]['features'][items]['countryName'] = ""
            countries[0]['features'][items]['score'] = ""
            countries[0]['features'][items]['rank'] = ""

            countryName = countries[0]['features'][items]['properties']['ADMIN']

            for item in whr2017:
                if (item['country']) == countryName:
                    country = item['country']
                    score = item['score']
                    rank = item['overall_rank']
                    countries[0]['features'][items]['score'] = score
                    countries[0]['features'][items]['countryName'] = country
                    countries[0]['features'][items]['rank'] = rank
            
            if countries[0]['features'][items]['score'] == "":
                countries[0]['features'][items]['score'] = 0

    sortedCountries = sorted(countries[0]['features'], key=lambda x: float(x['score']), reverse = True)

    return json.dumps(sortedCountries)


@app.route("/whr/2016", methods=['POST','GET'])
def r2016():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))

    whr2016 = parse_json(mongo.db.whr2016.find({}))

    for items in range(len(countries[0]['features'])):
    
        for idx,d in enumerate(countries[0]['features']):
            countries[0]['features'][items]['countryName'] = ""
            countries[0]['features'][items]['score'] = ""
            countries[0]['features'][items]['rank'] = ""

            countryName = countries[0]['features'][items]['properties']['ADMIN']

            for item in whr2016:
                if (item['country']) == countryName:
                    country = item['country']
                    score = item['score']
                    rank = item['overall_rank']
                    countries[0]['features'][items]['score'] = score
                    countries[0]['features'][items]['countryName'] = country
                    countries[0]['features'][items]['rank'] = rank
            
            if countries[0]['features'][items]['score'] == "":
                countries[0]['features'][items]['score'] = 0

    sortedCountries = sorted(countries[0]['features'], key=lambda x: float(x['score']), reverse = True)

    return json.dumps(sortedCountries)



if __name__ == '__main__':
    app.run(debug=True)
