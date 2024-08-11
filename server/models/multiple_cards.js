module.exports = (sequelize, DataTypes) => {
    const multiple_cards = sequelize.define("multiple_cards",{
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'users',
                key: 'id'
            }
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
    });

    return multiple_cards
};