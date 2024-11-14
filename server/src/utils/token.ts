import jwt from 'jsonwebtoken';

export const generateToken = (name: string, organization: string): string => {
    return jwt.sign({name, organization}, process.env.JWT_SECRET as string, {expiresIn: '4h'})
}