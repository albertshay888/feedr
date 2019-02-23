'use strict';

module.exports = (sequelize, DataTypes) => {
    const Articles = sequelize.define('Articles', {
        title: DataTypes.STRING,
        source: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        date: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        blurb: DataTypes.STRING,
        arturl: DataTypes.STRING,
        isSaved: DataTypes.BOOLEAN
    });
    return Articles;
  };