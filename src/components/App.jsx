import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import api from '../utils/Api';
import {AuthContext} from '../contexts/AuthContext';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const [isPopupOpen, setIsPopupOpen] = useState({
    editAvatarPopup: false,
    editProfilePopup: false,
    addPlacePopup: false,
    deletePlacePopup: false,
    cardPreviewPopup: false
  })
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  
  
  // set initial current user info and initial cards
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      }).catch(err => console.log(err));
  }, [])
  
  
  // handle open popup
  
  function handleEditAvatarClick() {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: true
    });
  }
  
  function handleEditProfileClick() {
    setIsPopupOpen({...isPopupOpen,
      editProfilePopup: true
    });
  }
  
  function handleAddPlaceClick() {
    setIsPopupOpen({...isPopupOpen,
      addPlacePopup: true
    });
  }
  
  function handleDeletePlaceClick(card) {
    setCardToDelete(card);
    
    setIsPopupOpen({...isPopupOpen,
      deletePlacePopup: true
    });
  }
  
  
  // handle close popup
  
  function closeAllPopups() {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: false,
      editProfilePopup: false,
      addPlacePopup: false,
      deletePlacePopup: false,
      cardPreviewPopup: false
    });
    
    const cleanUp = () => setSelectedCard({});
    setTimeout(cleanUp, 200);
  }
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
  
    if (Object.values(isPopupOpen).some(p => p === true)) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  
    // eslint-disable-next-line
  }, [isPopupOpen]);
  
  
  // handle cards
  
  function handleCardClick(card) {
    setIsPopupOpen({...isPopupOpen,
      cardPreviewPopup: true
    });
    
    setSelectedCard(card);
  }
  
  function handleCardLikeClick(card) {
    const isLiked = card['likes'].some(like => like['_id'] === currentUser['_id']);
  
    api.changeLikeCardStatus(card['_id'], isLiked)
      .then(newCard => setCards(cards.map(c => c['_id'] === card['_id'] ? newCard : c)))
      .catch(err => console.log(err));
  }
  
  
  // handle forms
  
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    
    api.patchUserAvatar(avatar)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    
    api.patchUserInfo(newUserInfo)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleAddPlace(newCard) {
    setIsLoading(true);
    
    api.postCard(newCard)
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleDeletePlace(card) {
    setIsLoading(true);
    
    api.deleteCard(card['_id'])
      .then(() => setCards(cards.filter(c => c['_id'] !== card['_id'])))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <AuthContext.Provider value={isLoggedIn}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLikeClick={handleCardLikeClick}
              onCardDeleteClick={handleDeletePlaceClick}
            />
          }
          />
          <Route path="/sign-up" element={<Register/>}/>
          <Route path="/sign-in" element={<Login/>}/>
        </Routes>
      </AuthContext.Provider>
      <Footer/>
      <EditAvatarPopup
        isOpen={isPopupOpen.editAvatarPopup}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        onClose={closeAllPopups}
        validate={true}
      />
      <EditProfilePopup
        isOpen={isPopupOpen.editProfilePopup}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        onClose={closeAllPopups}
        validate={true}
      />
      <AddPlacePopup
        isOpen={isPopupOpen.addPlacePopup}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
        onClose={closeAllPopups}
        validate={true}
      />
      <DeletePlacePopup
        isOpen={isPopupOpen.deletePlacePopup}
        onDeletePlace={handleDeletePlace}
        cardToDelete={cardToDelete}
        isLoading={isLoading}
        onClose={closeAllPopups}
        validate={false}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isPopupOpen.cardPreviewPopup}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;