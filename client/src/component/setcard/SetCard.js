import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditSetCards from './EditSetCards';

function SetCard({ setcardProps }) {
    const { value, del, drag, edit } = setcardProps;
    const [hideset, setHideset] = useState(true);
    let navigate = useNavigate();
    const [newname, setNewname] = useState(value.name)
    return (
        <div className='new-card' draggable onDragStart={() => drag(value)}>
            <ul className='display'>
                {hideset ? (
                    <li key={value.id} onClick={() => navigate(`/setofcards/${value.id}`)}>
                        <h3 className='new-card-title'>
                        {newname}
                        </h3>
                        <div className='card-actions'>
                        <button
                            className='card-action-btn edit-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                setHideset(!hideset);
                            }}
                        >
                            {hideset ? <>Edit</> : null}
                        </button>
                        <button className='card-action-btn delete-btn' onClick={(e) => { del(e, value.id) }} >
                            Delete
                        </button>
                        </div>
                    </li>
                ) :
                    <EditSetCards
                        name={value.name}
                        id={value.id}
                        hide={hideset}
                        setHide={setHideset}
                        setName={setNewname}
                        edit={edit}
                    />
                }
            </ul>
        </div>
    )
}

export default SetCard