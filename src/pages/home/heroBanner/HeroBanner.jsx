import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImg/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "./style.scss"

const HeroBanner = () => {

  const [background, setBackground] = useState();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("movie/upcoming");

  useEffect(() => {
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data])  // eslint-disable-line react-hooks/exhaustive-deps

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }
  return (

    <div className='heroBanner'>
      {!loading && <div className="background-img">
        <Img src={background} />
      </div>}

      <div className="opacity-layer"></div>
      <ContentWrapper>  
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder="Search for a movie or tv show...." />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner