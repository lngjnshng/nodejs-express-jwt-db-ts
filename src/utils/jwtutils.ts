import jwt from 'jsonwebtoken';
export class JwtUtils {

    public static getJwtSecret(): string {
        const secret = process.env.JWT_SECRET || 'xlongitdefaultjwtsecret';
        return secret;
    }

    public static sign(payload: string | object | Buffer): string{
        return jwt.sign(payload, JwtUtils.getJwtSecret(), {expiresIn: '24h'});
    }
}