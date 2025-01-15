// import { useRef } from "react"

import { MdCancel } from "react-icons/md";

type ModalConfirmationProps = {
  triggerModal: (action: boolean) => void;
  dialogRef:  React.MutableRefObject<HTMLDialogElement | undefined>;
}
export default function ModalConfirmation({ dialogRef, triggerModal }: ModalConfirmationProps) {

  return (
    <dialog 
    ref={dialogRef as React.LegacyRef<HTMLDialogElement>}
    className='relative flex items-center flex-col gap-5'
    >
      <span>Delete chapter?</span>

      <MdCancel 
      onClick={() => triggerModal(false)}
      className={``}
      />

      <div className="flex items-center gap-4">
        <button
        onClick={() => triggerModal(false)}
        className="border focus:outline-none focus:ring-0 active:scale-[1.02] shadow rounded-sm"
        >
          No
        </button>
        <button
        className="border focus:outline-none focus:ring-0 active:scale-[1.02] shadow rounded-sm"
        >
          Yes
        </button>
      </div>
    </dialog>
  )
}