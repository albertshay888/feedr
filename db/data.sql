
-- DROP DATABASE IF EXISTS feedr_db;

CREATE DATABASE feedr_db;
USE feedr_db;

CREATE TABLE ratingSitesUS (
    id INT(5) NOT NULL AUTO_INCREMENT,
    siteId VARCHAR (20) NOT NULL, 
    conservativeRating INT NOT NULL, 
    reliaibityRating INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE keyWord (
    id INT(5) NOT NULL AUTO_INCREMENT,
    keyWord VARCHAR (20) NOT NULL,
    siteIds VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);
