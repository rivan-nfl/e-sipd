const initialState = []

const dipa = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_DIPA':
            return action.data
        default:
            return state
    }
}

export default dipa