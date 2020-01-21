module.exports = function (sequelize, DataTypes) {
    var category = sequelize.define("Category", {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return category;
};
