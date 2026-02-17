import passport from 'passport';
import '../../auth/passport.config';
import { UserDocument } from '~/models/user';

export default defineEventHandler(async (event) => {
    // Skip auth for login and public resources
    const url = getRequestURL(event);
    if (url.pathname === '/api/login' || !url.pathname.startsWith('/api/')) {
        return;
    }

    const user = await new Promise<UserDocument | false>((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err: any, user: UserDocument | false) => {
            if (err) return reject(err);
            resolve(user);
        })(event.node.req, event.node.res, () => { });
    });

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    // Attach user to context for use in event handlers
    event.context.user = user;
});
