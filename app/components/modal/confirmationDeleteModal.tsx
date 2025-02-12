'use client'

import { IoMdWarning } from 'react-icons/io'
import { Button } from '../button'
import { AnimatePresence } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import { MovieList, SetMovieList } from '@/app/types/movie-list'

type ConfirmationDeleteModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  movieList: MovieList
  setMovieList: SetMovieList
  index: number
}

export const ConfirmationDeleteModal = ({
  open,
  setOpen,
  movieList,
  setMovieList,
  index,
}: ConfirmationDeleteModalProps) => {
  if (!open) return null

  const removeItem = (indexToRemove: number) => {
    setMovieList((movieList) => movieList.filter((_, i) => i !== indexToRemove))
    setOpen(false)
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      >
        <div
          className="w-[clamp(300px,90vw,600px)] bg-gray-900/90 text-white rounded-2xl shadow-lg shadow-red-500/50 p-6 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <IoMdWarning className="text-red-500 w-16 h-16 mb-4" />

          <h2 className="text-xl font-bold">Tem certeza?</h2>
          <p className="text-gray-300 text-center mt-2">
            Essa ação não pode ser desfeita. Deseja excluir este item?
          </p>

          <div className="flex justify-between w-full mt-6">
            <Button
              className="shadow-button bg-gray-700 hover:bg-gray-600 text-white w-1/2 mr-2"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="shadow-button bg-red-600 hover:bg-red-500 text-white w-1/2 ml-2"
              onClick={() => {
                removeItem(index)
                setOpen(false)
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}
