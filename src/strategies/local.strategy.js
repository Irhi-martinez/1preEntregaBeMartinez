import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const initializeLocalStrategy = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializeLocalStrategy;