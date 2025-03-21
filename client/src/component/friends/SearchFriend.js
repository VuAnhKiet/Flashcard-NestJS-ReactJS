import React, { useContext } from 'react';
import { useSearch } from '../../hooks/useFriendSearch';
import { useAuth } from '../../AuthContext';
function FriendsSearch() {
    const { auth } = useAuth();
    const {
        query,
        setQuery,
        addFriend,
        results,
        pendingId,
        dropdownRef,
        isDropdownVisible,
    } = useSearch(auth);

    const Addfriend = async (id) => {
        addFriend(id);
    };

    return (
        <div className="search-container" ref={dropdownRef}>
            <input
                type="text"
                id="friend-search"
                placeholder="Search for friends..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            {isDropdownVisible && (
                <div className="dropdown" id="friend-list">
                    {results.length > 0 ? (
                        results.map((value, key) => (
                            <div key={key} className="dropdown-item">
                                {value.fullname}
                                {pendingId.includes(value.id) ? (
                                    <button className="pending-friend-button">Pending Friend Request</button>
                                ) : (
                                    <button
                                        className="add-friend-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            Addfriend(value.id);
                                        }}
                                    >
                                        Add Friend
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        query && <div className="dropdown-item">No friends found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FriendsSearch;
