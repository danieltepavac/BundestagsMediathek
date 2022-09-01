#  Bundestag-Early-Years, Starterprojekt für den WebTech-Kurs (Sommer 2022)

Das Repository enthält die grundlegende Codestruktur für die Abschlussprojekte im WebTech-Kurse für das Sommersemester 2022. Auf Basis der vorgegebenen Inhalte implementieren Sie Ihren Lösungsvorschlag für die in der Aufgabenstellung beschriebenen Webanwendungen. Im Vorfeld erstellen und befüllen Sie mit Hilfe des ebenfalls bereitgestellten Importer-Skripts die dafür notwendige Datenbank.

## Aufbau

- `app`: Enthält den Code Ihrer Webanwendung. Hier implementieren Sie Ihren Lösungsvorschlag und ergänzen dazu HTML, CSS und JavaScript-Inhalte.
- `index.js`: Über diesen Script wird die Webanwendung gestartet. Dabei wird ein Webserver bereitgestellt, der die Webanwendung aus dem `app`-Verzeichnis über eine URL lokal bereitstellt. Der Webserver bietet zusätzlich die Möglichkeit, über die Client-Anwendung auf jeweils die SQLite-Datenbank zuzugreifen, die sich im Projekt in der Datei `database.sqlite` befindet.

## Vorbereitung

- Erstellen Sie über den Importer-Skript die Datenbank mit den Informationen zu den Mediathekinhalten. Kopieren Sie die so entstandene Datenbank in das Projektverzeichnis und überschreiben Sie dabei die Datei `database.sqlite`.
- Kopieren Sie den `media`-Ordner aus dem bereitgestellten Archi in das Verzeichnis `app/data`. Innerhalb des Clients können Sie dann über `data/media/$ID.mp3` bzw. `data/media/$ID.png` auf die Bild- und Tondateien zu greifen. `$ID` steht dabei immer für eine spezifische ID eines einzelnen Redebeitrags, den Sie in den jeweiligen JSON-Dateien finden und zu diesem Zeitpunkt hoffentlich in der Datenbank gespeichert haben.
- Installieren Sie über die Eingabe des Befehls `npm install` in einer Kommandozeile innerhalb des Projektverzeichnis alle notwendigen Abhängigkeiten, um die Anwendung ausführen zu können.

## Start der Anwendung

**Sie starten die Anwendung, in dem Sie in einer Kommandozeile innerhalb des Projektverzeichnis den Befehl `npm start` eingeben.**

Beim Starten der Anwendung wird ein _express_-Server gestartet, der den Inhalt des `app`-Ordners statisch über die Route `/` bereitstellt. Dieser Client ist über die URL `http://localhost:8080` (Standardwerte aus `.env`) erreichbar. Zusätzlich wird eine Verbindung zur SQLite-Datenbank aus der Datei `database.sqlite` aufgebaut. Die Webseite wird automatisch im Browser geöffnet.

Über den Prototypen `RemoteSQLiteDatabase` bzw. dessen Methode `runQuery` können SQL-Queries an den Server übertragen werden. Das _Result Set_ bzw. die Antwort wird über ein _Promise_ zurückgegeben.

## Live-Server

Wenn Sie die Einstellung `DEBUG` in der Datei `.env` auf `true` setzen, wird die vom Webserver bereitgestellte Webseite immer dann automatisch neu geladen, wenn Sie Änderungen am Code im `app`-Verzeichnis vorgenommen haben.