import { useRef } from "react";
import "./modal.css";

export const Modal = ({ title, body, modal, setModal }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") setModal(false);
  });

  return (
    <div
      onClick={(evt) => handleOverlay(evt)}
      ref={overlayRef}
      className={`overlay ${modal ? "open" : ""}`}
    >
      <div className="modal-inner">
        <button
          onClick={() => setModal(false)}
          className="btn btn-dark rounded-0 close-modal"
        >
          &times;
        </button>
        <div className="modal-header">
          <h2 className="h2">{title}</h2>
        </div>
        <div className="modal-content">{body}</div>
      </div>
    </div>
  );
};
