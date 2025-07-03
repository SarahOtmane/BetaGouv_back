import express from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger';

import authRouter from '../routes/auth.route';
import adressRouter from '../routes/adress.route';
import schoolRouter from '../routes/school.route';
import companyRouter from '../routes/company.route';
import intershipRouter from '../routes/internship.route';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//middleware intégré à Express qui analyse les données encodées en URL 
    //comme les données de formulaire soumises via POST) et les expose dans req.body
app.use(express.urlencoded({ extended: true }));

//middleware intégré à Express qui analyse les données JSON des requêtes entrantes 
    //et les expose dans req.body
app.use(express.json());

app.use('/auth', authRouter );
app.use('/adress', adressRouter);
app.use('/school', schoolRouter);
app.use('/company', companyRouter);
app.use('/internship', intershipRouter);


setupSwagger(app);

export default app;
