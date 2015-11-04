import {Database} from 'database';

export class SqlReader {
    static inject() {
        return [ Database ];
    }

    constructor(database) {
        this.tables = database.tables;
        this.database = database.database;
        this.query = "";
    }

    readSql() {
        this.query = $('section#editor textarea').val();

        try {
            // Executes this.select/insert/update/delete
            this['analyze' + this.query.substring(0, 6).toLowerCase().capitalizeFirstLetter()](this.query);
            return this['analyze' + this.query.substring(0, 6).toLowerCase().capitalizeFirstLetter()](this.query);
        }
        catch (exception) {
            console.log(exception.message)
        }
    }

    analyzeSelect(query) {
        var queryComponents = query.split(' ');
        var queryComponentsLower = query.toLowerCase().split(' ');

        if (queryComponentsLower[0] !== "select")
        {
            throw {message: "Not a select query"};
        }

        var object = {};

        // From
        var fromClauseIndex = queryComponentsLower.indexOf("from");
        if (fromClauseIndex === -1)
        {
            throw {message: "Select from a table"};
        }

        object.table = queryComponents[fromClauseIndex + 1];

        // SELECT *
        if (queryComponents[1] !== '*') {
            object.columns = [];
            for(var i = 1; i < fromClauseIndex; i++) {
                object.columns.push(queryComponents[i]);
            }

            object.columns.forEach(function(value, index, arr) {
                object.columns[index] = value.slice(-1) === ',' ? value.slice(0, -1) : value;
            });
        }
        }

        console.log(object);
        return object;
    }
}