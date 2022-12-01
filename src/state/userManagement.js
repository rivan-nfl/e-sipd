const initialState = {
    id: null,
    nama: '',
    username: '',
    nrp: '',
    alamat: '',
    pangkat: '',
    bagian: '',
    foto: '',
    jabatan: '',
    role: ''
}

const userManagement = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_CURRENT_USER':
        return {
            ...state,
            id: action.data.id,
            nama: action.data.nama,
            username: action.data.username,
            nrp: action.data.nrp,
            alamat: action.data.alamat,
            pangkat: action.data.pangkat,
            bagian: action.data.bagian,
            foto: action.data.foto,
            jabatan: action.data.jabatan,
            role: action.data.role
        }
      default:
        return state
    }
}

export default userManagement