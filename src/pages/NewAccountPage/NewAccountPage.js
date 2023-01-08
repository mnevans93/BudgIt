import { useEffect } from 'react'

export default function NewAccountPage (props) {
    useEffect(() => {
        props.setPage("Set Up a New Account")
    })
    
    return (
      <h1>New Account Page</h1>
    )
  }
