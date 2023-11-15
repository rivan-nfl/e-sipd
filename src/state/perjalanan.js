const initialState = []

const perjalanan = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_PERJALANAN':
        return action.data
      default:
        return state
    }
}

export default perjalanan