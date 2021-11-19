import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {isBodyMissingProps} from "../utils/isBodyMissingProps";
import userPassport from "../config/passport";

export = {
  create: [
    function (req: Request, res: Response, next: NextFunction) {
      const requiredProps = [
        ['email', 'Your email is required', true],
        ['firstName', 'Your first name is required.', true],
        ['password', 'A password is required', true],
        ['lastName', 'Your last name is required', true]
      ];

      const {hasMissingProps, propErrors} = isBodyMissingProps(
        requiredProps,
        req.body
      );

      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }

      const {
        email,
        firstName,
        lastName,
        password,
      } = req.body;

      return User.count({email})
        .exec()
        .then(function (count) {
          if (count > 0) {
            throw {
              name: "ValidationError",
              errors: {
                email: {message: "The email is already taken"}
              }
            };
          }
          return count;
        })
        .then(() => {
          const user: any = new User({
            email,
            firstName,
            lastName,
          });

          user.setPassword(password);
          return user
            .save()
            .then(function (user: any) {
              return res.json({success: true, user: user.authSerialize()});
            })
        })
        .catch(next);
    },
  ],

  login: [
    (req: Request, res: Response, next: NextFunction) => {
      const requiredProps = [
        ['email', 'Your email and password are required to sign in.', true],
        ['password', 'Your email and password are required to sign.', true],
      ];
      const {hasMissingProps, propErrors} = isBodyMissingProps(requiredProps, req.body);
      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }
      return next()
    },
    (req: Request, res: Response, next: NextFunction) => userPassport.authenticate("local", function (err, user, data) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({...data, success: false});
      }

      return res.json({success: true, user: user.authSerialize()});
    })(req, res, next),
  ]
};
