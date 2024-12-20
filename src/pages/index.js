import Header from "../components/header/header";
import List from "@/components/list/list";
import { useState } from "react";

export default function Home() {
  const [itensUrl, setItensUrl] = useState([]);

  const addItem = (url) => {
    if (itensUrl.includes(url)) {
      alert("Esta imagem já foi adicionada à lista!");
    } else {
      setItensUrl((prevItens) => [...prevItens, url]);
    }
  };

  return (
    <div>
      <Header addItem={addItem} />
      <List itensUrl={itensUrl} setItensUrl={setItensUrl} />
    </div>
  );
}
