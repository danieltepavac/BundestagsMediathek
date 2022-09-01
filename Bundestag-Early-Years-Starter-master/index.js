import 'dotenv/config';
import express, { request } from 'express';
import open from 'open';
import Logger from './lib/Logger.js';
import Database from './lib/Database.js';
import watch from 'node-watch';

let app,
    hasUncosumedChanges = false;

async function initDatabase() {
    await Database.open(process.env.DB_FILE);
    return;
}

function startExpress() {
    app = express();
    app.use(express.static(process.env.APP_DIR));
    app.use(express.json());
    app.get("/changes", (request, response) => {
        response.send({
            hasChanges: hasUncosumedChanges,
            shouldReload: hasUncosumedChanges,
        });
        hasUncosumedChanges = false;
    });
    app.post("/database", async (request, response) => {
        try {
            let result = await Database.runQuery(request.body);
            response.send(result);
        } catch (error) {
            response.send(error);
        }
    });
    app.listen(process.env.PORT);
}
function onClientCodeChanged() {
    Logger.log("Detected changes in client code");
    hasUncosumedChanges = true;
}

// Startup
(async function () {
    // TODO Erstellte und befüllte Datenbank-Datei als database.sqlite im Projektordner ablegen
    Logger.enable();
    await initDatabase();
    if (process.env.DEBUG === "true") {
        watch(process.env.APP_DIR, { recursive: true }, onClientCodeChanged);
        Logger.log("Debugger enabled");
    } else {
        Logger.log("Debugger disabled");
    }
    startExpress();
    open("http://localhost:8080");
}());