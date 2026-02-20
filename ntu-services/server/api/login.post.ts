import { defineEventHandler, readBody } from 'h3';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import type { UserDocument } from '../../models/user';

import '../../auth/passport.config';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;

    if (!(username && password)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username and password are required.'
        })
    }

    const user = await new Promise<UserDocument | false>((resolve, reject) => {
        const authMiddleware = passport.authenticate('local', { session: false }, (err: Error, user: UserDocument | false, _info: { message: string }) => {
            if (err) {
                return reject(err);
            }

            if (!user) {
                // Handle authentication failure (user not found, wrong password)
                // We resolve with `false` to indicate failure
                return resolve(false);
            }

            // Handle success
            return resolve(user);
        });

        authMiddleware({ body } as any, {} as any, () => { });
    });

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: '401 Unauthorized: Incorrect Nanyang Student ID/Email or password.',
        })
    }

    try {
        const config = useRuntimeConfig();
        const payload = {
            nanyangId: user.nanyangId,
            fullName: user.fullName,
            role: user.role
        }

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });

        return {
            message: 'Login successful',
            token: token,
            user: {
                nanyangId: user.nanyangId,
                fullName: user.fullName,
                role: user.role,
            }
        }

    } catch (err) {
        console.error('Error during login process:', err);
        throw createError({
            statusCode: 500,
            statusMessage: 'An error occurred during the login process.',
        })
    }
});