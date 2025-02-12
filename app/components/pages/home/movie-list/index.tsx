import { motion } from 'framer-motion'
import { ListItem } from './list-item'
import { useEffect } from 'react'
import {
  MovieList as MovieListType,
  SetMovieList,
} from '@/app/types/movie-list'
type ListProps = {
  movieList: MovieListType
  setMovieList: SetMovieList
}

export const MovieList = ({ movieList, setMovieList }: ListProps) => {
  useEffect(() => {
    const savedItens = localStorage.getItem('filmes')
    if (savedItens) {
      setMovieList(JSON.parse(savedItens))
    }
  }, [setMovieList])

  useEffect(() => {
    localStorage.setItem('filmes', JSON.stringify(movieList))
  }, [movieList])

  return (
    <div className="w-full min-h-screen bg-hero-image bg-cover bg-center bg-no-repeat flex justify-center pb-10 pt-[5vh]">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {movieList.map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
            >
              <ListItem
                item={item}
                movieList={movieList}
                setMovieList={setMovieList}
                index={index}
              />
            </motion.div>
          )
        })}
      </ul>
    </div>
  )
}
