import {useCallback, useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import api from '../utils/Api';
import * as auth from '../utils/auth';
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
import InfoTooltip from './InfoTooltip';
import WithSetRes from './WithSetRes';


const App = () => {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({});
  
  const [authInfo, setAuthInfo] = useState({isLoggedIn: true, userEmail: ''});
  
  const [isPopupOpen, setIsPopupOpen] = useState({
    editAvatarPopup: false,
    editProfilePopup: false,
    addPlacePopup: false,
    deletePlacePopup: false,
    cardPreviewPopup: false
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  
  
  // set initial current user info and initial cards
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  
  // handle authorization
  
  const handleSignUp = userInfo => {
    setIsLoading(true);
    
    auth.register(userInfo)
      .then(() => navigate('/sign-in', {replace: true}))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  const handleSignIn = userInfo => {
    setIsLoading(true);
    
    auth.authorize(userInfo)
      .then(data => {
        setAuthInfo({...authInfo,
          ['isLoggedIn']: true
        });
        localStorage.setItem('jwt', data['token']);
        navigate('/', {replace: true});
        handleAuth(data['token'])
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  const handleAuth = () => {
    setIsLoading(true);
    
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          setAuthInfo({...authInfo,
            ['userEmail']: res.data.email,
            ['isLoggedIn']: true
          });
          
          navigate('/', {replace: true});
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setAuthInfo({...authInfo,
        ['userEmail']: '',
        ['isLoggedIn']: false
      });
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    
    handleAuth(jwt);
  }, []);
  
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    
    navigate('/sign-in');
  }
  
  
  // handle open popup
  
  const handleEditAvatarClick = useCallback(() => {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: true
    });
  }, [isPopupOpen]);
  
  const handleEditProfileClick = useCallback(() => {
    setIsPopupOpen({...isPopupOpen,
      editProfilePopup: true
    });
  }, [isPopupOpen]);
  
  const handleAddPlaceClick = useCallback(() => {
    setIsPopupOpen({...isPopupOpen,
      addPlacePopup: true
    });
  }, [isPopupOpen]);
  
  const handleDeletePlaceClick = useCallback(card => {
    setCardToDelete(card);
    
    setIsPopupOpen({...isPopupOpen,
      deletePlacePopup: true
    });
  }, [isPopupOpen]);
  
  
  // handle close popup
  
  const closeAllPopups = useCallback(() => {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: false,
      editProfilePopup: false,
      addPlacePopup: false,
      deletePlacePopup: false,
      cardPreviewPopup: false
    });
    const cleanUp = () => setSelectedCard({});
    setTimeout(cleanUp, 200);
  }, [isPopupOpen]);
  
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };
  
    if (Object.values(isPopupOpen).some(p => p === true)) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  
    // eslint-disable-next-line
  }, [isPopupOpen]);
  
  
  // handle cards
  
  const handleCardClick = useCallback(card => {
    setIsPopupOpen({...isPopupOpen,
      cardPreviewPopup: true
    });
    
    setSelectedCard(card);
  }, [isPopupOpen]);
  
  // noinspection com.haulmont.rcb.ExhaustiveDepsInspection
  const handleCardLikeClick = useCallback(card => {
    const isLiked = card['likes'].some(like => like['_id'] === currentUser['_id']);
  
    api.changeLikeCardStatus(card['_id'], isLiked)
      .then(newCard => setCards(cards.map(c => c['_id'] === card['_id'] ? newCard : c)))
      .catch(err => console.log(err));
  }, [cards, currentUser]);
  
  
  // handle forms
  
  const handleUpdateAvatar = ({userAvatar}) => {
    setIsLoading(true);
    
    api.patchUserAvatar({avatar: userAvatar})
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };
  
  const handleUpdateUser = ({userName, userAbout}) => {
    setIsLoading(true);
    
    api.patchUserInfo({name: userName, about: userAbout})
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };
  
  const handleAddPlace = ({placeName, placeLink}) => {
    setIsLoading(true);
    
    api.postCard({name: placeName, link: placeLink})
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };
  
  const handleDeletePlace = card => {
    setIsLoading(true);
    
    api.deleteCard(card['_id'])
      .then(() => setCards(cards.filter(c => c['_id'] !== card['_id'])))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };
  
  return (
    <AuthContext.Provider value={authInfo}>
      <CurrentUserContext.Provider value={currentUser}>
        <WithSetRes
          element={Header}
          onSignOut={handleSignOut}
        />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                isLoading={isLoading}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleCardLikeClick}
                onCardDeleteClick={handleDeletePlaceClick}
              />
            }
            />
            <Route path="/sign-up" element={<Register onSignUp={handleSignUp}/>}/>
            <Route path="/sign-in" element={<Login onSignIn={handleSignIn}/>}/>
            {/*<Route path="*" element={<Navigate to="/" replace/>}/>*/}
          </Routes>
        <EditProfilePopup
          isOpen={isPopupOpen.editProfilePopup}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onClose={closeAllPopups}
          validate={true}
        />
      </CurrentUserContext.Provider>
      <Footer/>
      <EditAvatarPopup
        isOpen={isPopupOpen.editAvatarPopup}
        onUpdateAvatar={handleUpdateAvatar}
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
      <InfoTooltip />
    </AuthContext.Provider>
  );
};

export default App;