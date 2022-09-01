import "dotenv/config";
import Logger from "./lib/utils/Logger.js";
import DatabaseImporter from "./lib/DatabaseImporter.js";
import SpeechParser from "./lib/SpeechParser.js";

async function onSpeechParsed(speech) {
    await DatabaseImporter.importSpeech(speech);
}

(async function () {
    Logger.enable();
    await DatabaseImporter.prepare();
    SpeechParser.setSpeechParserListener(onSpeechParsed);
    SpeechParser.parseSpeechesFrom(process.env.DATA_PATH);
}());