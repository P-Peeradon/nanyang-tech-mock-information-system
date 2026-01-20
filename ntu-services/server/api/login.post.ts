import { defineEventHandler, readBody } from 'h3';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import type { UserDocument } from '~/models/user';

import '../../auth/passport.config';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;

    if (!(username && password)) {
        event.node.res.statusCode = 400;
        return {
            message: 'Username and password are required.'
        };
    }

    const user = await new Promise<UserDocument | false>((resolve, reject) => {
        passport.authenticate('local', { session: false }, (err: Error, user: UserDocument | false, _info: { message: string }) => {
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
        })({ body }, () => {});
    });

    if (!user) {
        event.node.res.statusCode = 401; // Unauthorized
        return {
            message: 'Incorrect Student ID/Email or password.',
        };
    }

    try {
        const payload = {
            nanyangId: user.nanyangId,
            fullName: user.fullName,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24h' });
    
        event.node.res.statusCode = 200; // OK
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
        event.node.res.statusCode = 500; // Internal Server Error
        return {
            message: 'An error occurred during the login process.',
        };
    }
});