const initialState = {
    isLoggedIn : false,
    token: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
            ...state,
            isLoggedIn: true,
            token: action.token
        }
      case 'LOGOUT':
        return {
            ...state,
            isLoggedIn: false,
            token: ''
        }
      default:
        return state
    }
}

export default auth