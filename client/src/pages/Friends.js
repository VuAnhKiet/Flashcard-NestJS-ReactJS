import React, { useState, useContext } from 'react';

// Components
import FriendList from '../component/friends/FriendList';
import FriendRequestList from '../component/friends/FriendRequestList';
import Modal from '../component/modal/Modal';

// Context
import { useAuth } from '../AuthContext';

// Custom Hooks
import { useFriend } from '../hooks/useFriendsReq';

function Friends({ share }) {
  const { auth } = useAuth();
  const { friendList, pending, accepted, deny, unfriend } = useFriend(auth);
  
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Handle the deletion of a friend
  const del = async (e, id) => {
    e.stopPropagation();
    setFriendToDelete(id);
    setIsOpen(true);
  };

  // Confirm friend deletion
  const handleConfirmDelete = async () => {
    if (friendToDelete) {
      await unfriend(friendToDelete);
      setFriendToDelete(null);
    }
    setIsOpen(false);
  };

  // Cancel the deletion
  const handleCancelDelete = () => {
    setFriendToDelete(null);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Modal for confirming the deletion of a friend */}
      <Modal
        isOpen={isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div className="friend-list-container">
        <div className="friend-list-container-content">
          
          {/* Friends Section */}
          <div className="friend-section">
            <h2 className="friend-section-title">Friends</h2>
            <FriendList friends={friendList} del={del} share={share} />
          </div>

          {/* Friend Requests Section */}
          <div className="request-section">
            <h2 className="request-section-title">Friend Requests</h2>
            <FriendRequestList request={pending} accept={accepted} deny={deny} />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Friends;
