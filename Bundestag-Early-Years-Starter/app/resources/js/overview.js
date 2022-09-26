import DebugWatcher from "./utils/DebugWatcher.js";
import RemoteSQLiteDatabase from "./database/RemoteSQLiteDatabase.js";

function init() {
    console.log("### Starting WebTech-App ###"); // eslint-disable-line no-console
    DebugWatcher.connect(); // Enables live reloading when client code has changed
    
      initDB();
      showSpeechesOverview();

      document.getElementById("searchButton").addEventListener("click", search);
      
}

async function initDB(){

    let db;

    // Create remote database connection
    db = new RemoteSQLiteDatabase();
    db.connect();
}

async function showSpeechesOverview(filterQuery = null){
    let query, response, db,
     speechesHtml = "";

    db = new RemoteSQLiteDatabase();
    db.connect();

    query = `SELECT *
            FROM Speech AS s
            LEFT JOIN Agenda AS a
                ON s.agendaId = a.agendaId`;
    if (filterQuery && filterQuery.length > 0) {
    query += ` WHERE s.date LIKE '%${filterQuery}%' OR
                    s.speaker LIKE '%${filterQuery}%' OR
                    a.title LIKE '%${filterQuery}%'`;    
    }
    
    response = await db.runQuery(query);
    console.log("######################"); //braucht man nicht unbedingt
    console.log(response);
    response.resultSet.forEach(speech => {
        console.log("");
        console.log("single speech");
        console.log(speech);
        const date = new Date(speech.date),
         year = date.getFullYear();
        speechesHtml +=`    
        <div class="overview-speech-entry">
            <p class="titel">${speech.title}</p>
            <p class="speaker">${speech.speaker}</p>
            <p class="year">${year}</p>
            <a href="detail.html?speechId=${speech.speechId}">Mehr Infos</a>
        </div>
    `;
    });
    document.getElementById("overview-speeches-list").innerHTML = speechesHtml;
}

function search() {
    const filterQuery = document.getElementById("searchInput").value;
    showSpeechesOverview(filterQuery);    
}
init();