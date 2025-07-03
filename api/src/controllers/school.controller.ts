import { Response } from 'express';
import School from "../models/school.model";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";


export const addWebsiteToSchool = async (req:AuthenticatedRequest, res:Response) => {
    const { website } = req.body;
    const user = req.user; 

    if (!user || user.role !== 'school') {
        return res.status(403).json({ error: 'Forbidden: Only schools can add websites' });
    }

    if (!website) {
        return res.status(400).json({ error: 'Website is required' });
    }

    try {
        const user = await User.findByPk(req.user.id);
        // Assuming School is a model imported from your models
        await School.update(
            { website: website },
            { where: { id: user.getDataValue('id_role') } }
        );
        return res.status(201).json({ message: 'Website added successfully' });
    } catch (error) {
        console.error('Error adding website to school:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const getSchool = async (req:AuthenticatedRequest, res:Response) => {
    const user = req.user; 

    if (!user || user.role !== 'school') {
        return res.status(403).json({ error: 'Forbidden: Only schools can access this resource' });
    }

    try {
        const user = await User.findByPk(req.user.id);

        const school = await School.findOne({
            where: { id: user.getDataValue('id_role') },
        });

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        return res.status(200).json(school);
    } catch (error) {
        console.error('Error fetching school:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}