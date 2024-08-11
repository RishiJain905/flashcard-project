module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password_hash:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user','admin'),
            defultValue: 'user',
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defultValue: true,
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

    return users
};