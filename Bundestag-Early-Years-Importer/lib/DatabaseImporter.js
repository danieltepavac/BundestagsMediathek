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

            await Database.runQuery("CREATE TABLE Speech( speechId varchar(50) PRIMARY KEY,      date varchar(50),       session varchar(50),        agenda integer,     speaker integer,        audio varchar(50))");
            await Database.runQuery("CREATE TABLE Agenda( agendaId integer PRIMARY KEY AUTOINCREMENT,        Position varchar(50),       Title varchar(50)");
            await Database.runQuery("CREATE TABLE Speaker( speakerId integer PRIMARY KEY AUTOINCREMENT,        name varchar(50),       office varchar(50),        party integer,     description varchar,        image varchar(50)");
            await Database.runQuery("CREATE TABLE Party( partyId integer PRIMARY KEY AUTOINCREMENT,     partyName varchar(50)");
            await Database.runQuery("CREATE TABLE Comments( commentsId integer PRIMARY KEY AUTOINCREMENT");
            
        } catch (error) {
            console.error(error);
            return;
        }
        return;
    }

    async importSpeech(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {
            const agendaID = await importAgenda(speech.agenda);
            const speakerID = await importSpeaker(speech.speaker);

            await Database.runQuery("INSERT INTO Speech (speechID, date, session, agenda, speaker, audio) VALUES ()")
            
            
            // TODO: Speichern Sie den übergebenen Redebeitrag in der vorbereiteten Datenbank
            // await Database.runQuery("INSERT");
            // graphisches Tool SQLite arbeiten, da gibts Fehlermeldungen

        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importAgenda(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {
            // TODO: Speichern Sie den übergebenen Redebeitrag in der vorbereiteten Datenbank
            // await Database.runQuery("INSERT");
            // graphisches Tool SQLite arbeiten, da gibts Fehlermeldungen
            // speech.agenda und speech.speaker separiert importieren

            await Database.runQuery("INSERT INTO Agenda (agendaId, position, title) VALUES ()")

            //muss ID zurückgeben
            //select Tabelle Agenda where (sql-Befehl), wenn vorhanden, dann vorhandene ID zurück, wenn nicht, dann importieren
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importSpeaker(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {
            const speakerID = await importParty(speech.speaker.party);

            // TODO: Speichern Sie den übergebenen Redebeitrag in der vorbereiteten Datenbank
            // await Database.runQuery("INSERT");
            // graphisches Tool SQLite arbeiten, da gibts Fehlermeldungen
            // speech.agenda und speech.speaker separiert importieren

            await Database.runQuery("INSERT INTO Speaker (speakerId, name, office, party, description, image) VALUES ()")

            //muss ID zurückgeben
            //select Tabelle Agenda where (sql-Befehl), wenn vorhanden, dann vorhandene ID zurück, wenn nicht, dann importieren
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async importParty(speech) {
        Logger.log(`Importing speech "${speech.id}" ...`);
        try {
            // TODO: Speichern Sie den übergebenen Redebeitrag in der vorbereiteten Datenbank
            // await Database.runQuery("INSERT");
            // graphisches Tool SQLite arbeiten, da gibts Fehlermeldungen
            // speech.agenda und speech.speaker separiert importieren

            await Database.runQuery("INSERT INTO Party (partyId, name) VALUES ()")

            //muss ID zurückgeben
            //select Tabelle Agenda where (sql-Befehl), wenn vorhanden, dann vorhandene ID zurück, wenn nicht, dann importieren
        } catch (error) {
            console.error(error);
            return;
        }
    }


}

export default new DatabaseImporter();