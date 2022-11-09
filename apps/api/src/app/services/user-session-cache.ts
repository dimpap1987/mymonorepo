import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {Cache} from 'cache-manager';
import {UserSession} from "../websocket/user-session";

@Injectable()
export class UserSessionCache {
  sessions = null;
  key = 'userKey';
  DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  expired_time = 60 * 60 * 1000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.sessions = [];
  }

  async addOrUpdate(userName: string, clientId: string) {
    const allUserSessions = (await this.cacheManager.get(this.key)) as UserSession[];
    const existingSession = allUserSessions?.find((x) => x.userName === userName);

    if (existingSession) {
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

  async getAllActive() {
    const results = (await this.cacheManager.get(this.key,)) as UserSession[];
    return results?.filter(x => x.IsConnected());
  }

  async remove(clientId: string) {
    const results = await this.cacheManager.get(this.key);
    if (results) {
      const updatedSessions = (results as UserSession[]).filter((x) => x.clientId !== clientId);
      await this.cacheManager.set(this.key, updatedSessions, this.expired_time);
    }
  }
}
