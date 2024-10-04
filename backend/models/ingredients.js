module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Ingredient', {
        ingredientId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        qty: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        unityType: {
        type: DataTypes.ENUM('gramme(s)', 'unité(s)', 'petites cuillère(s)', 'centilitre(s)', 'grande cuillère(s)'),
        allowNull: false
    },
    ingType: {
      type: DataTypes.ENUM('légumess', 'fruits', 'oeufs', 'lait d/origine animale', 'poisson', 'viande'),
      allowNull: false
    }
  });
}