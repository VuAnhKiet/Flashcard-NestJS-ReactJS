import React from 'react'
import FriendRequest from './FriendRequest';

function FriendRequestList({ accept, deny, request }) {
    const Accepted = async (id) => {
        await accept(id);
    }

    const Deny = async (id) => {
        await deny(id);
    }

    return (
        <div>
            <ul className="request-list">
                {request.map((value, key) => {
                    return (
                        <li className='friend-request'>
                            <span><FriendRequest value={value.fullname} id={value.id} /></span>
                            <div className='approve-deny'>
                                <button className="approve-btn" onClick={() => { Accepted(value.id) }}>Approve</button>
                                <button className="deny-btn" onClick={() => { Deny(value.id) }}>Deny</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FriendRequestList