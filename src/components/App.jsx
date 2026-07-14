import { useState, useEffect } from "react";
import '../index.css';
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Footer from './Footer/Footer.jsx';
import Header from "./Header/Header.jsx"
import Main from "./Main/Main.jsx"


function App() {

  const [currentUser, setCurrentUser] = useState({}); 
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
  setPopup(null);
}   

   useEffect(() => {
   api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData); 
    })
    .catch((err) => console.error(err));
 }, []);

   useEffect(() => {
   api.getInitialCards()
    .then((data) => {
      setCards(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

   async function handleUpdateUser(data) {
   try {
    const newData = await api.editUserInfo(data);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
 }

 function handleDeleteClick(card) {
  setSelectedCard(card);

  handleOpenPopup({
    title: "¿Estás seguro?",
    type: "delete",
    children: null,
  });
} 

 async function handleUpdateAvatar(data) {
  try {
    const newData = await api.editAvatar(data.avatar);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
}


async function handleCardLike(card) {

const isLiked = card.isLiked;
    await api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
}

 
async function handleCardDelete(card) {
  await api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
       handleClosePopup();
        setSelectedCard(null);
    })
    .catch((error) => console.error(error));
}
  
 async function handleAddPlaceSubmit(data) {
  try {
    const newCard = await api.addCard(data);

    setCards((state) => [newCard, ...state]);

    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
}
 

  return (
    <CurrentUserContext.Provider 
    value={{ 
      currentUser, handleUpdateUser, handleUpdateAvatar }}>
      
    <div className="page__content">
      <Header />
     <Main
     popup={popup}
     onOpenPopup={handleOpenPopup}
     onClosePopup={handleClosePopup}
     cards={cards}
     onCardLike={handleCardLike}
     onCardDelete={handleDeleteClick}
     handleCardDelete={handleCardDelete}
     selectedCard={selectedCard}
    onAddPlaceSubmit={handleAddPlaceSubmit}
    />
      <Footer />
    </div>
    
    </CurrentUserContext.Provider>
  );
}


export default App
