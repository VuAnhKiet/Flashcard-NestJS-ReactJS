import React,{ useState } from 'react';
import Modal from "../modal/Modal"

function ShareSection({ shareProps }) {
    const { drop, delShareCard, shareBox } = shareProps;
    const [cardToDelete, setCardToDelete] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const del = async (e, id) => {
        e.stopPropagation();
        setCardToDelete(id);
        setIsOpen(true);
    }

    const handleConfirmDelete = async () => {
        if (cardToDelete) {
            await delShareCard(cardToDelete);
            setCardToDelete(null);
        }
        setIsOpen(false);
    };

    const handleCancelDelete = () => {
        setCardToDelete(null);
        setIsOpen(false);
    };
    
    return (
        <div className="">
            <Modal
                isOpen={isOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <div className="shareholder-section">
                <h2>ShareCards Area</h2>
                <div
                    className="shareholder-dropzone"
                    onDrop={drop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {shareBox.length === 0 ? (
                        <p className="placeholder">Drag cards here</p>
                    ) : (
                        shareBox.map((card) => (
                            <div key={card.id} className="card">
                                <p>{card.set_cards_name}</p>
                                <button
                                    className="remove-button"
                                    onClick={(e) => del(e,card.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShareSection;
