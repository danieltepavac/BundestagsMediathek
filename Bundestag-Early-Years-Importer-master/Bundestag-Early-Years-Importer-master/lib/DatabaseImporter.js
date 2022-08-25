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

            //muss ID zurückgeben
            //select Tabelle Agenda where (sql-Befehl), wenn vorhanden, dann vorhandene ID zurück, wenn nicht, dann importieren
        } catch (error) {
            console.error(error);
            return;
        }
    }

}

export default new DatabaseImporter();