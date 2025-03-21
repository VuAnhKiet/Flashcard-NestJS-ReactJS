import React from 'react';

const Modal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this?</p>
                <div className="button-container">
                    <button className="confirm" onClick={onConfirm}>Yes</button>
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
