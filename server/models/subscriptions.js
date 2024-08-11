module.exports = (sequelize, DataTypes) => {
    const subscriptions = sequelize.define("subscriptions",{
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'users',
                key: 'id'
            }
        },
        plan: {
            type: DataTypes.ENUM('free', 'premium'),
            allowNull: false,
            defaultValue: 'free',
        },
        start_date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        status:{
            type: DataTypes.ENUM('active', 'canceled'),
            allowNull: false,
            defaultValue: 'active',
        }
    }, {
        timestamps: false,
    });

    return subscriptions
};