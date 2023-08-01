import { storageServiceB } from './storage.service';
import { httpService } from './http.service'

const KEY = 'UserDB';

export const userService = {
  login,
  update,
};

function login(name, password) {
  const loggedInUser = { name: 'kaz', password: '123' }
  if (loggedInUser && loggedInUser.name === name && loggedInUser.password === password) {
    return loggedInUser;
  }

  return null;
}

function update(user) {
  storageServiceB.store(KEY, user);
}
