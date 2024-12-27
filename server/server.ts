import express from 'express';
import db from './src/database/db';
import { initRouting } from './src/routes';
import { initMiddlewares } from './src/middlewares';
import path from "node:path";
require('dotenv').config();

const app = express();
let PORT: any;
if (process.env.NODE_ENV === "production") {
    PORT = process.env.PORT || 3000;

    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}else{
    PORT = 8081;
}


initMiddlewares(app);
initRouting(app);

app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}`);

    await db.createTables();
});
