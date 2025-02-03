import CloseIcon from "../../../../images/Close_Icon.png";
import React from "react";
export default function Popup({
  onSubmit,
  name,
  title,
  buttonTitle,
  isOpen,
  onClose,
  children,
}) {
  return (
    <>
      <div>
        <section
          className={`popup popup_${name} ${isOpen ? `popup_is-opened` : ``} `}
        >
          <div className="popup__overlay"></div>
          <form
            onSubmit={onSubmit}
            className={`form form_${name} ${
              name === `avatar-button` ? `avatar__form` : ``
            } `}
            method="dialog"
            noValidate
            autoComplete="off"
          >
            <fieldset className={`popup__container_${name}`}>
              <img
                src={CloseIcon}
                alt="Close"
                className="popup__close"
                id="btn_close_modal"
                onClick={onClose}
              />
              <h2 className={`popup__title_${name}`}>{title}</h2>
              {children}
              <button
                className={`popup__info popup__info_submit_${name}`}
                type="submit"
              >
                {buttonTitle}
              </button>
            </fieldset>
          </form>
        </section>
      </div>
    </>
  );
}
