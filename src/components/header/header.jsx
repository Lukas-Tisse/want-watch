import Modal from "../modal/modal";
import { requestAPI } from "../modal/request.mjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "react-bootstrap-icons";
import { Film } from "react-bootstrap-icons";
import { useState } from "react";

export default function Header({ addItem }) {
  const [open, setOpen] = useState(false);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputYearValue, setInputYearValue] = useState("");

  const [movieData, setMovieData] = useState({
    Title: "",
    Year: "",
    Plot: "",
    Actors: "",
    Genre: "",
    Poster: "",
  });

  const validateAndSubmit = async () => {
    if (inputNameValue.trim() === "") {
      alert("This text field cannot be empty!");
      return;
    }
    try {
      const responseBody = await requestAPI(inputNameValue, inputYearValue);
      if (responseBody.Response === "True") {
        setMovieData({
          Title: responseBody.Title,
          Year: responseBody.Year,
          Plot: responseBody.Plot,
          Actors: responseBody.Actors,
          Genre: responseBody.Genre,
          Poster: responseBody.Poster,
        });
        setOpen(true);
      } else {
        alert("Filme não encontrado!");
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("An error occurred while retrieving the movie data");
    }
  };

  return (
    <header className="flex h-14 bg-slate-800 justify-between">
      <div className="w-1/2 flex items-center justify-start ms-3">
        <Film className="text-2xl" />
        <h1 className="font-black text-lg">WantWatch</h1>
      </div>
      <div className="w-1/2 flex w-full items-center justify-end space-x-2">
        <Input
          className="rounded-xl max-w-96 bg-gray-50 hover:bg-black text-black hover:text-gray-50 drop-shadow-2xl"
          placeholder="Name"
          value={inputNameValue}
          onChange={(e) => setInputNameValue(e.target.value)}
        />
        <Input
          className="custom-number-input rounded-xl max-w-32 bg-gray-50 hover:bg-black text-black hover:text-gray-50 drop-shadow-2xl"
          placeholder="Year"
          type="number"
          value={inputYearValue}
          onChange={(e) => setInputYearValue(e.target.value)}
        />
        <Button
          type="submit"
          className="rounded-xl bg-slate-800 hover:bg-black text-black text-gray-50 shadow-none"
          onClick={validateAndSubmit}
        >
          <Search />
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} movieData={movieData}>
        <button
          onClick={() => {
            addItem(movieData.Poster);
            setOpen(false); // Fecha o modal após adicionar
          }}
          className="border-2 shadow-lg shadow-black rounded-xl m-2 border-black bg-gray-50 hover:bg-black text-black hover:text-gray-50 text-gray-800 text-lg font-bold"
        >
          Add to list
        </button>
      </Modal>
    </header>
  );
}
