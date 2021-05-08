import  bodyParser from "body-parser";
import express from "express";
import { Logger } from "../logger/logger";
import User from "./user";
import Adapters from "./Adapters";
import Stations from "./Stations";
import ComparisonMap from "./ComparisonMap";

class Routes {

    public express: express.Application;
    public logger: Logger;

    // array to hold users
    public users: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // user route
        this.express.use("/", User);
        this.express.use('/adapters', Adapters)
        this.express.use('/stations', Stations)
        this.express.use('/comparison-map', ComparisonMap)
    }
}

export default new Routes().express;

