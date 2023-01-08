import { useEffect } from 'react'

export default function DashboardPage (props) {
  useEffect(() => {
    props.setPage("My Dashboard")
  }, [])
  
  return (
    <h1>Dashboard Page</h1>
  )
}
