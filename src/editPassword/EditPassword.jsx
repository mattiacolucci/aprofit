import { useRef, useState } from 'react';
import AppBar from '../genericComponents/appBar/AppBar';
import Container from '../genericComponents/container/Container';
import './EditPassword.css';
import constantData from '../constantData';
import showNotice from '../controllers/noticeController';
import Notice from '../genericComponents/notice/Notice';
import { useNavigate } from 'react-router-dom';
import Loading from '../genericComponents/loading/Loading';
import BottomBar from '../genericComponents/bottomBar/BottomBar';
import StateBar from '../genericComponents/stateBar/StateBar';
import PasswordPopUp from '../genericComponents/passwordPopUp/PasswordPopUp';
import { FaCheckCircle, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa';

function EditPassword(){
    const username=localStorage.getItem("username");
    const navigate=useNavigate();
    const actualPasswordRef=useRef();
    const newPasswordRef=useRef();
    const [passwordActual,setPasswordActual]=useState("");
    const [passwordNew,setPasswordNew]=useState("");
    const [isNoticeShow,setIsNoticeShow]=useState(false);
    const [noticeText,setNoticeText]=useState("");
    const [passwMatchRegEx,setPasswMatchRegEx]=useState(false);
    const [showPasswordPopUp,setShowPasswordPopUp]=useState(false);
    const [isLoading,setLoading]=useState(false);

    const changePasswordRequest=async()=>{
        const response=await fetch(
			constantData.domainApiName+"/editPassword",
			{
				method: 'POST',
				mode:'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "username="+username+"&actualPassword="+passwordActual+"&newPassword="+passwordNew
			}
		);
		var data=await response.json();
		return [data.message,(response.status==200)?true:false];
    }

    const changePassword=async()=>{
        setLoading(true);
        try{
            if(passwordActual!="" && passwordNew!=""){
                if(/(?=.*[A-Z])/.test(passwordNew) && /(?=.{7,40}$)/.test(passwordNew) && /(?=.*[0-9])/.test(passwordNew)){
                    const [message,response]=await changePasswordRequest();
                    if(response){
                        showNotice(setIsNoticeShow,setNoticeText,"Password Modificata Correttamente!",()=>navigate("/profile"));  //mostro la notice
                    }else{
                        if(message=="Password Attuale Errata"){
                            showNotice(setIsNoticeShow,setNoticeText,message,()=>{
                                actualPasswordRef.current.focus();
                                actualPasswordRef.current.classList.add("scaleAni");
                                setTimeout(()=>actualPasswordRef.current.classList.remove("scaleAni"),800);
                            });  //mostro la notice
                        }else{
                            showNotice(setIsNoticeShow,setNoticeText,message);  //mostro la notice
                        }
                    }
                }else{
                    showNotice(setIsNoticeShow,setNoticeText,"La Nuova Password Non Rispetta I Criteri",()=>{
                        newPasswordRef.current.focus();
                        newPasswordRef.current.classList.add("scaleAni");
                        setTimeout(()=>newPasswordRef.current.classList.remove("scaleAni"),800);
                    });  //mostro la notice
                }
            }else{
                showNotice(setIsNoticeShow,setNoticeText,"Riempi Tutti I Campi");  //mostro la notice
            }
        }catch(e){
            showNotice(setIsNoticeShow,setNoticeText,e.message);  //mostro la notice
        } 
        setLoading(false);
    }

    const checkSingePasswChar=(e)=>{
		setPasswordNew(e.target.value)
		if(/(?=.*[A-Z])/.test(e.target.value) && /(?=.{7,40}$)/.test(e.target.value) && /(?=.*[0-9])/.test(e.target.value)){
			setPasswMatchRegEx(true);
		}else{
			setPasswMatchRegEx(false);
		}
	}

    return(
        <>
        <Container>
            <AppBar userProfileActive={true}/>
            <StateBar name="Profilo Utente"/>
            <div className="userDataContainerEditPassword">
                <div className='itemTitleEditPassw'>Inserisci Password Attuale</div>
                <input type='password' ref={actualPasswordRef} className='userDataItemText' value={passwordActual} onChange={e=>setPasswordActual(e.target.value)} style={{borderRadius:"10px",border:0,fontSize:"20px"}}></input>
                <div className='itemTitleEditPassw' style={{marginTop:"30px"}}>Inserisci Nuova Password</div>
                <input type='password' ref={newPasswordRef} className='userDataItemText' value={passwordNew} onChange={e=>checkSingePasswChar(e)} style={{borderRadius:"10px",border:0,fontSize:"20px"}}></input>

                {!passwMatchRegEx && passwordNew!="" &&
				<div className='passwResponseContainer' style={{color:"red"}} onClick={()=>setShowPasswordPopUp(true)}>
					<FaExclamationCircle/>
					<div className='passwresponseText'>Password Non Rispetta I Criteri</div>
					<FaQuestionCircle style={{color:"rgba(0,0,0,0.7)"}}/>
				</div>}

				{passwMatchRegEx && passwordNew!="" &&
				<div className='passwResponseContainer' style={{color:"green"}} onClick={()=>setShowPasswordPopUp(true)}>
					<FaCheckCircle/>
					<div className='passwresponseText'>Password Rispetta I Criteri</div>
					<FaQuestionCircle style={{color:"rgba(0,0,0,0.7)"}}/>
				</div>}

                <button className='userDataItemButton' style={{alignSelf:"center"}} onClick={changePassword}>Cambia Password</button>
            </div>
            <Notice show={isNoticeShow} text={noticeText}></Notice>

            <BottomBar setNoticeShow={setIsNoticeShow} setNoticeText={setNoticeText}/>

            {isLoading && <Loading/>}
        </Container>
        {showPasswordPopUp && <PasswordPopUp okCallback={()=>setShowPasswordPopUp(false)}/>}
        </>
    );
}

export default EditPassword;