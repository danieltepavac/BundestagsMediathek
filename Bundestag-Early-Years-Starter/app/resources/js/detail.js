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

function loadSpeechDetails(speechId){

    console.log("ust copy and paste from overview and use ....");
    console.log(speechId);
    // sql select details zur speech
}

init();