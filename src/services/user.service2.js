import { storageServiceB } from './storage.service';
import { httpService } from './http.service'

const KEY = 'UserDB';

export const userService = {
  login,
  update,
};

function login(credentials) {
  const loggedInUser = { username: 'kaz', password: '123' }
  if (loggedInUser && loggedInUser.username === credentials.username && loggedInUser.password === credentials.password) {
    return loggedInUser;
  }
  return null;
}

function update(user) {
  storageServiceB.store(KEY, user);
}


