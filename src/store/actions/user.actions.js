import { userService } from '../../services/user.service';

export function login(credentials) {
  return async (dispatch) => {
    try {
      // Perform login logic using the userService
      const loggedInUser = userService.login(credentials);

      if (loggedInUser) {
        dispatch({ type: 'LOGIN', user: loggedInUser });
        return true;
      } else {
        console.log('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log('Error:', error);
    }
  };
}

export function updateUser(user) {
  return async (dispatch, getState) => {
    try {
      const { loggedInUser } = getState().user;
      if (!loggedInUser) {
        console.log('User not logged in');
        return false;
      }

      if (loggedInUser.name !== user.name) {
        console.log('Unauthorized: Cannot update another user');
        return false;
      }

      userService.update(user);

      console.log('User updated successfully');
      dispatch({ type: 'UPDATE_USER', user });
      return true;
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  };
}



export function sendPasswordResetEmail(email) {
  return async (dispatch) => {
    try {
      await userService.sendPasswordResetEmail(email);
      // Dispatch a success action if needed
      dispatch({ type: 'PASSWORD_RESET_EMAIL_SENT', email }); // Include email in the payload
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Dispatch an error action if needed
      dispatch({ type: 'PASSWORD_RESET_EMAIL_ERROR' });
    }
  };
}
