import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./DialogModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";



export default function DialogModal({buttonLabel, buttonClass, elements}: any) {
    const [modalTitle, setModalTitle] = useState("Modal Title");
    const modalRef: any = useRef(null);

    const openDialog = () => {
      modalRef.current.showModal();
    };

    const closeDialog = () => {
      modalRef.current.close();
    };

  return (
    <div className="DialogModal">
      <button onClick={openDialog} className={buttonClass}>
        {buttonLabel}
      </button>
      <dialog
        ref={modalRef}
        data-modal
        className="dialog-modal"
        onClick={(e) => {
          const dialogDimensions = modalRef.current.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            closeDialog();
          }
        }}
      >
        <div className="modal-header">
            <p className=""></p>
            <button
                onClick={closeDialog}
            >
                <FontAwesomeIcon icon={icons.faXmark} />
            </button>
        </div>
        <div className="modal-content-wrapper">{elements}</div>
      </dialog>
    </div>
  );
}


DialogModal.defaultProps = {
    buttonLabel: "Open Dialog",
    buttonClass: "dialog-btn",
    elements: <div></div>
};
