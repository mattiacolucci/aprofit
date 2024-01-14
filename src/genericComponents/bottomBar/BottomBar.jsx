import { FaFlag, FaGraduationCap, FaPenSquare, FaPlay } from 'react-icons/fa';
import { FaMapLocation } from "react-icons/fa6";
import './BottomBar.css';
import showNotice from '../../controllers/noticeController';

function BottomBar(props){
    const goItem=()=>{
        showNotice(props.setNoticeShow,props.setNoticeText,"Funzionalità Non Disponibile");
    }

    return(
        <div className='bottomBarContainer'>
            <FaGraduationCap style={{cursor:"pointer"}} title='Impara' onClick={goItem}/>
            <FaFlag style={{cursor:"pointer"}} title='Obiettivi' onClick={goItem}/>
            <FaPlay style={{cursor:"pointer"}} title='Avvia Allenamento' onClick={goItem}/>
            <FaPenSquare style={{cursor:"pointer"}}  title='Routine' onClick={goItem}/>
            <FaMapLocation style={{cursor:"pointer"}} title='Palestre' onClick={goItem}/>
        </div>
    )
}

export default BottomBar;