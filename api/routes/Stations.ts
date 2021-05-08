import superagent from 'superagent';
import  bodyParser from "body-parser";
import  express from "express";
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
        this.express.get("/all/", (req, res, next) => {
            // const id = req.params.id;
            superagent.get('https://mapy.radiopolska.pl/api/programAll/PL').end((err: any, response: any) => {
                if(response) {
                    const programArray = getFieldsFromObject(response.body.data, ['nazwa', 'id_program']);
                    return res.send(programArray);

                }
                return res.status(404).json({
                    error: "Connection error",
                });
        });
    });
}
}

export default new Adapter().express;