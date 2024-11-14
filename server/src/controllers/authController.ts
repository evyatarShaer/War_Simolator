import { Request, Response, NextFunction } from 'express';
import { createUserService } from '../service/userService';
import { generateToken } from '../utils/token';
import User from '../models/userModel';

export const register = async (req: Request, res: Response) => {
    const { username, password, organization } = req.body;
    try {
        const newUser = await createUserService( username, password, organization );
            res.status(201).json({ message: 'נרשמת בהצלחה' });     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'תקלה בהרשמה' });
    }
    return; // לשים לב להפוך לנקסט
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: "שם משתמש או סיסמה שגויים" })
        return
    };

    const token = generateToken(user.username, user.organization.name);
    res.cookie('token', token, {
        httpOnly:true,
        secure: false,
        maxAge: 3600000
    })
    res.status(201).json({ message: "התחברת בהצלחה", token })
    next();
}