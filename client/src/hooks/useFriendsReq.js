import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    fetchFriends,
    getPendingRequest,
    acceptFriend,
    rejectFriend,
    unFriend
} from "../services/friendService";

export const useFriend = (auth) => {
    const [friendList, setFriendList] = useState([]);
    const [pending, setPending] = useState([]);

    // Fetch friends when auth is available
    useEffect(() => {
        if (auth) {
            const GetFriends = async () => {
                try {
                    const response = await fetchFriends();
                    setFriendList(response);
                } catch (err) {
                    console.log(err);
                }
            };
            GetFriends();
        }
    }, [auth]);

    // Fetch pending requests when auth is available
    useEffect(() => {
        if (auth) {
            const getRequest = async () => {
                try {
                    const response = await getPendingRequest();
                    setPending(response);
                } catch (err) {
                    console.log(err);
                }
            };
            getRequest();
        }
    }, [auth]);

    const accepted = async (id) => {
        if (auth) {
            try {
                const response = await acceptFriend(id);
                setPending(pending.filter((val) => val.id !== id));
                setFriendList([...friendList, response]);
                toast.success("Friend added")
            } catch (err) {
                console.log(err);
            }
        }
    };

    const deny = async (id) => {
        if (auth) {
            try {
                await rejectFriend(id);
                setPending(pending.filter((val) => val.id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const unfriend = async (id) => {
        if (auth) {
            try {
                await unFriend(id);
                setFriendList(friendList.filter((val) => val.id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    return { friendList, pending, accepted, deny, unfriend };
};
