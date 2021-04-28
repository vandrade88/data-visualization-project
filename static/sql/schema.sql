DROP TABLE IF EXISTS whr2020;
DROP TABLE IF EXISTS whr2019;
DROP TABLE IF EXISTS whr2018;
DROP TABLE IF EXISTS whr2017;
DROP TABLE IF EXISTS whr2016;

CREATE TABLE whr2020 (
	id INT PRIMARY KEY,
	"year" INT NOT NULL,
	"country" VARCHAR (75) NOT NULL,
	"score" NUMERIC NOT NULL,
	"overall_rank" INT NOT NULL,
	"gdp_per_capita" NUMERIC,
	"social_support" NUMERIC,
	"healthy_life_expectancy" NUMERIC,
	"freedom_to_make_life_choices" NUMERIC,
	"generosity" NUMERIC,
	"perceptions_of_corruption" NUMERIC
);

CREATE TABLE whr2019 (
	id INT PRIMARY KEY,
	"year" INT NOT NULL,
	"country" VARCHAR (75) NOT NULL,
	"score" NUMERIC NOT NULL,
	"overall_rank" INT NOT NULL,
	"gdp_per_capita" NUMERIC,
	"social_support" NUMERIC,
	"healthy_life_expectancy" NUMERIC,
	"freedom_to_make_life_choices" NUMERIC,
	"generosity" NUMERIC,
	"perceptions_of_corruption" NUMERIC
);

CREATE TABLE whr2018 (
	id INT PRIMARY KEY,
	"year" INT NOT NULL,
	"country" VARCHAR (75) NOT NULL,
	"score" NUMERIC NOT NULL,
	"overall_rank" INT NOT NULL,
	"gdp_per_capita" NUMERIC,
	"social_support" NUMERIC,
	"healthy_life_expectancy" NUMERIC,
	"freedom_to_make_life_choices" NUMERIC,
	"generosity" NUMERIC,
	"perceptions_of_corruption" NUMERIC
);

CREATE TABLE whr2017 (
	id INT PRIMARY KEY,
	"year" INT NOT NULL,
	"country" VARCHAR (75) NOT NULL,
	"score" NUMERIC NOT NULL,
	"overall_rank" INT NOT NULL,
	"gdp_per_capita" NUMERIC,
	"social_support" NUMERIC,
	"healthy_life_expectancy" NUMERIC,
	"freedom_to_make_life_choices" NUMERIC,
	"generosity" NUMERIC,
	"trust" NUMERIC,
	"residual" NUMERIC
);

CREATE TABLE whr2016 (
	id INT PRIMARY KEY,
	"year" INT NOT NULL,
	"country" VARCHAR (75) NOT NULL,
	"score" NUMERIC NOT NULL,
	"overall_rank" INT NOT NULL,
	"gdp_per_capita" NUMERIC,
	"social_support" NUMERIC,
	"healthy_life_expectancy" NUMERIC,
	"freedom_to_make_life_choices" NUMERIC,
	"generosity" NUMERIC,
	"trust" NUMERIC
);