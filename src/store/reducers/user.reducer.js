const INITIAL_STATE = {
  loggedInUser: null,
  passwordResetEmailSent: false,
  passwordResetError: false,
  passwordResetSuccess: false,
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
          passwordResetEmailSent: true,
          passwordResetError: false,
          // passwordResetSuccess: true, // Set passwordResetSuccess to true
        };
        case 'PASSWORD_RESET_EMAIL_ERROR':
      return {
        ...state,
        passwordResetEmailSent: false,
        passwordResetError: true,
        // passwordResetSuccess: false, // Set passwordResetSuccess to false
      };
    case 'PASSWORD_RESET_ERROR':
      return {
        ...state,
        passwordResetEmailSent: false,
        passwordResetError: true,
        passwordResetSuccess: false,
      };

    case 'PASSWORD_RESET_SUCCESS':
      return {
        ...state,
        passwordResetEmailSent: false,
        passwordResetError: false,
        passwordResetSuccess: true,
      };

    default:
      return state;
  }
}
