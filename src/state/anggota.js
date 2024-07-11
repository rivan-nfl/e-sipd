const initialState = []

const anggota = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_ANGGOTA':
            return action.data
        default:
            return state
    }
}

export default anggota