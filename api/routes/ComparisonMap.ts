import superagent from 'superagent';
import bodyParser from "body-parser";
import express from "express";
import { Logger } from "../logger/logger";
import { getFieldsFromObject } from '../common/global';

class ComparisonMap {

    public express: express.Application;
    public logger: Logger;

    // array to hold users
    // public users: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        // this.users = [];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // request to get all the users
        this.express.get("/kml/:mapahash", (req, res, next) => {
            try {
                const id = req.params.mapahash;
                superagent.get(`https://mapy.radiopolska.pl/files/get/fm-std/${id}.kml`).buffer()
                .type('kml')
                .end((err, response) => {
                   res.send(response);
                });
            } catch (err) {
                return res.status(404).json({
                    error: err.message,
                });
            }
    });
        // request to get all the users
        this.express.get("/kml-new/:id", (req, res, next) => {
            try {
                const id = req.params.id;

                superagent.get(`https://storage.googleapis.com/klm-map-storage/${id}.kml`).buffer()
                .type('kml')
                .end((err, response) => {
                   res.send(response);
                });
            } catch (err) {
                return res.status(404).json({
                    error: err.message,
                });
            }
    });
}
}

export default new ComparisonMap().express;