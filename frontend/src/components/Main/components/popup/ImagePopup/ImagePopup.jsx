import CloseIcon from "../../../../../images/Close_Icon.png";
export default function ImagePopup({ selectedCard, onClose }) {
  if (!selectedCard) {
    return null;
  }
  return (
    <>
      <div className={selectedCard ? `popup_image` : ``} id="popup_add">
        <div className="popup__overlay"></div>
        <div className="modalImage__popup">
          <div className="modalImage__content">
            <img src={selectedCard.link} alt="" className="modalImage__open" />
            <img
              src={CloseIcon}
              onClick={onClose}
              alt="Close"
              className="modalImage__close"
            />
            <p className="modalImage__description">{selectedCard.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
