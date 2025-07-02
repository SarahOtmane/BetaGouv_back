
const models = [
];

export const createTablesInOrder = async (): Promise<void> => {
    try {
        for (const model of models) {
            await model.sync();
        }
        console.log('Tables créées');
    } catch (error) {
        console.error('Erreur lors de la création des tables :', error);
    }
};
