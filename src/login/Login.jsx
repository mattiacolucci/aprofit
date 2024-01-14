import { useRef, useState } from 'react'
import './Login.css';
import loadingImage from '../../public/images/loading.gif';
import loginBg from '../../public/images/login_bg.png';
import Notice from '../genericComponents/notice/Notice';
import showNotice from '../controllers/noticeController';
import constantData from '../constantData';
import { useNavigate } from 'react-router-dom';
import Loading from '../genericComponents/loading/Loading';

function Login() {
	const [username,setUsername]=useState("");
	const [password,setPassword]=useState("");
	const [loading,setLoading]=useState(false);
	const usernameRef=useRef();
	const passwRef=useRef();
	const [isNoticeShow,setIsNoticeShow]=useState(false);
	const [noticeText,setNoticeText]=useState("");
	const navigate=useNavigate();

	const loginRequest=async(username,password)=>{
		const response=await fetch(
			constantData.domainApiName+"/auth/login",
			{
				method: 'POST',
				mode:'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "username="+username+"&password="+password
			}
		);
		var data=await response.json();
		return [data.message,(response.status==200)?true:false];
	}

	const login=async()=>{
		try{
			if(username!="" && password!=""){
				setLoading(true);
				const [message,response]=await loginRequest(username,password);
				setLoading(false);
				if(response){
					localStorage.setItem("username",username);
					showNotice(setIsNoticeShow,setNoticeText,message,()=>{navigate("/")});  //mostro la notice e vado alla home
				}else{
					if(message=="Utente Non Esistente"){
						showNotice(setIsNoticeShow,setNoticeText,message,()=>{
							usernameRef.current.focus();
							usernameRef.current.classList.add("scaleAni");
							setTimeout(()=>usernameRef.current.classList.remove("scaleAni"),800);
						});  //mostro la notice
					}else if(message=="Password Errata"){
						showNotice(setIsNoticeShow,setNoticeText,message,()=>{
							passwRef.current.focus();
							passwRef.current.classList.add("scaleAni");
							setTimeout(()=>passwRef.current.classList.remove("scaleAni"),800);
						});  //mostro la notice
					}
					showNotice(setIsNoticeShow,setNoticeText,message);  //mostro la notice
					console.log(message);
				}
			}else{
				showNotice(setIsNoticeShow,setNoticeText,"Riempi tutti i campi");  //mostro la notice
			}
		}catch(e){
			showNotice(setIsNoticeShow,setNoticeText,e.message);  //mostro la notice
		}
	}

	const register=()=>{
		navigate("/register");
	}

	return(
		<div className='containerLogin'>
			<img src={loginBg} className='bgImage'></img>
			<div className='loginContainer'>
				<div className='loginTitle'>LOGIN</div>
				<input type='text' ref={usernameRef} className='itemLogin' placeholder='Insert Username' value={username} onChange={e=>setUsername(e.target.value)}/>
				<input type='password' ref={passwRef} className='itemLogin' placeholder='Insert Password' value={password} onChange={e=>setPassword(e.target.value)}/>
				<button className='submitLogin' onClick={login}>Login</button>
				<div className='registerButton' onClick={register}>Non hai un account? Registrati</div>
			</div>

			{loading && 
			<Loading/>
			}

			<Notice show={isNoticeShow} text={noticeText}></Notice>
		</div>
	)
}

export default Login;
