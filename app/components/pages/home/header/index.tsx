'use client'

import { fetchApi } from '@/app/utils/fetchApi'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { Modal, MovieData } from '@/app/components/modal/modal'
import { motion } from 'framer-motion'
import { MovieList, SetMovieList } from '@/app/types/movie-list'
import { ButtonLoad } from '@/app/components/button/loadButton'

export type MovieListProps = {
  movieList: MovieList
  setMovieList: SetMovieList
}
export const Header = ({ movieList, setMovieList }: MovieListProps) => {
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputYearValue, setInputYearValue] = useState('')
  const [movieData, setMovieData] = useState<MovieData>({
    Title: '',
    Year: '',
    Genre: '',
    Actors: '',
    Plot: '',
    Poster: '',
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const handleClick = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  const handleSearch = async () => {
    if (!inputNameValue) {
      toast.error('Por favor, insira um nome de filme!')
      return
    }
    try {
      const movieDataReturn = await fetchApi({
        title: inputNameValue,
        year: inputYearValue,
      })
      if (movieDataReturn.Response === 'False') {
        toast.error('Filme não encontrado')
        return
      }
      setInputYearValue('')
      setInputNameValue('')

      setMovieData(movieDataReturn)
      setOpen(true)

      console.log('Filme encontrado:', movieDataReturn)
    } catch (error) {
      console.error('Erro ao buscar o filme:', error)
      toast.error('Erro ao buscar o filme. Tente novamente!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="left-0 top-0 max-w-screen h-[12vh] 2xl:h-[9vh] bg-gray-900 shadow-sm backdrop-blur-sm flex items-center transition-colors justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            width={160}
            height={100}
            style={{
              width:
                windowWidth >= 3800
                  ? '480px'
                  : windowWidth >= 2060
                  ? '320px'
                  : '160px',
              height:
                windowWidth >= 3800
                  ? '300px'
                  : windowWidth >= 2060
                  ? '200px'
                  : '311.5px',
            }}
            sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, (max-width: 1280px) 160px, (max-width: 1536px) 180px, 200px"
            className="w-[130px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px] h-auto"
            src="/images/logo.svg"
            alt="Logo"
          />
        </motion.div>
        <div className="flex flex-rows gap-[5vw] md:gap-[3vw] lg:gap-[2vw] px-[3vw]">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute inset-0 bg-emerald-700 opacity-50 rounded-[5vw] lg:rounded-[2vw]  h-[7vh] 2xl:h-[5vh] -z-10"
            />
            <motion.input
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              placeholder="Nome"
              className="text-gray-300 placeholder-gray-400 bg-transparent border border-emerald-400  p-3  h-[7vh] 2xl:h-[5vh] w-[22vw] rounded-[5vw] lg:rounded-[2vw] 2xl:text-[1vw] focus:outline-none focus:ring-2 ring-emerald-700"
              value={inputNameValue}
              onChange={(e) => setInputNameValue(e.target.value)}
            />
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute inset-0 bg-emerald-700 opacity-50 h-[7vh] 2xl:h-[5vh] rounded-[5vw] lg:rounded-[2vw] -z-10"
            />
            <motion.input
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              placeholder="Ano"
              className="p-3 h-[7vh] 2xl:h-[5vh] w-[17vw] md:w-[10vw] focus:w-[24vw] md:focus:w-[10vw]  text-gray-300 placeholder-gray-400 bg-transparent border border-emerald-400 rounded-[5vw] lg:rounded-[2vw] 2xl:text-[1vw] focus:outline-none focus:ring-2 ring-emerald-700"
              value={inputYearValue}
              onChange={(e) => setInputYearValue(e.target.value)}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ButtonLoad
              className="h-[7vh] 2xl:h-[5vh] rounded-[5vw] lg:rounded-[2vw] shadow-button 2xl:text-[1vw]"
              onClick={() => {
                handleSearch()
                setTimeout(() => {
                  handleClick()
                }, 1000)
              }}
              loading={loading}
            >
              <FaSearch width={50} height={50} />
            </ButtonLoad>
          </motion.div>
        </div>
      </header>
      <Modal
        open={open}
        setOpen={setOpen}
        movieData={movieData}
        movieList={movieList}
        setMovieList={setMovieList}
      />
    </motion.div>
  )
}
