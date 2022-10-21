import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';

import {Injectable} from '@nestjs/common';
import {AuthService, Provider} from "../services/auth.service";
import {User} from "../interfaces/user";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {name, emails, photos, id} = profile;

    const user: User = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      profileId: id
    };

    const jwt: string = await this.authService.validateOAuthLogin(user, Provider.GOOGLE);

    done(null, {
      jwt
    });
  }
}
