# Bundestag, the early years: Data-Importer

Mit diesem Skript können Sie den Import der im *JSON*-Format vorliegenden Reden in die benötigte SQLite-Datenbank automatisieren. Wir haben Ihnen dazu einen Teil des Skripts bereits vorgegeben. Sie müssen noch eine geeignete Datenbankstruktur erstellen und die SQL-Querys zum Eintragen der einzelnen Einträge schreiben. Aktuell erstellt das Skript eine leere SQLite-Datenbank, iteriert über einen angegebenen Ordner und wandelt die dortigen Dateien in JavaScript-Objekte um, die einzelne Reden zu repräsentieren. Für jeden Film wird in dem zentralen Modul der Anwendung (`index.js`) einmal die *Callback*-Methode [`onSpeechParsed`]() aufgerufen. Im Parameter finden Sie den jeweiligen Redebeitrag, der bereits an das `DatabaseImporter`-Modul weitergeben wird. Dort müssen die Informationen aus dem JavaScript-Objekt dann in die SQLite-Datenbank übertragen werden.

## Grundlagen

Der Skript funktioniert mit den JSON-formatierten *Speech*-Dateien, die wir Ihnen in einem separaten Datensatz bereitgestellt haben. Diese Daten haben wir aus der [Mediathek](https://www.bundestag.de/mediathek) des Deutschen Bundestags extrahiert. Über den _Importer_ werden die Daten für die weitere Verwendung in den Projekten aufbereitet.

### Beispiel für die JSON-formatierten Daten zu den einzelnen Redebeiträgen

```
{
   "id":"1951-11-011_180-9-23",
   "date":"1951-12-11T23:00:00.000Z",
   "session":"180",
   "agenda":{
      "position":"9",
      "title":"Mutterschutzgesetz"
   },
   "speaker":{
      "name":"Schäfer, Dr. Hermann",
      "office":"",
      "party":"FDP",
      "description":"Hermann Schäfer, Bundesminister für besondere Aufgaben (1953-1956) (Aufnahme: 1953)",
      "image":"1951-11-011_180-9-23.png"
   },
   "audio":"1951-11-011_180-9-23.mp3"
}
```

Der Skript exportiert alle relevanten Informationen aus diesen Dateien. Die exportierten Daten werden innerhalb des Skripts als [Speech-Prototyp]() abgebildet und kommuniziert. 

## Vorbereitung

- Laden Sie den Quellcode über [diesen Link]() herunter. 
- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm install` aus, um alle notwendigen Abhängigkeiten zu installieren.
- Erstellen Sie einen Ordner `data` im Projektverzeichnis und kopieren Sie die bereitgestellten JSON-Dateien dort hinein

## Starten des Import-Skripts

- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm start` aus
- Der Skript erstellt eine leere SQLite-Datenbank (`db.sqlite`) und versucht alle JSON-Dateien aus dem `data`-Verzeichnis zu importieren

### TODOs

Ergänzen Sie im Modul `DatabaseImporter.js` die notwendige Queryies zum Erstellen eines geeigneten Datenbankschemas und zum Einfügen neuer Einträge. Die relevanten Stellen sind mit einem `// TODO`-Kommentar gekennzeichnet.