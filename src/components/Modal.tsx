import ReactDOM from "react-dom";
import type { ModalProps } from "../types";

function Modal({ children, onClose, theme }: ModalProps) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 z-10 flex items-start justify-center pt-10">
      <div className={`relative w-[90%] md:w-[70%] lg:w-[40%] min-h-[50vh] ${theme==='light'?'bg-white':'bg-gray-900 text-gray-50'}  rounded-xl p-5`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 font-semibold hover:text-red-800"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}

export default Modal;
