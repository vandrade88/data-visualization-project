import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
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
        # f"/api/v1.0/passengers"
    )


@app.route("/whr/2020")
def r2020():
    # create our session (link) from python to the db
    # session = Session(engine)
    session = Session()


    # query the full table
    results = session.query(Whr2020.id, Whr2020.country, Whr2020.score, Whr2020.overall_rank, Whr2020.gdp_per_capita, Whr2020.social_support,\
        Whr2020.healthy_life_expectancy, Whr2020.freedom_to_make_life_choices, Whr2020.generosity, Whr2020.perceptions_of_corruption).all()
    # results = session.query(whr2020).order_by(whr2020.score.desc()).all()
    # results = engine.execute("SELECT * FROM whr2020")
    # for r in results:
    #     print(r)

    session.close()

    # Convert list of tuples into normal list
    # all_2020 = list(np.ravel(results))

    return jsonify(results)

    # return jsonify({"results": [dict(row) for row in results]})


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
