import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import User from '../models/user';

export type JWTToken = {
    userId: string,
    fullName: string,
    role: ['student', 'teaching_staff', 'school_admin', 'registrar_admin']
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({
            $or: [
                { nanyangId: username.toUpperCase() },
                { email: { $regex: new RegExp(`^${username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }
            ]
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect Student ID/Email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect Student ID/Email or password.' });
        }

        return done(null, user)
    } catch (err) {
        return done(err);
    }
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.NUXT_JWT_SECRET || 'fallback-secret' // Prefer Nuxt runtime config var
}, async (jwtPayload, done) => {
    try {
        const user = await User.findOne({ nanyangId: jwtPayload.nanyangId });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;