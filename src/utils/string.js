export const getDateSignFormat = (dateObj) => {
    if (dateObj) {
        const date = dateObj.getDate()
        const monthNumber = dateObj.getMonth()
        let month
        const year = dateObj.getFullYear()

        switch (monthNumber) {
            case 0:
                month = 'Januari'
                break;
            case 1:
                month = 'Februari'
                break;
            case 2:
                month = 'Maret'
                break;
            case 3:
                month = 'April'
                break;
            case 4:
                month = 'Mei'
                break;
            case 5:
                month = 'Juni'
                break;
            case 6:
                month = 'Juli'
                break;
            case 7:
                month = 'Agustus'
                break;
            case 8:
                month = 'September'
                break;
            case 9:
                month = 'Oktober'
                break;
            case 10:
                month = 'November'
                break;
            default:
                month = 'Desember'
                break;
        }

        return `${date} ${month} ${year}`
    }
    return ''
}