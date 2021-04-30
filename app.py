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
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # results = mongo.db.allyears.find({},\
    #     { "country": 1, "2020_score": 1, "2020_rank": 1, "_id": 0 })
    # results_sorted = parse_json(results.sort("2020_score", -1))

    # results = parse_json(mongo.db.countries.find({},{"properties.ADMIN": 1, "geometry.coordinates": 1, "_id": 0}))
    # # { "id": 1, "year": 1, "country": 1, "score": 1, "overall_rank": 1, "_id": 0 })

    # return json.dumps(results)

    results = parse_json(mongo.db.allyears.aggregate([
        # {"$unwind": "$properties"
        # },
        {"$lookup":{
            "from": "countries",       # other table name
            "localField": "country",        # key field in collection 2
            "foreignField": "properties.ADMIN",      # key field in collection 1
            "as": "linked"   # alias for resulting table
        }},
        {"$sort":{
            "score_2020": -1
        }}
    ]))
    
    return json.dumps(results)


@app.route("/whr/2019", methods=['POST','GET'])
def r2019():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    results = mongo.db.allyears.find({},\
        { "country": 1, "2019_score": 1, "2019_rank": 1, "_id": 0 })
    results_sorted = parse_json(results.sort("2019_score", -1))
    return json.dumps(results_sorted)


@app.route("/whr/2018", methods=['POST','GET'])
def r2018():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    results = mongo.db.allyears.find({},\
        { "country": 1, "2018_score": 1, "2018_rank": 1, "_id": 0 })
    results_sorted = parse_json(results.sort("2018_score", -1))

    return json.dumps(results_sorted)


@app.route("/whr/2017", methods=['POST','GET'])
def r2017():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    results = mongo.db.allyears.find({},\
        { "country": 1, "2017_score": 1, "2017_rank": 1, "_id": 0 })
    results_sorted = parse_json(results.sort("2017_score", -1))

    return json.dumps(results_sorted)


@app.route("/whr/2016", methods=['POST','GET'])
def r2016():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    results = mongo.db.allyears.find({},\
        { "country": 1, "2016_score": 1, "2016_rank": 1, "_id": 0 })
    results_sorted = parse_json(results.sort("2016_score", -1))

    return json.dumps(results_sorted)


@app.route("/whr/year/<year>", methods=['POST','GET'])
def year_selected(year):
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

#     session = Session()

#     # query the data depending on year
#     if year == 2020:
#         results = session.query(Whr2020.year, Whr2020.country, Whr2020.score, Whr2020.overall_rank).all()
#     elif year == 2019:
#         results = session.query(Whr2019.year, Whr2019.country, Whr2019.score, Whr2019.overall_rank).all()
#     elif year == 2018:
#         results = session.query(Whr2018.year, Whr2018.country, Whr2018.score, Whr2018.overall_rank).all()
#     elif year == 2017:
#         results = session.query(Whr2017.year, Whr2017.country, Whr2017.score, Whr2017.overall_rank).all()
#     else:
#         results = session.query(Whr2016.year, Whr2016.country, Whr2016.score, Whr2016.overall_rank).all()

#     results = mongo.db.whr2016.find({},\
#         { "id": 1, "year": 1, "country": 1, "score": 1, "overall_rank": 1, "_id": 0 })
#     results_sorted = parse_json(results.sort("score", -1))

#     return json.dumps(results_sorted)

@app.route("/map/2020", methods=['POST','GET'])
def m2020():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    results = parse_json(mongo.db.countries.find({},{"properties.ADMIN": 1, "geometry.coordinates": 1, "_id": 0}))
        # { "id": 1, "year": 1, "country": 1, "score": 1, "overall_rank": 1, "_id": 0 })

    return json.dumps(results)

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

    # return jsonify(results)
    # return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=True)
