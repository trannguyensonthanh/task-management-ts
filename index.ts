import express, {Express, Request, Response} from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
import Task from "./api/v1/models/task.model";
import  routeApiVer1  from "./api/v1/routes/index.route";
import bodyParser from 'body-parser'
const app: Express = express();
const port: number | string = process.env.PORT || 3000
dotenv.config();
database.connect();
app.use(bodyParser.json())

routeApiVer1(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
