import { useState, useEffect } from 'react';
import {
    fetchCards,
    createCard,
    deleteCard,
    searchCard,
    updateCard as updateCardService
} from "../services/cardService";

export const useCards = (groupCardId, auth) => {
    const [listOfCards, setListOfCards] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getCards = async () => {
            if (auth) {
                try {
                    const cardsData = await fetchCards(groupCardId);
                    setListOfCards(cardsData);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getCards();
    }, [auth, groupCardId]);

    const addCard = async (data) => {
        try {
            const newCard = await createCard(data);
            setListOfCards((prevCards) => [newCard,...prevCards]);
        } catch (err) {
            console.error("Error creating card:", err);
        }
    };

    const removeCard = async (id) => {
        try {
            await deleteCard(id);
            setListOfCards((prevCards) => prevCards.filter((card) => card.id !== id));
        } catch (err) {
            console.error("Error deleting card:", err);
        }
    };

    const editCard = async (cardData) => {
        try {
            const updatedCard = await updateCardService(cardData);
            setListOfCards((prev) =>
                prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
            );
        } catch (err) {
            alert("Please login to continue!");
        }
    };

    const searchCards = async (query) => {
        try {
            const results = await searchCard({ s: query, groupCardId });
            setMessage('');
            setListOfCards(results);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage(error.response.data.message);
                setListOfCards([]);
            } else if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error("An error occurred:", error);
            }
        }
    };

    const checkQuery = async () => {
        try {
            const query = await fetchCards(groupCardId);
            setListOfCards(query);
            setMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    return {
        listOfCards,
        setListOfCards,
        message,
        addCard,
        removeCard,
        searchCards,
        editCard,
        checkQuery
    };
};
