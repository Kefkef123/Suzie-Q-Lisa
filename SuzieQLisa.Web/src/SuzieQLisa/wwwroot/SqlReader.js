import {Database} from 'database';

export class SqlReader {
    static inject() {
        return [ Database ];
    }

    constructor(database) {
        this.database = database;
        this.query = "";
    }

    readSql() {
        this.query = $('section#editor textarea').val();

        switch(this.query.substring(0, 6).toLowerCase()) {
            case "select":
                try {
                    this.analyzeSelect(this.query);
                }
                catch (exception) {
                    console.log(exception.message)
                }
                break;
            case "insert":

                break;
            case "update":

                break;
            case "delete":

                break;
        }
    }

    analyzeSelect(query) {
        var queryComponents = query.split(' ');
        if (this.query.substring(0, 6).toLowerCase() !== "select")
        {
            throw {message: "Not a select query"}
        }
        if (queryComponents[2].toLowerCase() !== 'from')
        {
            throw {message: "Missing table selector"}
        }
        if (this.database.tables.indexOf(queryComponents[3].toLowerCase()) === -1) {
            throw {message: "The item is not available"};
        }
        else {
            var table = queryComponents[3].toLowerCase();
            var output = this.database[table + "Table"];
        }

        console.log("success");
        console.log(output);
    }
}