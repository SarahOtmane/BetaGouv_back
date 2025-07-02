import app from './config/service';
import { connectDB } from './config/database';
import { createTablesInOrder } from './config/tableManager';

const PORT = process.env.PORT ?? 3006;

try {
    connectDB();
    createTablesInOrder();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Failed to launch server', error);
}