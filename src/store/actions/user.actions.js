import { userService } from '../../services/user.service';

export function login(username, password) {
  return async (dispatch) => {
    try {
      // Perform login logic using the userService
      const loggedInUser = userService.login(username, password);

      if (loggedInUser) {
        console.log('Login successful!');
        dispatch({ type: 'LOGIN', user: loggedInUser });
        return true;
      } else {
        console.log('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log('error:', error);
    }
  };
}
