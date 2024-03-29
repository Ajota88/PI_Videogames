const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue:1000000
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.FLOAT
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });
};
