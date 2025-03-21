import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    fetchSetCards,
    createSetCard,
    updateSetCard,
    deleteSetCard,
    searchSetCard
} from '../services/setcardService';

export const useSetCard = (auth) => {
    const [cardstheme, setCardstheme] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch set cards when auth is available
    useEffect(() => {
        if (auth) {
            const getSetCards = async () => {
                try {
                    const data = await fetchSetCards();
                    setCardstheme(data);
                } catch (err) {
                    console.log(err);
                }
            };
            getSetCards();
        }
    }, [auth]);

    // Add a new set card
    const addSetCard = async (data) => {
        try {
            const createdSetCard = await createSetCard(data);
            setCardstheme([createdSetCard, ...cardstheme]);
            return createdSetCard;
        } catch (err) {
            return { error: err.response?.data?.error };
        }
    };

    // Remove a set card by id
    const removeSetCard = async (id) => {
        try {
            await deleteSetCard(id);
            setCardstheme(cardstheme.filter((val) => val.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // Edit a set card's name by id
    const editSetCard = async (data, id) => {
        try {
            const res = await updateSetCard({ name: data.name, id });
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    // Search set cards
    const findSetCard = async (query) => {
        try {
            const searchResults = await searchSetCard(query);
            setMessage('');
            setCardstheme(searchResults);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setCardstheme([]);
                    setMessage(err.response.data.message);
                } else if (err.response.status === 400) {
                    alert(err.response.data.message);
                }
            } else {
                console.error("An error occurred:", err);
            }
        }
    };

    // Fetch set cards (used when query is empty or reset)
    const checkQuery = async () => {
        try {
            const query = await fetchSetCards();
            setCardstheme(query);
            setMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    return {
        cardstheme,
        setCardstheme,
        message,
        setMessage,
        addSetCard,
        removeSetCard,
        findSetCard,
        checkQuery,
        editSetCard
    };
};
