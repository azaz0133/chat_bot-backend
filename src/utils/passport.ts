import { PassportStatic } from "passport";
import GoogleStrategy from "passport-google-oauth";

export const passportMiddle = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy.OAuth2Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8081"
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: GoogleStrategy.Profile,
        done: GoogleStrategy.VerifyFunction
      ) => {
        return done(null, {
          profile,
          token: accessToken
        });
      }
    )
  );
};
