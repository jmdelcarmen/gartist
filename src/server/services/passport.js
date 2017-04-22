import { User } from '../models';
import passport from 'passport';
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
const secret = process.env.JWT_SECRET;

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err, false);
    return !user || !bcrypt.compareSync(password, user.password) ? done(null, false) : done(null, user);
  });
});
const jwtOptions = {
  //get token from request headers 'Authorization': 'JWT <token>'
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: secret
};
const jwtLogin = new JwtStrategy(jwtOptions, ({ sub: id }, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err, false);
    return user ? done(null, user) : done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
