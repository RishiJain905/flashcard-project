const subscriptions = require("./subscriptions");

module.exports = (sequelize, DataTypes) => {
    const payments = sequelize.define("payments",{
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'users',
                key: 'id'
            }
        },
        subscriptions_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'subscriptions',
                key: 'id'
            }
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status:{
            type: DataTypes.ENUM('completed','pending','failed'),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return payments
};