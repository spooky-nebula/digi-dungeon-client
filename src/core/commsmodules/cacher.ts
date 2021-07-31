import Communications from '../communications';
import {
  makeJSONRequest,
  hexColorLuminance,
  getRandomPlayerColor
} from '../util';

class Cacher {
  /**  The key is supposed to be the userId */
  tempUserData: Map<string, TempUserData>;
  makingARequest: boolean;

  constructor() {
    this.tempUserData = new Map<string, TempUserData>();
    this.makingARequest = false;

    this.getUser = this.getUser.bind(this);
  }

  getUser(userId: string): Promise<TempUserData> {
    return new Promise((resolve) => {
      if (this.makingARequest) {
        let timeout = setTimeout(() => {
          this.getUser(userId).then((userData) => {
            resolve(userData);
          });
        }, 200);
      } else {
        this.makingARequest = true;
        this.getUserNoBlock(userId).then((userData) => {
          resolve(userData);
          this.makingARequest = false;
        });
      }
    });
  }

  private getUserNoBlock(userId: string): Promise<TempUserData> {
    return new Promise((resolve) => {
      const userIsCached = this.tempUserData.has(userId);
      if (userIsCached) {
        resolve(this.tempUserData.get(userId));
      } else {
        makeJSONRequest(
          Communications.communicationData.uri.hostname,
          Communications.communicationData.uri.port,
          '/api/user',
          'GET',
          { userId: userId }
        )
          .then((response) => {
            let temp: TempUserData = response as TempUserData;
            temp.colour = hexColorLuminance(getRandomPlayerColor(), 0.01);
            this.tempUserData.set(userId, temp);
            resolve(temp);
          })
          .catch(() => {
            let temp: TempUserData = {
              userId: userId,
              username: 'Error Getting Username'
            };
            resolve(temp);
          });
      }
    });
  }
}

interface TempUserData {
  userId: string;
  username: string;
  colour?: string;
}

export default Cacher;

export { TempUserData };
