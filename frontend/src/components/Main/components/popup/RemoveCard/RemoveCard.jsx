import { useState } from "react";
import Popup from "../Popup";

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onCardDelete,
  card,
}) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    onCardDelete(card._id);
  };

  return (
    <Popup
      title={"¿Estas seguro?"}
      name={"confirmation"}
      buttonTitle={loading ? "Eliminando..." : "Estoy seguro"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
