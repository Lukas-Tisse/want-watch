import { useState } from "react";
import Li from "./li";
import ConfirmationDeleteModal from "../modal/confirmationDeleteModal";
import AlertModal from "../modal/alertModal";

export default function List({ itensUrl, setItensUrl }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const confirmDelete = (url) => {
    setItemToDelete(url);
    setModalOpen(true);
  };

  const deleteItem = () => {
    setItensUrl((prevItens) =>
      prevItens.filter((item) => item !== itemToDelete)
    );
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itensUrl.map((url, index) => (
          <Li key={index} liData={url} onDelete={() => confirmDelete(url)} />
        ))}
      </ul>

      {/* Modal de Confirmação de Remoção */}
      <ConfirmationDeleteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteItem}
      />

      {/* Modal de Alerta de Duplicação */}
      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        message="Esta imagem já foi adicionada à lista!"
      />
    </div>
  );
}
