import { useEffect } from 'react'

export default function OptionsPage (props) {
  useEffect(() => {
    props.setPage('Options')
  })

  return (
    <main>
      <h1>Options Page</h1>
    </main>
  )
}
