import React, { useState } from 'react';

function FriendProfile({ share }) {
  const [flippedCards, setFlippedCards] = useState({});
  const {
    clickRef,
    view,
    setSelectedGroup,
    selectedGroup,
    flashcardGroups,
    getFriendCard
  } = share;

  // Handle selecting a flashcard group
  const handleGroupClick = async (group) => {
    setFlippedCards({});
    await getFriendCard(group);
  };

  // Handle going back to the groups list
  const handleBackClick = () => {
    setSelectedGroup(null);
  };

  // Handle flipping a flashcard
  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!view) return null;

  return (
    <div className="profile" >
      <div className="profile-container" ref={clickRef}>
        <div className="profile-header">
          <h2>{flashcardGroups.friend_name}</h2>
          {selectedGroup && (
            <button onClick={handleBackClick} className="back-button">
              Back to Groups
            </button>
          )}
        </div>

        {selectedGroup ? (
          <div className="flashcard-group">
            {selectedGroup.message ? (
              <p>No flashcards found for this group.</p>
            ) : (
              selectedGroup?.map((flashcard) => (
                <div
                  key={flashcard.id}
                  className="share-card"
                  onClick={() => handleCardClick(flashcard.id)}
                >
                  {flippedCards[flashcard.id] ? (
                    <p className="answer">{flashcard.definition}</p>
                  ) : (
                    <h4>{flashcard.word}</h4>
                  )}
                </div>
              )
              )
            )
            }
          </div>
        ) : (
          <div className="flashcard-group">
            {flashcardGroups.setcards.length === 0 ? (
              <p>No setcard found</p>
            ) : (
              flashcardGroups?.setcards?.map((value, index) => (
                <div
                  // In-case having 2 or more same name group card
                  key={`${value.setcardId}-${value.set_cards_name}-${index}`}
                  className="share-card"
                  onClick={() => handleGroupClick(value.setcardId)}
                >
                  {value.set_cards_name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendProfile;
