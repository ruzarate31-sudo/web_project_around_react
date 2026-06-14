export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          type="url"
          required
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