import React from 'react'
import CardList from './CardList';

function CardById({cardProps}) {
  return (
    <div><CardList cardProps={cardProps}/></div>
  )
}

export default CardById