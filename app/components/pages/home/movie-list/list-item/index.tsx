import { ConfirmationDeleteModal } from '@/app/components/modal/confirmationDeleteModal'
import {
  ListItem as ListItemType,
  MovieList,
  SetMovieList,
} from '@/app/types/movie-list'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

type ListItemProps = {
  item: ListItemType
  index: number
  movieList: MovieList
  setMovieList: SetMovieList
}

export const ListItem = ({
  item,
  index,
  movieList,
  setMovieList,
}: ListItemProps) => {
  const [open, setOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const removeItem = () => {
    setOpen(true)
  }

  return (
    <li className="flex flex-col gap-[1vh] items-center justify-center p-[2vw] ">
      <Image
        src={item}
        alt="Poster do filme"
        width={210}
        height={311.5}
        style={{
          width:
            windowWidth >= 3800
              ? '570px'
              : windowWidth >= 2060
              ? '465px'
              : '210px',
          height:
            windowWidth >= 3800
              ? '777.5px'
              : windowWidth >= 2060
              ? '623px'
              : '311.5px',
        }}
        className="rounded-xl"
      />
      <button
        className="flex flex-row gap-[0.5vw] w-full py-[1vh] bg-red-600 shadow-deleteButton rounded-xl items-center justify-center border border-red-600 2xl:text-[1vw]"
        onClick={() => {
          removeItem()
        }}
      >
        <div>Remover</div>
        <FaTrashAlt width={40} height={40} />
      </button>
      <ConfirmationDeleteModal
        open={open}
        setOpen={setOpen}
        index={index}
        movieList={movieList}
        setMovieList={setMovieList}
      />
    </li>
  )
}
