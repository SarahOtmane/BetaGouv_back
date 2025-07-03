import app from './config/service';
import { connectDB } from './config/database';
import { createTablesInOrder } from './config/tableManager';
import demandeRoutes from './routes/demande.route';
import express from 'express';

const PORT = process.env.PORT ?? 3006;
app.use('/api/demandes', demandeRoutes);
app.use(express.json()); // <-- middleware requis

try {
    connectDB();
    createTablesInOrder();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Failed to launch server', error);
}