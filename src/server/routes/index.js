import auth from './auth';
const _compose = (f, g) => (...args) => f(g(...args));
const compose = (...fns) => fns.reduce(_compose);
const router = compose(auth);

export default (app) => router(app);
