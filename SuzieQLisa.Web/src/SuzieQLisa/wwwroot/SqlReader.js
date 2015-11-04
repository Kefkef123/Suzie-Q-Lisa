import {Database} from 'database';

export class SqlReader {
    static inject() {
        return [ Database ];
    }

    constructor(database) {
        this.tables = database.tables;
        this.database = database.database;
        this.query = "";
        this.output = this.database['students'];
    }

    readSql() {
        this.query = $('section#editor textarea').val();

        try{
            this['analyze' + this.query.substring(0, 6).toLowerCase().capitalizeFirstLetter()](this.query);
        }
        catch(exception){
            console.log(exception.message)
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
        if (this.tables.indexOf(queryComponents[3].toLowerCase()) === -1) {
            throw {message: "The item is not available"};
        }
        else {
            var table = queryComponents[3].toLowerCase();
            this.output = this.database[table];
        }

        console.log("success");
    }
}