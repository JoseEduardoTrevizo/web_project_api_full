import { useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import Popup from "../Popup";

export default function EditProfile(props) {
  const [name, setName] = useState(CurrentUserContext.name);
  const [description, setDescription] = useState(CurrentUserContext.about);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (evt) => {
    setName(evt.target.value); /* actualiza name cuando cambie la entrada*/
  };

  const handleDescriptionChange = (evt) => {
    setDescription(
      evt.target.value
    ); /* Actualiza descripcion cuando cambie la entrada*/
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    props.onUpdateUser({ name, about: description });
  }

  return (
    <Popup
      name={"edit-profile"}
      title={"Editar perfil"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonTitle={loading ? "Guardando..." : "Guardar"}
      noValidate
    >
      <label className="popup__label">
        <input
          className="popup__info popup__info_name"
          id="name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__info popup__info_about"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </Popup>
  );
}
