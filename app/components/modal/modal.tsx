'use client'

import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '../button'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { Dispatch, SetStateAction } from 'react'
import {
  MovieList,
  SetMovieList,
  MovieApiResponse,
} from '@/app/types/movie-list'

export type MovieData = Pick<
  MovieApiResponse,
  'Title' | 'Year' | 'Genre' | 'Actors' | 'Plot' | 'Poster'
>

type ModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  movieData: MovieData
  movieList: MovieList
  setMovieList: SetMovieList
}

export const Modal = ({
  open,
  setOpen,
  movieData,
  movieList,
  setMovieList,
}: ModalProps) => {
  if (!open) return null

  const addMovie = (poster: string) => {
    const control: any = [...movieList, poster]
    setMovieList(control)
    setOpen(false)
    toast.success('Filme adicionado a sua lista!')
  }

  const textVariantsTitle = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.02 },
    }),
  }
  const textVariantsParagraph = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.01 },
    }),
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-[clamp(300px,80vw,1400px)] max-h-[90vh] bg-gray-900/90 text-white rounded-2xl shadow-lg shadow-indigo-500/50 p-4 md:p-6 flex flex-col lg:flex-row items-center lg:items-stretch overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center">
          <Image
            src={movieData.Poster}
            alt={movieData.Title}
            width={330}
            height={445}
            className="w-auto h-[70vh] max-w-[clamp(200px,35vw,600px)] max-h-[clamp(300px,60vh,1000px)] object-cover rounded-lg shadow-xl border border-gray-700"
          />
        </div>

        <div className="relative ml-0 lg:ml-6 mt-4 lg:mt-0 flex flex-col flex-1">
          <motion.h2
            className="text-xl lg:text-3xl font-bold text-white drop-shadow-lg"
            initial="hidden"
            animate="visible"
          >
            {`${movieData.Title} - ${movieData.Year}`
              .split('')
              .map((char: string, index: number) => (
                <motion.span
                  key={index}
                  variants={textVariantsTitle}
                  custom={index}
                >
                  {char}
                </motion.span>
              ))}
          </motion.h2>
          <p className="text-indigo-400 text-sm lg:text-lg mt-1">
            {movieData.Genre}
          </p>
          <motion.p
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-sm lg:text-base mt-4"
            transition={{ delayChildren: 6 }}
          >
            {movieData.Plot.split('').map((char: string, index: number) => (
              <motion.span
                key={index}
                variants={textVariantsParagraph}
                custom={index}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          <p className="text-gray-400 text-sm lg:text-base mt-4">
            <span className="text-indigo-300 font-semibold">Atores:</span>{' '}
            {movieData.Actors}
          </p>

          <div className="flex justify-center mt-[5vh] md:mt-[12vh]">
            <Button
              className="shadow-button w-[75vw] lg:w-[25vw] font-mono gap-[1vw]"
              onClick={() => addMovie(movieData.Poster)}
            >
              Adicionar na lista
              <IoMdAddCircleOutline className="w-[28px] h-auto" />
            </Button>
          </div>
        </div>

        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          onClick={() => setOpen(false)}
        >
          ✖
        </button>
      </div>
    </motion.div>
  )
}
