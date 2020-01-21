module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("Users", {
        user_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return users;
};
