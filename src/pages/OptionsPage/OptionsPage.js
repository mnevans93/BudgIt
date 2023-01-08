import { useEffect } from 'react'

export default function OptionsPage (props) {
    useEffect(() => {
        props.setPage("User Options")
    })
    
    return (
        <h1>Options Page</h1>
    )
}
