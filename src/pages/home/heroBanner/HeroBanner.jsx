import { useState, useRef, useEffect }from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import { useSelector } from "react-redux"
import Img from "../../../components/lazyLoadImage/Img"
import  ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import "./style.scss"

const HeroBanner = () => {
  const [background, setBackground] = useState("")
  const searchInputRef = useRef("")
  const navigate = useNavigate()
  const { url } = useSelector(state => state.home)
  const {data, loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)].backdrop_path
    setBackground(bg)
  },[data, url])

  const searchQueryHandler = (event) => {
    const query = searchInputRef.current.value
    if(event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  const searchQueryButtonHandler = () => {
    const query = searchInputRef.current.value
    if(query.length > 0) {
      navigate(`search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, Tv shows people to discover. Explore now.</span>
          <div className="searchInput">
            <input 
              type="text"  
              placeholder="Search for a movie or tv show..."
              ref={searchInputRef}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryButtonHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner