// Über diese Variable ist die Datenbank innerhalb des Moduls zugänglich
import Database from "./utils/Database.js";
import Logger from "./utils/Logger.js";

class DatabaseImporter {

    async prepare() {
        Logger.log("Preparing database ...");
        try {
            await Database.open();
            // TODO: Übergeben Sie hier die SQL-Query zum Erstellen des Datenbankschemas
            // await Database.runQuery("CREATE TABLE data");

            await Database.runQuery("DROP TABLE Speech");
            await Database.runQuery("CREATE TABLE Speech( speechId varchar(50) PRIMARY KEY,      date varchar(50),       session varchar(50),        agenda undefined,      position varchar(50),     speaker undefined,        audio varchar(50))");
            await Database.runQuery("DROP TABLE Agenda");
            await Database.runQuery("CREATE TABLE Agenda( agendaId integer PRIMARY KEY AUTOINCREMENT,       title varchar(50) UNIQUE)");
            await Database.runQuery("DROP TABLE Speaker");
            await Database.runQuery("CREATE TABLE Speaker( speakerId integer PRIMARY KEY AUTOINCREMENT,        name varchar(50) UNIQUE,       office varchar(50),        party undefined,     description varchar,        image varchar(50))");
            await Database.runQuery("DROP TABLE Party");
            await Database.runQuery("CREATE TABLE Party( partyId integer PRIMARY KEY AUTOINCREMENT,     partyName varchar(50) UNIQUE)");
            await Database.runQuery("DROP TABLE Comments");
            await Database.runQuery("CREATE TABLE Comments( commentsId integer PRIMARY KEY AUTOINCREMENT,       speechId varchar(50),       comment varchar,        time timestamp)");
            await Database.runQuery("DROP TABLE sqlite_sequence");
            
        } catch (error) {
            console.error(error);
            return;
        }
        return;
    }

    async importSpeech(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            const agendaId = await this.importAgenda(speech);
            const speakerId = await this.importSpeaker(speech);
            
            
            
            let id = speech.id; 
            let date = speech.date; 
            let session = speech.session; 
            let agenda = agendaId;
            let position = speech.agenda.position;
            let speaker = speech.speaker; 
            let audio = speech.audio; 

            await Database.runQuery("INSERT INTO Speech (speechID, date, session, agenda, position, speaker, audio) VALUES ('"+id+"', '"+date+"', '"+session+"', '"+agenda+"', '"+position+"', '"+speaker+"', '"+audio+"')");
            
        

        } catch (error) {
            console.error(error);
            return;
        }
    }


    async importAgenda(speech) {
        Logger.log(`Importing agenda "${speech.id}" ...`);
        try {

            let title = speech.agenda.title;

            await Database.runQuery("INSERT INTO Agenda (title) VALUES ('"+title+"')");; 
             
            
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importSpeaker(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            const partyId = await this.importParty(speech);

            let name = speech.speaker.name;
            let office = speech.speaker.office;
            let party = partyId; 
            let description = speech.speaker.description;
            let image = speech.speaker.image; 

            await Database.runQuery("INSERT INTO Speaker (name, office, party, description, image) VALUES ('"+name+"', '"+office+"', '"+party+"', '"+description+"', '"+image+"')")
            

        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importParty(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            let partyName = speech.speaker.party

            await Database.runQuery("INSERT INTO Party (partyName) VALUES ('"+partyName+"')");
            
        } catch (error) {
            console.error(error);
            return;
        }
    }


}

export default new DatabaseImporter();