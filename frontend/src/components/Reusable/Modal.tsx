import { BoltIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { act, useState } from "react";

const ConfirmationModal = ({
  open,
  onConfirm,
  onCancel,
  title,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) => {
  if (!open) return <></>;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-2/4 border border-slate-800">
        <div className="flex justify-between border-b bg-blue-600 px-2 py-2">
          <div className="w-6 h-6 text-white">
            <TrashIcon />
          </div>
          <div className="text-xl text-white font-semibold">Delete Note</div>
          <div
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => onCancel()}
          >
            <XMarkIcon />
          </div>
        </div>
        <div className="flex items-center justify-center h-30">
          Do you want to delete{" "}
          <span className="font-semibold px-2">{title}</span>?
        </div>
        <div className="flex justify-end gap-2 h-13 px-2">
          <button
            className="flex gap-1 items-center border border-blue-500 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-600"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="group flex gap-1 items-center bg-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-white hover:text-blue-500"
            onClick={() => onConfirm()}
          >
            <TrashIcon className="w-6 h-6 text-white group-hover:text-blue-500" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AIModal = ({
  open,
  onConfirm,
  onCancel,
  content,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content: string;
}) => {
  const [aiAction, setAIAction] = useState<string>("");
  function chooseAction(action: string) {
    setAIAction(action);
  }
  function onApply() {}
  if (!open) return <></>;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-2/4 border border-slate-800">
        <div className="flex justify-between border-b bg-blue-600 px-2 py-2">
          <div className="w-6 h-6 text-white">
            <BoltIcon />
          </div>
          <div className="text-xl text-white font-semibold">
            What should AI do?
          </div>
          <div
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => onCancel()}
          >
            <XMarkIcon />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4 h-30 place-items-center">
          <button
            className={` ${aiAction === "Summarize" && "bg-blue-800 border-white"} flex gap-1 py-3 w-[10rem] justify-center items-center border border-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-800`}
            onClick={() => chooseAction("Summarize")}
          >
            Summarize
          </button>
          <button
            className={` ${aiAction === "Improve" && "bg-blue-800 border-white"} flex gap-1 py-3 w-[10rem] justify-center items-center border border-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-800`}
            onClick={() => chooseAction("Improve")}
          >
            Improve
          </button>
          <button
            className={` ${aiAction === "Explain" && "bg-blue-800 border-white"} flex gap-1 py-3 w-[10rem] justify-center items-center border border-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-800`}
            onClick={() => chooseAction("Explain")}
          >
            Explain
          </button>
          <button
            className={` ${aiAction === "Generate Title" && "bg-blue-800 border-white"} flex gap-1 py-3 w-[10rem] justify-center items-center border border-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-800`}
            onClick={() => chooseAction("Generate Title")}
          >
            Generate Title
          </button>
        </div>
        <div className="flex justify-end gap-2 h-13 px-2 mt-16">
          <button
            className="flex gap-1 items-center border border-blue-500 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-600"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="group flex gap-1 items-center bg-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-blue-800"
            onClick={() => onApply()}
          >
            Apply AI
          </button>
        </div>
      </div>
    </div>
  );
};
export { ConfirmationModal, AIModal };
