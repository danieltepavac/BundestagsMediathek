import fs from "fs";
import path from "path";
import Logger from "./utils/Logger.js";

let skippedFiles;

function createSpeechFromFile(filePath, callback) {
    let fileContent = fs.readFileSync(filePath, { encoding: "utf8" }),
        movie = Speech.fromJSON(fileContent);
    callback(movie);
}

class Speech {

    constructor(id, date, session, agenda, speaker, audio) {
        this.id = id;
        this.date = date;
        this.session = session;
        this.agenda = agenda;
        this.speaker = speaker;
        this.audio = audio;
        Object.freeze(this);
    }

    static fromJSON(json) {
        let jsonObject = JSON.parse(json);
        return new Speech(jsonObject.id, jsonObject.date, jsonObject.session, jsonObject.agenda, jsonObject.speaker, jsonObject.audio);
    }

}

class SpeechParser {

    setSpeechParserListener(callback) {
        this.speechParserListener = callback;
    }

    parseSpeechesFrom(dataPath) {
        let files = fs.readdirSync(dataPath);
        skippedFiles = 0;
        for (let i = 0; i < files.length; i++) {
            let filePath = path.join(dataPath, files[i]);
            Logger.log(`Parsing speech ... ${Math.floor((i / files.length) * 100)}% (Skipped ${skippedFiles}/${i + 1} files)`);
            try {
                createSpeechFromFile(filePath, this.speechParserListener);
            } catch (error) {
                Logger.log(`Error while importing movie from  ${filePath}`);
                skippedFiles++;
            }
        }
    }

}

export default new SpeechParser();