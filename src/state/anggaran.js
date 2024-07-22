const initialState = {
    detail: {},
    allAnggaran: []
}

const anggaran = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_ANGGARAN':
            return {
                ...state,
                allAnggaran: action.data
            }
        case 'SAVE_CURRENT_ANGGARAN':
            return {
                ...state,
                detail: action.data
            }
        default:
            return state
    }
}

export default anggaran