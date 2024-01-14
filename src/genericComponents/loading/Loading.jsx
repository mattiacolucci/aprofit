import './Loading.css';
import loadingImage from "../../../public/images/loading.gif";

const Loading=(props)=>{
    return(
        <div className='loading'>
            <img src={loadingImage} className='loadingGif'></img>
        </div>
    );
}

export default Loading;