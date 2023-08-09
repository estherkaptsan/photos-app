const INITIAL_STATE = {
  loggedInUser: null,

};


export function userReducer(state = INITIAL_STATE, action = {}) {


  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: action.user,
      };

    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        loggedInUser: action.user,
      };


    case 'PASSWORD_RESET_EMAIL_SENT':
      return {
        ...state,
        passwordResetEmailSent: true,  // Update the state property
        passwordResetError: false,     // Reset the error state if needed
      };
    case 'PASSWORD_RESET_ERROR':
      return {
        ...state,
        passwordResetEmailSent: false, // Reset the sent state if there's an error
        passwordResetError: true,      // Update the error state
      };



    default:
      return state;
  }



}
