export default function Li({ liData, onDelete }) {
  return (
    <li className="mt-8">
      <img
        className="rounded-xl movie-poster max-w-[207px]"
        alt="Poster do Filme."
        src={liData}
      />
      <div>
        <button
          className="border-2 flex shadow-lg shadow-black rounded-xl mt-2 border-[#ff0000] bg-slate-950 hover:bg-gray-50 text-gray-50 hover:text-gray-800 text-xl font-bold px-16 w-[207px]"
          onClick={onDelete}
        >
          <div className="ml-[-10px]">Remove</div>
          <img src="/Icons/trash.png" alt="Trash Icon" className="w-6 ml-2" />
        </button>
      </div>
    </li>
  );
}
