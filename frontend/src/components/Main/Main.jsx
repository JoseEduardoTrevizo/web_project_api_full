import ImageVector from "../../images/Vector.png";
import ImageEdit from "../../images/Edit_Button.png";
import ImageAdd from "../../images/Add_Button.png";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup";
import { useContext } from "react";
import Popup from "../Main/components/Popup/Popup";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

export default function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  onClose,
  selectedCard,
}) {
  const CurrentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-picture">
            <img
              src={CurrentUser?.avatar}
              alt="Avatar User"
              className="profile__avatar"
              onClick={onEditAvatarClick}
            />

            <img
              src={ImageVector}
              alt="Edit"
              className="profile__avatar-edit"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-info__avatar profile-info__avatar_name">
              {CurrentUser?.name}
            </h2>
            <p className="profile-info__avatar profile-info__avatar_ocupation">
              {CurrentUser?.about}
            </p>
          </div>
          <img
            src={ImageEdit}
            className="profile__edit-button"
            alt="Edit"
            id="btn_open_modal"
            onClick={onEditProfileClick}
          />
          <img
            src={ImageAdd}
            className="profile__button-add"
            alt="Add"
            onClick={onAddPlaceClick}
          />
        </section>
        {selectedCard && (
          <ImagePopup selectedCard={selectedCard} onClose={onClose} />
        )}
        <section className="elements">
          {cards.map((item, index) => {
            return (
              <Card
                card={item}
                key={index}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onClose={onClose}
                ImagePopup={selectedCard}
              />
            );
          })}
        </section>
        <Popup name={"popup"} />
      </main>
    </>
  );
}
