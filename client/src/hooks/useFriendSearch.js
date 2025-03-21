import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import {
    sendRequest,
    searchFriends
} from "../services/friendService";

export const useSearch = (auth) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [pendingId, setPendingId] = useState([]);
    const [status, setStatus] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (query.length < 1) {
                setResults([]);
                setDropdownVisible(false);
                return;
            }

            try {
                const response = await searchFriends(query);
                setResults(response.friends);
                setPendingId(response.pendingFriends);
                setDropdownVisible(true);
            } catch (error) {
                console.error("Error fetching data:", error);
                setResults([]);
            }
        };

        const debounceFetch = setTimeout(fetchData, 300);
        return () => clearTimeout(debounceFetch);
    }, [query]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    const addFriend = async (id) => {
        try {
            const response = await sendRequest(id);
            setStatus(response.status);
            setPendingId((prev) => [...prev, id]);
            toast.success("Request was sent successfully")
        } catch (err) {
            console.log(err);
        }
    };

    return { 
        query, 
        setQuery, 
        results, 
        isDropdownVisible, 
        dropdownRef, 
        pendingId, 
        addFriend 
    };
};
