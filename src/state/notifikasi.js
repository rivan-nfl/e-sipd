const initialState = []

const notifikasi = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_NOTIFIKASI':
        return action.data
      default:
        return state
    }
}

export default notifikasi