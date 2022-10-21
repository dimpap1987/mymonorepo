import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-facebook";
import {AuthService, Provider} from "../services/auth.service";
import {User} from "../interfaces/user";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private readonly authService: AuthService) {

    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {

    const {name, emails} = profile;
    const user: User = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profileId: profile.id
    };
    const jwt: string = await this.authService.validateOAuthLogin(user, Provider.FACEBOOK);

    done(null, {jwt});
  }
}
