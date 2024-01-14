//funzione che, dati in input la funzione che cambia lo stato che indica se mostrare la notifica e il testo di essa
//mostra la notifica con il testo text e dopo 2.8s non la mostra piu, richiamando, se sta, una funzione di callback passata in input
const showNotice=(setNoticeShow,setNoticeText,text,callback=()=>{})=>{
    setNoticeText(text);
    setNoticeShow(true);
    setTimeout(()=>{setNoticeShow(false);callback()},2000);
}

export default showNotice;