import * as ddapi from 'digi-dungeon-api';
import { AppToaster } from './overlay';
import { request, IncomingMessage } from 'http';
import {
  AuthResponse,
  UserLoginData,
  UserLogoutData,
  UserRegisterData
} from 'digi-dungeon-api/dist/auth/userdata';
import Communications from './communications';

import * as qs from 'query-string';

function makeAuthRequest(
  userAuthData: UserLoginData | UserRegisterData | UserLogoutData,
  path: '/login' | '/register' | '/logout'
): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    makeJSONRequest(
      Communications.communicationData.uri.hostname,
      Communications.communicationData.uri.port,
      path,
      'POST',
      userAuthData
    )
      .then((responseJSON) => {
        let auth = new AuthResponse(false, '');
        resolve(Object.assign(auth, responseJSON));
      })
      .catch(() => {
        reject();
      });
  });
}

function makeJSONRequest(
  hostname: string,
  port: string,
  path: string,
  method: 'POST' | 'GET',
  data: any
): Promise<Object> {
  return new Promise((resolve, reject) => {
    makeRequest(hostname, port, path, method, data)
      .then((response) => {
        resolve(JSON.parse(response));
      })
      .catch(() => {
        reject();
      });
  });
}

function makeRequest(
  hostname: string,
  port: string,
  path: string,
  method: 'POST' | 'GET',
  data: Object
): Promise<string> {
  return new Promise((resolve, reject) => {
    let options = {
      host: hostname,
      port: port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'digi-dungeon-server': 'cockalicious'
      }
    };

    if (method == 'GET') {
      options.path += '?' + qs.stringify(data);
    }

    const req = request(options, (response) => {
      const chunks: any[] = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        if (response.statusCode == 200) {
          const result = Buffer.concat(chunks).toString();
          // Factories bruh
          //let factory = new Factory<T>(T);
          //let auth: T = factory.getNew();
          //resolve(Object.assign(auth, JSON.parse(result)));
          resolve(result);
        } else {
          AppToaster.show({
            message: 'A request unsuccessful, check console for details',
            intent: 'danger'
          });
          console.log(Buffer.concat(chunks).toString());
          reject();
        }
      });
    });

    req.write(JSON.stringify(data));

    req.end();
  });
}

const playerColours = [
  'ffadad',
  'ffd6a5',
  'fdffb6',
  'caffbf',
  '9bf6ff',
  'a0c4ff',
  'bdb2ff',
  'ffc6ff',
  'fffffc'
];

function getRandomPlayerColor() {
  return playerColours[Math.round(Math.random() * playerColours.length)];
}

function getRandomHexColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

function hexColorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

export {
  playerColours,
  getRandomPlayerColor,
  getRandomHexColor,
  hexColorLuminance,
  makeRequest,
  makeJSONRequest,
  makeAuthRequest
};
