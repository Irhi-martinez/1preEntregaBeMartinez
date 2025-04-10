import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['authToken'];
  }
  return token;
};

const initializeJwtStrategy = () => {
  passport.use(
    'current',
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserModel.findById(jwt_payload.userId);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializeJwtStrategy;