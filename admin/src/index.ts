import * as express from "express";
import * as cors from "cors";
import dbConnection from "./services/Database";
import { ProductRoute } from "./routes";
import * as bodyParser from "body-parser";
import * as ampq from "amqplib/callback_api";
import { error } from "console";

const StartServer = async (channel) => {
  // ampq.connect(url: 'amqps://ebosnsab:1tnwpHFos8NnoIru_8bMWVGkZA_Vfjkp@puffin.rmq2.cloudamqp.com/ebosnsab',callback(error0))

  const app = express();
  await dbConnection();
  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/product",function (req, res, next) {
    req.channel = channel;
    next();
}, ProductRoute);
  app.listen(8000, () => console.log("App listening at 8000"));
};

ampq.connect(
  "amqps://ebosnsab:1tnwpHFos8NnoIru_8bMWVGkZA_Vfjkp@puffin.rmq2.cloudamqp.com/ebosnsab",
  (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      StartServer(channel);
      process.on("beforeExit", () => {
        console.log("closing");
        connection.close();
      });
    });
  }
);
