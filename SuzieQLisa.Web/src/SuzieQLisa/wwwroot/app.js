﻿export class App {
    constructor() {

    }

    configureRouter(config, router) {
        config.map([
            { route: "sql", name: "sql", moduleId: "sql", nav: true},
            { route: "testData", name: "testData", moduleId: "testData", nav: true}
        ])
    }
}