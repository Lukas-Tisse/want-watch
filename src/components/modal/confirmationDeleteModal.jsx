export default function ConfirmationDeleteModal({ open, onClose, onConfirm }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all relative
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to remove this movie?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-[#ff0000] shadow-xl scale-100 p-2 rounded-xl w-full"
              onClick={onConfirm}
            >
              Remove
            </button>
            <button
              className="btn btn-light shadow-2xl text-gray-500 w-full p-2 rounded-xl"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
