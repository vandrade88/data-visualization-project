import simplejson as json

from flask import Flask, jsonify, after_this_request, render_template, redirect, url_for

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
@app.route("/", methods=['GET'])
def home():    
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', 'self')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', '*')
        return response

    countries = parse_json(mongo.db.newCountries.find({}))
    results = json.dumps(countries)
    return render_template('index.html', results=results)

@app.route("/whr/2020", methods=['GET'])
def r2020():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', 'self')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
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

    results = json.dumps(sortedCountries)
    return render_template('whr2020.html', results=results)


@app.route("/whr/2019", methods=['GET'])
def r2019():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', 'self')
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

    results = json.dumps(sortedCountries)
    return render_template('whr2019.html', results=results)


@app.route("/whr/2018", methods=['GET'])
def r2018():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', 'self')
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

    results = json.dumps(sortedCountries)
    return render_template('whr2018.html', results=results)


@app.route("/whr/2017", methods=['GET'])
def r2017():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', 'self')
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

    # return json.dumps(sortedCountries)
    results = json.dumps(sortedCountries)
    return render_template('whr2017.html', results=results)


@app.route("/whr/2016", methods=['GET'])
def r2016():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', 'self')
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

    results = json.dumps(sortedCountries)
    return render_template('whr2016.html', results=results)


@app.errorhandler(404)
def not_found(error):
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        # response.headers['Cache-Control'] = 'public, max-age=0'
        # response.headers.add('Content-Security-Policy', 'self')
        # return response

    app.logger.info(error)
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
