'use client'

import { useState } from 'react'
import { Header } from './components/pages/home/header'
import { MovieList } from './components/pages/home/movie-list'
import { ListItem } from './types/movie-list'

export default function Home() {
  const [movieList, setMovieList] = useState<ListItem[]>([])

  return (
    <div className="h-full">
      <Header movieList={movieList} setMovieList={setMovieList} />
      <MovieList movieList={movieList} setMovieList={setMovieList} />
    </div>
  )
}
