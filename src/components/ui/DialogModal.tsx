import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@/assets/icons";

export const DialogModal = ({
  buttonLabel,
  buttonClass,
  elements,
}: any) => {
  const modalRef: any = useRef(null);

  const openDialog = () => {
    modalRef.current.showModal();
  };

  const closeDialog = () => {
    modalRef.current.close();
  };

  return (
    <div>
      <button onClick={openDialog} className={buttonClass}>
        {buttonLabel}
      </button>
      <dialog
        ref={modalRef}
        data-modal
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[550px] 
          bg-white dark:bg-gray-900
          rounded-md border-none
          p-5 sm:p-8
          sm:max-w-[500px]
          
          max-sm:w-full max-sm:h-screen 
          max-sm:max-w-full max-sm:max-h-screen
          max-sm:rounded-none max-sm:m-0
          max-sm:absolute max-sm:top-0 max-sm:left-0 
          max-sm:right-0 max-sm:bottom-0
          max-sm:translate-x-0 max-sm:translate-y-0
        "
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
        <div className="flex justify-between items-center">
          <p></p>
          <button
            onClick={closeDialog}
            className="outline-none border-none bg-transparent text-gray-500 dark:text-gray-400 text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div>{elements}</div>
      </dialog>
    </div>
  );
}
