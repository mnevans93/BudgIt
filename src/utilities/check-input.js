export default function validInput(event, field) {
    if (event.target.name !== field || event.target.name === field &&  event.target.value.match("^[a-zA-Z0-9' ]*$") !== null) {
        return true
    } else {return false}
}
