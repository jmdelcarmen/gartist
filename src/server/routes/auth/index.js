import { User } from '../../models';
import jwt from 'jwt-simple';
import passport from 'passport';
import passportService from '../../services/passport';
const secret = process.env.JWT_SECRET;
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });
function createToken(user) {
  const timeStamp =  new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timeStamp }, secret);
}
export function login(req, res, next) {
  const user = req.user;
  res.json({ token: createToken(user), user });
}
export function signUp(req, res, next) {
  const newUser = req.body;
  return !newUser.email || !newUser.password
  ? res.status(422).send({ err: 'You must provide an email and password' })
  : User.findOne({ email: newUser.email }, (err, user) => {
    if (err) { return next(err, false); }
    if (user) { return next(null, false); }
    new User(newUser).save((err, user) => {
      err ? next(err) : res.json({ token: createToken(user), user });
    });
  });
}
export default (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Welcome to the protected route' });
  });
  app.post('/login', requireSignIn, login);
  app.post('/signup', signUp);
}
