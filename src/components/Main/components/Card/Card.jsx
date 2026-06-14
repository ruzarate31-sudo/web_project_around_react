import ImagePopup from "../ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { handleOpenPopup } = props;
  const { name, link } = props.card;

  const imagePopup = {
    children: <ImagePopup card={props.card} />,
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />

      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Botón Me gusta"
          className="card__like-button"
          type="button"
        />
      </div>
    </li>
  );
}