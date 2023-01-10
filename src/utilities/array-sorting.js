export default function sortArrayByDate (arr) {
    return arr.sort((a, b) => {
        const first = new Date(a.date)
        const second = new Date(b.date)
        if (first < second ) {
            return -1
        } else if (first > second) {
            return 1
        } else {
            return 0
        }
    })
}
