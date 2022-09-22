import DebugWatcher from "./utils/DebugWatcher.js";
import RemoteSQLiteDatabase from "./database/RemoteSQLiteDatabase.js";

function init() {
    console.log("### Starting WebTech-App ###"); // eslint-disable-line no-console
    DebugWatcher.connect(); // Enables live reloading when client code has changed
    
      initDB();
      accessDataSpeeches();
      accessDataSpeaker();
      accessDataParties();
      accessDataAgenda();
      accessDataTime();
}

//Example function for database handling
async function initDB(){

    let query, response, db;

    // Create remote database connection
    db = new RemoteSQLiteDatabase();
    db.connect();

    // Show all tables in database
    //Hier irgendwann Funktion, um Kommentare in Database abzuspeichern!  
    query = "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ";
    response = await db.runQuery(query);
    console.log(`Result for "${query}"`); // eslint-disable-line no-console
    console.log(response.resultSet); // eslint-disable-line no-console
}

async function accessDataSpeeches(){

    let query, response, db;
    
    db = new RemoteSQLiteDatabase();
    db.connect();

    query = "SELECT * FROM Speech";
    response = await db.runQuery(query);
    console.log(response.resultSet);
    let text = "Unsere Webseite zeigt " +response.resultSet.length+ " Redebeiträge.";
    document.getElementById("all-speeches").innerHTML = text;
}

async function accessDataSpeaker(){

    let query, response, db;
    
    db = new RemoteSQLiteDatabase();
    db.connect();

    query = "SELECT * FROM Speaker";
    response = await db.runQuery(query);
    console.log(response.resultSet);
    let text = "Die hier gezeigten Beiträge stammen von  " +response.resultSet.length+ " verschiedenen Politiker*innen.";
    document.getElementById("number-speaker").innerHTML = text;
}

async function accessDataParties(){

    let query, response, db;
    
    db = new RemoteSQLiteDatabase();
    db.connect();

    query = "SELECT * FROM Party";
    response = await db.runQuery(query);
    console.log(response.resultSet);
    let text = "Insgesamt sind Reden von Politiker*innen aus " +response.resultSet.length+ " verschiedenen Parteien vertreten.";
    document.getElementById("number-parties").innerHTML = text;
}

async function accessDataAgenda(){

    let query, response, db;
    
    db = new RemoteSQLiteDatabase();
    db.connect();

    query = "SELECT * FROM Agenda";
    response = await db.runQuery(query);
    console.log(response.resultSet);
    let text = "Die Redebeiträge diskutieren " +response.resultSet.length+ " verschiedenen Themen, beziehungsweise Sitzungspunkte.";
    document.getElementById("number-agendas").innerHTML = text;
}
/* Zeitraum angeben?
async function accessDataTime(){

    let query, response, db;
    
    db = new RemoteSQLiteDatabase();
    db.connect();

    query = "SELECT FIRST (speechId) AS first_speech FROM Speech";
    response = await db.runQuery(query);
    console.log(response.resultSet);
    let text = "Insgesamt sind Reden von Politiker*innen aus " +response.resultSet+ " verschiedenen Parteien vertreten.";
    document.getElementById("first-speech").innerHTML = text;
}*/
init();

