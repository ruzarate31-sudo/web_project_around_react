import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext"

export default function EditAvatar() {

  const avatarRef = useRef(); 
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

 function handleSubmit(event) {
  event.preventDefault();
  
  handleUpdateAvatar({
  avatar: avatarRef.current.value,
  });
}

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          type="url"
          required
          ref={avatarRef}
        />

        <span className="popup__error popup__error_type_avatar"></span>
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