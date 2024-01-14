import Container from "../genericComponents/container/Container";
import { FaDumbbell, FaUserCircle } from 'react-icons/fa';
import './Home.css';
import AppBar from "../genericComponents/appBar/AppBar";
import BottomBar from "../genericComponents/bottomBar/BottomBar";
import { useState } from "react";
import Notice from "../genericComponents/notice/Notice";
import StateBar from "../genericComponents/stateBar/StateBar";

function Home(){
    const username=localStorage.getItem("username");
    const [isNoticeShow,setIsNoticeShow]=useState(false);
    const [noticeText,setNoticeText]=useState("");

    return(
        <Container>
            <AppBar/>

            <StateBar name="Home"/>
            
            <div className="welcomeTextContainer">
                <div className="welcomeText">Benvenuto {username}</div>
                <FaDumbbell style={{marginLeft:"20px"}}/>
            </div>
            
            <Notice show={isNoticeShow} text={noticeText}></Notice>

            <BottomBar setNoticeShow={setIsNoticeShow} setNoticeText={setNoticeText}/>
        </Container>
    );
}

export default Home;