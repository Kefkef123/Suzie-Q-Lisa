export class Sql {
    constructor() {
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

        console.log("success");
    }
}