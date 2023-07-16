import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import { AdminRoute,VendorRoute } from './routes';
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import { PORT } from './config';
import { Main } from './models';
import * as ampq from "amqplib/callback_api";
import { MainInput } from './dto';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const StartServer = async () => {

    const app = express();

    await dbConnection()
    app.use(cors({
        origin:['http://localhost:3000']
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    })
}

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
        channel.assertQueue('product_created', {durable: false});

        channel.consume('product_created', async (msg : ampq.Message | null) => {
            const eventProduct = JSON.parse(msg!.content.toString())
            const product = new Main()
            product.admin_id=eventProduct._id;
            product.title = eventProduct.title
            product.image = eventProduct.image
            product.likes = eventProduct.likes
            await Main.create(product)
            console.log('product created',product)
        }, {noAck: true})

        StartServer();
        process.on("beforeExit", () => {
          console.log("closing");
          connection.close();
        });
      });
    }
  );
