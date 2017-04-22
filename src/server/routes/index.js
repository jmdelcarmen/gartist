import auth from './auth';
import setlist from './setlist';
const _compose = (f, g) => (...args) => f(g(...args));
const compose = (...fns) => fns.reduce(_compose);
const router = compose(auth, setlist);

export default (app) => router(app);
