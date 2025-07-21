import React from 'react'
import useFetch from '../customhooks/useFetch'

const FetchUser = () => {
  const data = useFetch("https://jsonplaceholder.typicode.com/users")
  return (
    <>
    {data.map((res) => {
        return (
            <h4 key={res.id}>
                {res.id}.{res.name}
            </h4>
        )
    })}
    </>
  )
}

export default FetchUser