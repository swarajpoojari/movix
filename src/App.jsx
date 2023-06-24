import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { fetchDataFromApi } from './utils/api'
import './App.css'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'

import Header1 from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {

  const { url } = useSelector((state) => state.home)
  console.log(url)
  const dispatch = useDispatch();

  // const dependecyArray = [fetchApiConfig(), genresCall()]

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const fetchApiConfig = () => {
    fetchDataFromApi('configuration')
      .then((res) => {
        console.log(res);
        const imageUrl = {
          backdrop: res.images.base_url + "original",
          poster: res.images.base_url + "original",
          profile: res.images.base_url + "original"
        }
        dispatch(getApiConfiguration(imageUrl));
      })
  }

  const genresCall = async() => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    console.log(data)
    data.map(({genres})=> {
      return genres.map((item)=> {allGenres[item.id] = item});
    })
    dispatch(getGenres(allGenres))
  }

  return (<BrowserRouter>
    <Header1 />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:mediaType/:id' element={<Details />} />
      <Route path='/search/:query' element={<SearchResult />} />
      <Route path='/explore/:mediaType' element={<Explore />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>)
}

export default App;
