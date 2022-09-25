import DebugWatcher from "./utils/DebugWatcher.js";
import RemoteSQLiteDatabase from "./database/RemoteSQLiteDatabase.js";

function init() {
    console.log("### Starting WebTech-App ###"); // eslint-disable-line no-console
    DebugWatcher.connect(); // Enables live reloading when client code has changed
    
      initDB();
}

//Example function for database handling
async function initDB(){

    let query, response, db;

    // Create remote database connection
    db = new RemoteSQLiteDatabase();
    db.connect();

    // Show all tables in database 
    query = "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ";
    response = await db.runQuery(query);
    console.log(`Result for "${query}"`); // eslint-disable-line no-console
    console.log(response.resultSet); // eslint-disable-line no-console
/** 
    query = "SELECT title FROM agenda";
    response = await db.runQuery(query);
    console.log(`Result for "${query}"`);
    console.log(response.resultSet);*/
}

init();
