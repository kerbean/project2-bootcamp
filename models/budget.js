module.exports = function (sequelize, DataTypes) {
    var budget = sequelize.define("Logs", {
        logs_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logs_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        logs_currency: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    budget.associate = function (models) {
        budget.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
        budget.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return budget;
};
