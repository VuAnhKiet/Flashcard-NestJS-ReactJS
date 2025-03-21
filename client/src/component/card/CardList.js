import Card from "./Card";

function CardList({ cardProps }) {
  const { listOfCards, del, edit } = cardProps;
  return (
    <div className="flashcards">
      {listOfCards?.map(
        (flashcard, key) => {
          return <Card
            key={flashcard.id}
            card={flashcard}
            del={del}
            edit={edit}
          />;
        }
      )
      }
    </div>
  )
}

export default CardList;