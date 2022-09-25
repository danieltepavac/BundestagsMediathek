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
            
            
            await Database.runQuery("DROP TABLE Agenda");
            await Database.runQuery("CREATE TABLE Agenda( agendaId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,       position varchar(50),       title varchar(50) UNIQUE)");
            await Database.runQuery("DROP TABLE Speaker");
            await Database.runQuery("CREATE TABLE Speaker( speakerId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,        name varchar(50),       office varchar(50),        partyId INTEGER,     description varchar,        image varchar(50), FOREIGN KEY (partyId) REFERENCES Party(partyId))");
            await Database.runQuery("DROP TABLE Party");
            await Database.runQuery("CREATE TABLE Party( partyId integer NOT NULL PRIMARY KEY AUTOINCREMENT,     partyName varchar(50) UNIQUE)");
            await Database.runQuery("DROP TABLE Speech");
            await Database.runQuery("CREATE TABLE Speech( speechId varchar(50) PRIMARY KEY,      date varchar(50),       session varchar(50),        agendaId INTEGER,     speakerId INTEGER,        audio varchar(50), FOREIGN KEY(agendaId) REFERENCES Agenda(agendaId), FOREIGN KEY(speakerId) REFERENCES Speaker(speakerId))");
            await Database.runQuery("DROP TABLE Comments");
            await Database.runQuery("CREATE TABLE Comments( commentsId integer PRIMARY KEY AUTOINCREMENT,       speechId varchar(50),       comment varchar,        time timestamp)");
             
            // let result = await Database.runQuery("SELECT...")
            // if(result.rows.length > 0) {}
            
        } catch (error) {
            console.error(error);
            return;
        }
        return;
    }

     
    
    async importSpeech(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            
           await this.importAgenda(speech);
           await this.importSpeaker(speech);
            
            let speechTitle = speech.agenda.title;
            let speechSpeaker = speech.speaker.name;
            
            let id = speech.id; 
            let date = speech.date; 
            let session = speech.session; 
            let audio = speech.audio; 

            let objectAgendaId = await Database.runQuery("SELECT agendaId FROM Agenda WHERE title = '"+speechTitle+"'");
            let currentAgendaId = objectAgendaId.resultSet[0].agendaId;

            let objectSpeakerId = await Database.runQuery("SELECT speakerId FROM Speaker WHERE name = '"+speechSpeaker+"'");
            let currentSpeakerId = objectSpeakerId.resultSet[0].speakerId;

            
            
            await Database.runQuery("INSERT INTO Speech (speechId, date, session, agendaId, speakerId, audio) VALUES ('"+id+"', '"+date+"', '"+session+"','"+currentAgendaId+"','"+currentSpeakerId+"', '"+audio+"')");


        } catch (error) {
            console.error(error);
            return;
        }
    }

 
    async importAgenda(speech) {
        Logger.log(`Importing agenda "${speech.id}" ...`);
        try {

            let title = speech.agenda.title;
            let position = speech.agenda.position;

            await Database.runQuery("INSERT OR IGNORE INTO Agenda (position, title) VALUES ('"+position+"', '"+title+"')");
             
            
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importSpeaker(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            let speechParty = speech.speaker.party

            await this.importParty(speech);


            let name = speech.speaker.name;
            let office = speech.speaker.office;
            let description = speech.speaker.description;
            let image = speech.speaker.image; 

            
            let objectPartyId = await Database.runQuery("SELECT partyId From Party WHERE partyName = '"+speechParty+"'");
            let currentPartyId = (objectPartyId.resultSet[0].partyId);

            await Database.runQuery("INSERT OR IGNORE INTO Speaker (name, office, partyId, description, image) VALUES ('"+name+"', '"+office+"', '"+currentPartyId+"', '"+description+"', '"+image+"')");


        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importParty(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {

            
            let partyName = speech.speaker.party

            await Database.runQuery("INSERT OR IGNORE INTO Party (partyName) VALUES ('"+partyName+"')");

            
        } catch (error) {
            console.error(error);
            return;
        }
    }


}

export default new DatabaseImporter();