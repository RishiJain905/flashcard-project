const express = require('express');
const app = express();

const db = require ('./models');

db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});
