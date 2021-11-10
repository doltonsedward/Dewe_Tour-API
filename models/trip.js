'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trip.belongsTo(models.country, {
        foreignKey: {
          name: "countryId"
        },
      })
    }
  };
  
  trip.init({
    title: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    quota: DataTypes.INTEGER,
    filled: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};