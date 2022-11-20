import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {Cache} from 'cache-manager';
import {UserSession} from "../websocket/user-session";

@Injectable()
export class UserSessionCache {
  private sessions = null;
  private key = 'users';
  private DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  private expired_time = 60 * 60 * 1000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.sessions = [];
  }

  async addOrUpdate(userName: string, clientId: string) {
    const allUserSessions: UserSession[] = await this.cacheManager.get(this.key);
    const existingSession = allUserSessions?.find((x) => x.userName === userName);

    if (existingSession) {
      existingSession.loggedIn = true;
      existingSession.lastConnectedTime = moment(new Date()).format(
        this.DATE_TIME_FORMAT,
      );
      await this.cacheManager.set(
        this.key,
        allUserSessions,
        this.expired_time,
      );
    } else {
      await this.addNewUserSession(userName, clientId, allUserSessions);
    }

  }

  private async addNewUserSession(userName: string, clientId: string, allUserSessions: UserSession[]) {
    const allSessions = [...allUserSessions ?? [], new UserSession(userName, clientId)];
    await this.cacheManager.set(
      this.key,
      allSessions,
      this.expired_time,
    );
  }

  async get(userName: string) {
    const results = await this.cacheManager.get(this.key);
    return results ? (results as UserSession[]).find((x) => x.userName === userName) : null;
  }

  async getAllUsers() {
    const results: UserSession[] = await this.cacheManager.get(this.key);
    results?.forEach((userSession) => userSession.loggedIn = userSession.IsConnected());
    return results;
  }

  async remove(clientId: string) {
    const results = await this.cacheManager.get(this.key);
    if (results) {
      const updatedSessions = (results as UserSession[]).filter((x) => x.clientId !== clientId);
      await this.cacheManager.set(
        this.key,
        updatedSessions,
        this.expired_time
      );
    }
  }

  async handleDisconnection(clientId: string) {
    const userSessions: UserSession[] = await this.cacheManager.get(this.key);

    const existingSession = userSessions?.find((x) => x.clientId === clientId);
    existingSession.loggedIn = false

    await this.cacheManager.set(
      this.key,
      userSessions,
      this.expired_time
    );
  }
}
