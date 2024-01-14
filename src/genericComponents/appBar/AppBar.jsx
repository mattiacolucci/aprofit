import { FaUserCircle } from "react-icons/fa";
import './AppBar.css';
import { useNavigate } from "react-router-dom";

function AppBar(props){
    const navigate=useNavigate();

    const goUsername=()=>{
        navigate("/profile");
    }

    return(
        <div className="appBar">
            <div className="appBarTitle" onClick={()=>navigate("/")}>AProFit</div>
            <div className="appBarIconContainer" style={{...(props.userProfileActive && {background:"rgb(255, 150, 69)"})}}>
                <FaUserCircle size={40} onClick={goUsername}/>
            </div>
        </div>
    )
}

export default AppBar;