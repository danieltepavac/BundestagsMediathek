class QueryRequest {

    #query;
    #remoteURL;
    #hasRun;

    constructor(remoteURL, query) {
        this.#remoteURL = remoteURL;
        this.#query = query;
        this.#hasRun = false;
    }

    async run() {
        if (this.#hasRun) {
            throw new Error("QueryRequest can only be runned once");
        }
        if (this.#remoteURL === undefined) {
            throw new Error("Remote database not connected (remote url not set)");
        }
        try {
            let response = await fetch(this.#remoteURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: this.#query,
                    createdAt: Date.now(),
                }),
            });
            this.#hasRun = true;
            return await response.json();
        } catch (error) {
            throw new Error("Error while connecting to database server");
        }
    }

}

/**
 * Repräsentiert die Schnittstelle zur einer über HTTP-Anfragen zugänglichen SQLite-Datenbank
 * 
 * Eine RemoteSQLiteDatabase bietet eine einfache Möglichkeit, SQL-Queries in der Datenbank
 * auszuführen, die von dem initialen Node.JS-Server verwaltet wird, der auch diese Client-
 * Anwendung bereitstellt.  
 * 
 * Bevor Anfragen über die "runQuery" Methode ausgeführt werden können, muss initial einmal
 * die "connect"-Methode ausgeführt werden, um die notwendigen Parameter für den Datenbankzugriff
 * zu initialisieren.
 * 
 * Verwendungsbeispiel
 * 
 * let db = new RemoteSQLiteDatabase();
 * db.connect(); // Nutzt die Default-Werte für das vorgegebene Starterpaket
 * 
 * let resultSet = await db.runQuery("SELECT * FROM team");
 */
class RemoteSQLiteDatabase {

    #url;

    connect(url = "/database") {
        this.#url = url;
    }

    async runQuery(query) {
        let result, queryRequest = new QueryRequest(this.#url, query);
        try {
            result = await queryRequest.run();
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
        }
        return result;
    }

}

export default RemoteSQLiteDatabase;