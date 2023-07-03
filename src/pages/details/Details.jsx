import React, { useEffect } from 'react'
import "./style.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from '../carousels/Similar'
import Recommendation from '../carousels/Recommendation'


const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: credistLoading } = useFetch(`/${mediaType}/${id}/credits`)
  
  // const officialTrailer = data?.filter(v => v.name === "Official Trailer")


  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={credistLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id }/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details