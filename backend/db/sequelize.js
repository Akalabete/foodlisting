const { Sequelize, DataTypes } = require('sequelize');
const RecipeModel = require('./path/to/your/recipeModel'); // Assurez-vous de remplacer par le bon chemin

const sequelize = new Sequelize('FoodListing', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
});

const Recipe = RecipeModel(sequelize, DataTypes);

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Unable to create the database & tables:', err);
  }
};

module.exports = {
  Recipe,
  authenticateDB,
  syncDB
};