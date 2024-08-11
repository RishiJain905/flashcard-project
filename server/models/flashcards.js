module.exports = (sequelize, DataTypes) => {
    const flashcards = sequelize.define("flashcards",{
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

    return flashcards
};