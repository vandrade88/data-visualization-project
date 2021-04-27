import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func

import simplejson as json

from flask import Flask, jsonify


# database setup
# engine = create_engine("sqlite:///whr_db.sqlite")
rds_connection_string = "postgres:postgres@localhost:5432/whr_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

Session = sessionmaker(bind=engine)
session = Session()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Base.prepare()

# Save reference to the table
Whr2020 = Base.classes.whr2020
Whr2019 = Base.classes.whr2019
Whr2018 = Base.classes.whr2018
Whr2017 = Base.classes.whr2017
Whr2016 = Base.classes.whr2016

# flask setup
app = Flask(__name__)

# flask routes
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/whr/2020"
        f"/whr/2019"
        f"/whr/2018"
        f"/whr/2017"
        f"/whr/2015"
        # f"/api/v1.0/passengers"
    )


@app.route("/whr/2020")
def r2020():
    # create session from python to the db
    session = Session()


    # query the full table
    results = session.query(Whr2020.id, Whr2020.country, Whr2020.score, Whr2020.overall_rank, Whr2020.gdp_per_capita, Whr2020.social_support,\
        Whr2020.healthy_life_expectancy, Whr2020.freedom_to_make_life_choices, Whr2020.generosity, Whr2020.perceptions_of_corruption).all()
        # .order_by(Whr2020.score.desc())

    session.close()

    return jsonify(results)

@app.route("/whr/2019")
def r2019():
    # create session from python to the db
    session = Session()


    # query the full table
    results = session.query(Whr2019.id, Whr2019.country, Whr2019.score, Whr2019.overall_rank, Whr2019.gdp_per_capita, Whr2019.social_support,\
        Whr2019.healthy_life_expectancy, Whr2019.freedom_to_make_life_choices, Whr2019.generosity, Whr2019.perceptions_of_corruption).all()

    session.close()

    return jsonify(results)

@app.route("/whr/2018")
def r2018():
    # create session from python to the db
    session = Session()

    # query the full table
    results = session.query(Whr2018.id, Whr2018.country, Whr2018.score, Whr2018.overall_rank, Whr2018.gdp_per_capita, Whr2018.social_support,\
        Whr2018.healthy_life_expectancy, Whr2018.freedom_to_make_life_choices, Whr2018.generosity, Whr2018.perceptions_of_corruption).all()

    session.close()

    return jsonify(results)

@app.route("/whr/2017")
def r2017():
    # create session from python to the db
    session = Session()


    # query the full table
    results = session.query(Whr2017.id, Whr2017.country, Whr2017.score, Whr2017.overall_rank, Whr2017.gdp_per_capita, Whr2017.social_support,\
        Whr2017.healthy_life_expectancy, Whr2017.freedom_to_make_life_choices, Whr2017.generosity, Whr2017.trust, Whr2017.residual).all()

    session.close()

    return jsonify(results)

@app.route("/whr/2016")
def r2016():
    # create session from python to the db
    session = Session()


    # query the full table
    results = session.query(Whr2016.id, Whr2016.country, Whr2016.score, Whr2016.overall_rank, Whr2016.gdp_per_capita, Whr2016.social_support,\
        Whr2016.healthy_life_expectancy, Whr2016.freedom_to_make_life_choices, Whr2016.generosity, Whr2016.trust).all()

    session.close()

    return jsonify(results)


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
