import * as moment from 'moment';

export class UserSession {
  private DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  userName: string;
  lastConnectedTime: string;
  clientId: string;
  loggedIn = false;

  constructor(userName: string, clientId: string) {
    this.userName = userName;
    this.clientId = clientId;
    this.lastConnectedTime = moment(new Date()).format(this.DATE_TIME_FORMAT);
  }

  IsConnected() {
    const duration = moment.duration(moment(new Date()).diff(moment(this.lastConnectedTime, this.DATE_TIME_FORMAT)));
    return duration.asSeconds() < 6;
  }
}
