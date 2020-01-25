module.exports = function (sequelize, DataTypes) {
    var Log = sequelize.define("Log", {
        logs_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logs_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logs_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        logs_category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Log;
};