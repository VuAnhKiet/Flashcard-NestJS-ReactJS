import React from 'react'

function SetCardSearch({searchProps}) {
    const {query,checkValue,Search} = searchProps;

    return (
        <div className='search-box'>
            <form onSubmit={Search}>
                <input type="text" id="mySearch" value={query} onChange={checkValue} placeholder="Search for set cards..."></input>
            </form>
        </div>
    )
}

export default SetCardSearch