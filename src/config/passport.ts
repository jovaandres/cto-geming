import {Passport} from "passport";
import {Strategy} from "passport-local"
import User from "../models/User";

const userPassport = new Passport();
userPassport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    function (email: String, password: String, done: any) {
      User.findOne({email})
        .then(function (user: any) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              name: 'UnauthorizedError',
              message: 'The email or password is incorrect.'
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

export = userPassport;
