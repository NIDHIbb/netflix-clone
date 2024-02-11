import { useState } from "react"
import { useLocation } from "react-router-dom"
import './Banner.css'
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom'

    const Movie = ()=>{
    const [trailer,setTrailer]=useState([])
    const navigate =useNavigate()

    const[cast,setCast]=useState([])
    const location=useLocation()
    const specificMovie=location.state.movie
    const baseUrl ="https://image.tmdb.org/t/p/original/";

    function fetchTrailer(id){
        fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=97b8b149865c97daeca60e4713a3dffa`)
        .then(res=>res.json())
        .then(d=>setTrailer(d.results[0].key))
    }

    function fetchCast(id){
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=97b8b149865c97daeca60e4713a3dffa`)
        .then(res=>res.json())
        .then(d=>setCast(d.cast))
        
    }

    const opts = {
        height: '390',
        width: '100%',
       
        }

  return (
    <div className="Movie">
       <div className='banner'   
    style={{
        backgroundImage:`Url(${baseUrl}${specificMovie.backdrop_path})`,
        height:'80vh',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center-center',
    }}
    >
    <div  className='banner__contents'>
        
            <h1 className="banner__title">{specificMovie.name || specificMovie.original_title || specificMovie.original_name}</h1>
    
            <div className='banner__buttons'>
                <button className='banner__button' onClick={fetchTrailer(specificMovie.id)}>Play</button>
                <button className='banner__button' onClick={fetchCast(specificMovie.id)}>Cast</button>
            </div>
            <h1 className='banner__description'>{specificMovie.overview}</h1>
        </div>
    </div>
    <div className="cast" style={{textAlign:'center'}}>
    <h1>Cast</h1>
    {
        cast.slice(0,10).map((movie)=>{
            return(
                <img onClick={()=>{navigate('/cast',{state:{movie}})}} style={{margin:'10px',borderRadius:'50%'}} key={movie.id} height={'100px'} src={`${baseUrl}${movie.profile_path}`}/>
            )
        })
    }
    </div>
    {trailer && <YouTube videoId={trailer} opts={opts}/>}
    </div>
  )
}

export default Movie
