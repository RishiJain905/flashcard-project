module.exports = (sequelize, DataTypes) => {
    const multiple_decks = sequelize.define("multiple_decks",{
        deck_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'multiple_cards',
                key: 'id'
            },
            primaryKey: true,
        },
        flashcard_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences:{
                model: 'flashcards',
                key: 'id'
            },
            primaryKey: true,
        }
    }, {
        timestamps: false,
    });

    return multiple_decks
};