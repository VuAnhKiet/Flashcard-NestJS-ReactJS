import { useState, useEffect, useRef } from 'react';
import {
    fetchShareCards,
    addToShare,
    deleteShareCard,
    getFriendsShareSetCard,
    getFriendsShareCard
} from '../services/shareCardService';


export const useShare = (auth) => {
    const [shareBox, setShareBox] = useState([]);
    const [draggedCard, setDraggedCard] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [flashcardGroups, setFlashcardGroups] = useState([]);
    const [flippedCards, setFlippedCards] = useState({});
    const [view, setView] = useState(false);
    const clickRef = useRef(null);

    // Get User's sharing setcard for friends
    useEffect(() => {
        if (auth) {
            const getShareCards = async () => {
                try {
                    const data = await fetchShareCards();
                    setShareBox(data);
                } catch (err) {
                    console.log(err);
                }
            }
            getShareCards();
        }
    }, [auth]);

    //Add setcard to share box
    const addShareCard = async () => {
        if (draggedCard) {
            try {
                const res = await addToShare(draggedCard);
                setShareBox([res, ...shareBox]);
                setDraggedCard(null);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const removeShareCard = async (id) => {
        try {
            const res = await deleteShareCard(id)
            setShareBox((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err)
        }
    }

    // Get friend's sharing setcard
    const getFriendSetCard = async (id) => {
        try {
            const response = await getFriendsShareSetCard(id);
            setFlashcardGroups(response);
        } catch (err) {
            console.log(err);
        }
    }

    // Get friend's sharing cards
    const getFriendCard = async (id) => {
        try {
            const response = await getFriendsShareCard(id);
            setSelectedGroup(response);
        } catch (err) {
            console.log(err)
        }
    }

    // Add event listener for handling click oustside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (clickRef.current && !clickRef.current.contains(event.target)) {
            setView(false);
        }
    };

    return {
        addShareCard,
        removeShareCard,
        getFriendSetCard,
        getFriendCard,
        shareBox,
        setShareBox,
        draggedCard,
        setDraggedCard,
        view,
        setView,
        clickRef,
        selectedGroup,
        setSelectedGroup,
        flashcardGroups
    }
}