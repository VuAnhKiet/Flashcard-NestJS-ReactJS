import { useState } from "react";
import EditCard from "./EditCard";

function Card({ card, del, edit }) {
    const [flip, setFlip] = useState(true);
    const [hide, setHide] = useState(true);
    const [newword, setNewword] = useState(card.word);
    const [newdef, setNewdef] = useState(card.definition);

    const editCardProps = {
        onClick: (e) => { e.stopPropagation(); },
        word: newword,
        cardId: card.id,
        definition: newdef,
        state: hide,
        setword: setNewword,
        setdef: setNewdef,
        setState: setHide
    };

    return (
        <div className='new-card card-container card-content' onClick={() => { setFlip(!flip) }}>
            {hide ? (
                flip ?
                    <div className='word'>{newword}</div>
                    :
                    <div className='defination'>{newdef}</div>
            )
                :
                <EditCard
                    {...editCardProps}
                />
            }
            <div className="card-actions">
                {hide && (
                    <>
                        <button
                            className="card-action-btn delete-btn"
                            onClick={(e) => { del(e, card.id); }}
                        >
                            Delete
                        </button>
                        <button
                            className="card-action-btn edit-btn"
                            onClick={(e) => {
                                edit(e, card.id);
                                setHide(false);
                            }}
                        >
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Card;