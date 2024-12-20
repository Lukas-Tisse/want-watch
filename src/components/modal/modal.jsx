export default function Modal({ open, onClose, movieData, children }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/60 backdrop-blur-[2px] " : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white max-w-lg rounded-xl shadow transition-all my-15 border-x-4 border-black
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="flex flex-col text-center">
          <div className="movie-title  text-xl text-center border-y-4 border-black text-black font-bold">
            {`${movieData.Title} - ${movieData.Year}`}
          </div>

          <div className="flex flex-row text-slate-950">
            <img
              className="movie-poster max-w-90"
              src={movieData.Poster}
              alt="Poster do Filme."
            />

            <div className="flex flex-col justify-around gap-4">
              <div>
                <h2 className="text-black font-bold">Plot:</h2>
                <h3 className="movie-plot">{movieData.Plot}</h3>
              </div>

              <div className="movie-cast">
                <h4 className="text-black font-bold">Elenco:</h4>
                <h5>{movieData.Actors}</h5>
              </div>

              <div className="movie-genre">
                <h4 className="text-black font-bold">Gênero:</h4>
                <h5>{movieData.Genre}</h5>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute border-black right-2 mt-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
