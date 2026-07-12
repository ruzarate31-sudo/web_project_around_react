import {useState, useContext} from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {

     const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
     const [name, setName] = useState(currentUser.name);
     const [description, setDescription] = useState(currentUser.about);
   
     const handleNameChange = (event) => {
     setName(event.target.value);
   };

      const handleDescriptionChange = (event) => {
     setDescription(event.target.value); 
     }; 

   function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
    name,
    about: description,
    });
   }

    return (
        <form className="popup__form"
        id="edit-profile-form"
        noValidate
        onSubmit={handleSubmit}
        >
            <h2 className="popup__title">{props.title}</h2>
            <label className="popup__field">
                <input
                  className="popup__input popup__input_type_name"
                  name="name"
                  placeholder="Nombre"
                  type="text"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={handleNameChange}
                />
                <span className="popup__error popup__error_type_name"></span> 
             </label>
             <label className="popup__field">
                <input
                className="popup__input popup__input_type_description"
                name="description"
                placeholder="Acerca de mí"
                type="text"
                required
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
                />
                <span className="popup__error popup__error_type_description"></span>
             </label>

             <button 
                className="button popup__button"
                type="submit"
             >
                Guardar
             </button>
        </form>
    );
}