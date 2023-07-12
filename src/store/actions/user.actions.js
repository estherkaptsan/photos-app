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
      const { loggedInUser } = getState().user; // Get the logged-in user from the state
      if (!loggedInUser) {
        console.log('User not logged in');
        return false;
      }

      // Check if the logged-in user matches the user to be updated
      if (loggedInUser.name !== user.name) {
        console.log('Unauthorized: Cannot update another user');
        return false;
      }

      // Perform update logic using the userService
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
