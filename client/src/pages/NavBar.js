import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// Components
import FriendsSearch from '../component/friends/SearchFriend';

function NavBar() {
    const {auth,logoutHandle} = useAuth();
    const navigate = useNavigate();

    return (
            <div className="app">
                <header className="navbar">
                    <a className="" href="/">
                        <h1 className='logo'>📘 Flashcards</h1>
                    </a>

                    {auth && <FriendsSearch />}
                    
                    <nav>
                        {!auth ? (
                            <button className="nav-btn" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        ) : (
                            <button className="nav-btn" onClick={logoutHandle}>
                                Logout
                            </button>
                        )}
                    </nav>
                </header>
            </div>
    );
}

export default NavBar;
