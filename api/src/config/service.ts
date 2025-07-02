import express from 'express';
import { setupSwagger } from './swagger';

const app = express();

//middleware intégré à Express qui analyse les données encodées en URL 
    //comme les données de formulaire soumises via POST) et les expose dans req.body
app.use(express.urlencoded({ extended: true }));

//middleware intégré à Express qui analyse les données JSON des requêtes entrantes 
    //et les expose dans req.body
app.use(express.json());

setupSwagger(app);

export default app;
