import DebugWatcher from "./utils/DebugWatcher.js";
import RemoteSQLiteDatabase from "./database/RemoteSQLiteDatabase.js";

function init() {
    // url search params auslesen
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString),
    speechId = urlParams.get('speechId');
    console.log(speechId);
    loadSpeechDetails(speechId);
}

async function loadSpeechDetails(speechId){
    let query, response, db, detailHTML = "";

    db = new RemoteSQLiteDatabase();
    db.connect();

    query = `SELECT * FROM Speech AS s
                LEFT JOIN Speaker AS p
                ON s.speaker = p.name`;
    response = await db.runQuery(query);
    response.resultSet.forEach(speech => {
        console.log("");
        console.log("single speech");
        console.log(speechId);
        
        detailHTML +=`    
        <div class="speakerinfo"> 
        <p class="Name">${speechId}</p><br>
        <p class="Parteizugehörigkeit">${speech.speechId.speaker}</p><br>
        </div>
        `;
    });
    document.getElementsByClassName("speakerinfo").innerHTML = detailHTML;
    loadAudioFile();
}
//momentan greift die Funktion nur auf den Namen "audioId" zu; es muss der Pfad zum media Ordner mit der Id verbunden werden
async function loadAudioFile() {
    let query, response, db, audioHTML="";

    db = new RemoteSQLiteDatabase();
    db.connect();

    query = `SELECT audio FROM Speech`;
    response = await db.runQuery(query);
    console.log("**************");
    console.log(response);

    response.resultSet.forEach(speech => {
        console.log("");
        console.log(speech.audio);
        
        audioHTML +=`   
        <audio controls>
        <source src="&#92;Bundestag-Early-Years-Starter&#92;app&#92;data&#92;media + ${speech.audio}"> 
        </audio>
        `;
    });
    document.querySelector("audio").innerHTML = audioHTML;
}

init();