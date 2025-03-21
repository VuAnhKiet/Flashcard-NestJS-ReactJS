import React from 'react'

function SearchCard({ searchProps }) {
  const { query, Search, checkValue } = searchProps;
  return (
    <div className='search-box'>
      <form onSubmit={Search}>
        <input type="text" id="mySearch" value={query} onChange={checkValue} placeholder="Search for cards..."></input>
      </form>
    </div>
  )
}

export default SearchCard