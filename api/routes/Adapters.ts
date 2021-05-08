import superagent from 'superagent';
import bodyParser from "body-parser";
import express from "express";
import { Logger } from "../logger/logger";
import { getFieldsFromObject } from '../common/global';

class Adapter {

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
        this.express.get("/all/:id", (req, res, next) => {
            const id = req.params.id;
            superagent.get(`https://mapy.radiopolska.pl/api/transmitterByProgId/PL/${id}`).end((err: any, response: any) => {
                if(response.body.data.fm) {
                    const programArray = getFieldsFromObject(response.body.data.fm, ['obiekt', 'dlugosc', 'szerokosc', 'id_obiekt', 'wys_npm', 'antena_npt', 'erp', 'polaryzacja', 'czestotliwosc', 'id_antena', 'id_nadajnik', 'id_program', '_mapahash']);
                    return res.send(programArray);
                }

        });
    });
}
}

export default new Adapter().express;