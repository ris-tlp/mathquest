import { Request, Response, Router } from 'express';
import { User } from '../models/userModel';

export const userRouter = Router();

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const query_result = await User.findOne({
            email: details['email'],
            password: details['password'],
        }).exec();

        if (!query_result) {
            res.status(404).json({
                error: 'Incorrect login details.',
            });
        } else {
            res.status(200).json({
                userId: query_result['_id'],
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
