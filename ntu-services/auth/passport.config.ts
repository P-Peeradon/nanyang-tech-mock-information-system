import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import User from '~/models/user';

passport.use(new LocalStrategy({
    usernameField: 'username', // We'll use email as the "username"
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({
            $or: [
                { nanyangId: username.toUpperCase() }, // Assuming Student IDs are uppercase (e.g., U1234567A)
                { email: new RegExp('^' + username + '$', 'i') } // Case-insensitive email search
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

export default passport;