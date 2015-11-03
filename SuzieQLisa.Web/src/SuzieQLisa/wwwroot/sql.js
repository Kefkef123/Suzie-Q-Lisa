﻿import {SqlReader} from 'sqlreader';

export class Sql {
    static inject() {
        return [ SqlReader ];
    }

    constructor(sqlreader) {
        this.sqlreader = sqlreader;
    }
}