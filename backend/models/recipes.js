module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Recipe', {
        recipeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        recipeName: {
        type: DataTypes.STRING,
        allowNull: false
        },
        isVegan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
        isVegetarian: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
        numberOfSpoon: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        ingredients: {
        type: DataTypes.JSON, // Utilisation de JSON pour stocker un tableau d'objets
        allowNull: false
        },
        instructionPoints: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Tableau de chaînes de caractères
        allowNull: false
        },
        difficultyRate: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
        },
        yummyRating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
        },
        bakingTime: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
            default: 'Anonyme'
            },
        timestamp: true
    });
}

Recipe.hasMany(Ingredient, { foreignKey: 'recipeId' });
Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' });
