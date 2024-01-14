import { useRef, useState } from 'react'
import './Register.css';
import loginBg from '../../public/images/login_bg.png';
import Notice from '../genericComponents/notice/Notice';
import showNotice from '../controllers/noticeController';
import constantData from '../constantData';
import { useNavigate } from 'react-router-dom';
import Loading from '../genericComponents/loading/Loading';
import { FaCheckCircle, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa';
import PasswordPopUp from '../genericComponents/passwordPopUp/PasswordPopUp';

function Register() {
	const [username,setUsername]=useState("");
	const [password,setPassword]=useState("");
	const [email,setEmail]=useState("");
	const [loading,setLoading]=useState(false);
	const [isNoticeShow,setIsNoticeShow]=useState(false);
	const [noticeText,setNoticeText]=useState("");
	const [passwMatchRegEx,setPasswMatchRegEx]=useState(false);
	const [showPasswordPopUp,setShowPasswordPopUp]=useState(false);
	const usernameRef=useRef();
	const emailRef=useRef();
	const passwRef=useRef();
	const navigate=useNavigate();

	const registerRequest=async(username,password,email)=>{
		const response=await fetch(
			constantData.domainApiName+"/auth/register",
			{
				method: 'POST',
				mode:'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "username="+username+"&password="+password+"&email="+email
			}
		);
		var data=await response.json();
		return [data,(response.status==200)?true:false];
	}

	const register=async()=>{
		try{
			if(username!="" && password!="" && email!=""){
				//verifico se la passw reispetta i criteri
				if(/(?=.*[A-Z])/.test(password) && /(?=.{7,40}$)/.test(password) && /(?=.*[0-9])/.test(password)){
					//verifico se la email contiene la @
					if(/@/.test(email)){
						setLoading(true);
						const [data,response]=await registerRequest(username,password,email);

						setLoading(false);
						if(response){
							showNotice(setIsNoticeShow,setNoticeText,data.message,()=>{navigate("/login")});  //mostro la notice e vado alla home
						}else{
							if(data.errType=="Username"){
								showNotice(setIsNoticeShow,setNoticeText,data.message,()=>{
									usernameRef.current.focus();
									usernameRef.current.classList.add("scaleAni");
									setTimeout(()=>usernameRef.current.classList.remove("scaleAni"),800);
								});  //mostro la notice
							}else{
								showNotice(setIsNoticeShow,setNoticeText,data.message);
							}
						}
					}else{
						showNotice(setIsNoticeShow,setNoticeText,"Email non contiene @",()=>{
							emailRef.current.focus();
							emailRef.current.classList.add("scaleAni");
							setTimeout(()=>emailRef.current.classList.remove("scaleAni"),800);
						});  //mostro la notice
					}
				}else{
					showNotice(setIsNoticeShow,setNoticeText,"Password non rispetta i criteri",()=>{
						passwRef.current.focus();
						passwRef.current.classList.add("scaleAni");
						setTimeout(()=>passwRef.current.classList.remove("scaleAni"),800);
					});  //mostro la notice
				}
			}else{
				showNotice(setIsNoticeShow,setNoticeText,"Riempi tutti i campi");  //mostro la notice
			}
		}catch(e){
			console.log(e);
			setLoading(false);
			showNotice(setIsNoticeShow,setNoticeText,e.message);
		}
	}

	const login=()=>{
		navigate("/login");
	}

	const checkSingePasswChar=(e)=>{
		setPassword(e.target.value);
		if(/(?=.*[A-Z])/.test(e.target.value) && /(?=.{7,40}$)/.test(e.target.value) && /(?=.*[0-9])/.test(e.target.value)){
			setPasswMatchRegEx(true);
		}else{
			setPasswMatchRegEx(false);
		}
	}

	return(
		<div className='containerLogin'>
			<img src={loginBg} className='bgImage'></img>
			<div className='registerContainer'>
				<div className='loginTitle'>REGISTRAZIONE</div>
				<input ref={usernameRef} type='text' className='itemLogin' placeholder='Insert Username' value={username} onChange={e=>setUsername(e.target.value)}/>
				<input ref={emailRef} type='text' className='itemLogin' placeholder='Insert Email' value={email} onChange={e=>setEmail(e.target.value)}/>
				<input ref={passwRef} type='password' className='itemLogin' placeholder='Insert Password' value={password} onChange={e=>checkSingePasswChar(e)}/>
				
				{!passwMatchRegEx && password!="" &&
				<div className='passwResponseContainer' style={{color:"red"}} onClick={()=>setShowPasswordPopUp(true)}>
					<FaExclamationCircle/>
					<div className='passwresponseText'>Password Non Rispetta I Criteri</div>
					<FaQuestionCircle style={{color:"rgba(0,0,0,0.7)"}}/>
				</div>}

				{passwMatchRegEx && password!="" &&
				<div className='passwResponseContainer' style={{color:"green"}} onClick={()=>setShowPasswordPopUp(true)}>
					<FaCheckCircle/>
					<div className='passwresponseText'>Password Rispetta I Criteri</div>
					<FaQuestionCircle style={{color:"rgba(0,0,0,0.7)"}}/>
				</div>}

				<button className='submitLogin' onClick={register}>Registrazione</button>
				<div className='loginButton' onClick={login}>Hai già un account? Login</div>
			</div>

			{/*<div className='passwInfo'>
				<div className='passwInfoText'>La password deve:<br/>- Avere una lunghezza di almeno 7<br/>- Contenere almeno una lettera maiuscola<br/>- Contenere almeno un numero</div>
			</div>*/}

			{loading && 
			<Loading/>
			}

			<Notice show={isNoticeShow} text={noticeText}></Notice>
			{showPasswordPopUp && <PasswordPopUp okCallback={()=>setShowPasswordPopUp(false)}/>}
		</div>
	)
}

export default Register;
