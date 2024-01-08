
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import session from 'express-session';
import mongoose from 'mongoose';
import productRoutes from './route/productRoute.js';
import bannerRoutes from './route/bannerRoute.js';
import valuesRoutes from './route/valuesRoute.js';
import websettingRoutes from './route/websiteSettingRoute.js';
import userRoutes from './route/userRoute.js';
import path from 'path'


const app = express();
app.use(express.json());
const PORT = 5000;

app.use(session({
  secret: 'user',
  resave: false,
  saveUninitialized: true
}));
// app.use(bodyParser.json());


app.use('/product',productRoutes)
app.use('/banner',bannerRoutes)
app.use('/values',valuesRoutes)
app.use('/web-setting',websettingRoutes)
app.use('/user',userRoutes)
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
  res.render('index')
})

mongoose.connect("mongodb://127.0.0.1:27017/abay-mart")
  .then(() => {
    app.listen(PORT, () => {
      console.log("App is listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
