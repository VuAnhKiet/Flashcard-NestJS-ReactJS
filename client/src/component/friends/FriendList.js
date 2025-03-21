import React from 'react'
import Friend from './Friend';

export default function FriendList({ friends, del, share }) {
    const { setView, getFriendSetCard } = share;
    const Open = async (id) => {
        console.log(typeof (id));
        await getFriendSetCard(id);
        setView(true);
    }
    return (
        <div>
            <ul className="friend-list">
                {friends.map((value, key) => {
                    return (
                        <li key={key} onClick={(e) => { Open(value.id); }}>
                            <Friend value={value.fullname} id={value.id} />
                            <button className="unfriend-btn"
                                onClick={(e) => {
                                    del(e, value.id);
                                }}
                            >Unfriend
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
