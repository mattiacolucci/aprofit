import { useEffect, useState } from "react";
import AppBar from "../genericComponents/appBar/AppBar";
import Container from "../genericComponents/container/Container";
import './UserProfile.css';
import Loading from "../genericComponents/loading/Loading";
import Notice from "../genericComponents/notice/Notice";
import constantData from "../constantData";
import { useNavigate } from "react-router-dom";
import showNotice from "../controllers/noticeController";
import BottomBar from "../genericComponents/bottomBar/BottomBar";
import StateBar from "../genericComponents/stateBar/StateBar";

function UserProfile(){
    const navigate=useNavigate();
    const username=localStorage.getItem("username");
    const [newUsername,setUsername]=useState(username);
    const [email,setEmail]=useState("");
    const [nome,setNome]=useState("");
    const [cognome,setCognome]=useState("");
    const [eta,setEta]=useState("");
    const [peso,setPeso]=useState("");
    const [altezza,setAltezza]=useState("");
    const [isLoading,setLoading]=useState(false);
    const [isNoticeShow,setIsNoticeShow]=useState(false);
    const [noticeText,setNoticeText]=useState("");


    const getUserData=async()=>{
        const response=await fetch(
			constantData.domainApiName+"/getUserData",
			{
				method: 'POST',
				mode:'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "username="+username
			}
		);
		var data=await response.json();
		return [data,(response.status==200)?true:false];
    }

    const editUserData=async()=>{
        const response=await fetch(
			constantData.domainApiName+"/editUserData",
			{
				method: 'POST',
				mode:'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "username="+username+"&nome="+nome+"&cognome="+cognome+"&eta="+eta+"&email="+email+"&peso="+peso+"&altezza="+altezza+"&newUsername="+newUsername
			}
		);
		var data=await response.json();
		return [data.message,(response.status==200)?true:false];
    }

    useEffect(()=>{

        const fetchData=async()=>{
            setLoading(true);
            const [data,response]=await getUserData();
            if(response){
                setEmail(data.email);
                setNome(data.nome);
                setCognome(data.cognome);
                setEta(data.eta);
                setAltezza(data.altezza);
                setPeso(data.peso);
            }else{
                showNotice(setIsNoticeShow,setNoticeText,data.message);  //mostro la notice
            }
            setLoading(false);
        }

        fetchData();
    },[])

    const editPassword=()=>{
        navigate("/editPassword");
    }

    const logout=()=>{
        localStorage.removeItem("username");
        navigate("/login");
    }

    const saveData=async()=>{
        try{
            setLoading(true);
            const [message,response]=await editUserData();
            if(response){
                if(newUsername!=localStorage.getItem("username")){
                    localStorage.setItem("username",newUsername);
                }
            }
            showNotice(setIsNoticeShow,setNoticeText,message);  //mostro la notice
        }catch(e){
            showNotice(setIsNoticeShow,setNoticeText,e.message);  //mostro la notice
        }
        setLoading(false);
    }

    return(
        <>
        <Container>
            <AppBar userProfileActive={true}/>

            <StateBar name="Profilo Utente"/>

            <div className="userDataContainer">
                <div className="userDataItemTitle2">Dati Facoltativi</div>

                <div className="flexboxBreak"></div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Username</div>
                    <input type="text" name="username" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={newUsername} onChange={e=>setUsername(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Nome</div>
                    <input type="text" name="name" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={nome} onChange={e=>setNome(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Cognome</div>
                    <input type="text" name="surname" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={cognome} onChange={e=>setCognome(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Email</div>
                    <input type="text" name="email" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={email} onChange={e=>setEmail(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Eta</div>
                    <input type="text" name="address" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={eta} onChange={e=>setEta(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Peso (kg)</div>
                    <input type="text" name="weight" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={peso} onChange={e=>setPeso(e.target.value)}></input>
                </div>

                <div className="userDataItemContainer">
                    <div className="userDataItemTitle">Altezza (cm)</div>
                    <input type="text" name="height" className="userDataItemText" style={{border:0,fontSize:"20px"}} value={altezza} onChange={e=>setAltezza(e.target.value)}></input>
                </div>

                <div className="flexboxBreak"></div>

                <button className="userDataItemButton" onClick={saveData}>Salva I Dati</button>
                <button className="userDataItemButton" onClick={editPassword}>Modifica Password</button>
                <button className="userDataItemButton" onClick={logout} style={{background:"orangered"}}>Esci</button>
            </div>

            <Notice show={isNoticeShow} text={noticeText}></Notice>

            <BottomBar setNoticeShow={setIsNoticeShow} setNoticeText={setNoticeText}/>
        </Container>
        {isLoading && <Loading/>}
        </>
    );
}

export default UserProfile;