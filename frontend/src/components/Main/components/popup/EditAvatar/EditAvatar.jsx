import { useRef } from "react";
import Popup from "../Popup";
import { useState } from "react";

export default function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <Popup
      name={"change-avatar"}
      title={"Cambiar foto de perfil"}
      buttonTitle={loading ? "Guardando..." : "Guardar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="changeProfile__inputChange"
        type="url"
        name="avatar"
        placeholder="Ingrese el nuevo enlace"
        id="avatar"
        required
        ref={avatarRef}
      />
      <span className="form__error_avatar form__error"></span>
    </Popup>
  );
}
