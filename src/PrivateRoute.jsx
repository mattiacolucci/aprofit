import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute=(props)=>{
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("username")==undefined){  //se non è loggato l'accesso viene negato
            navigate("/login");
        }
    },[])

    return (
        <>
            {props.children}
        
        </>
    );
}

/*tale componente è creato per renderizzare l'elemento posto in una Route solo se l'utente è loggato, quindi fa si di creare una route privata
se l'utente non è loggato lo manda alla pagina di login

quindi mettendo dove si vuole:
<Route path="..." element={<PrivateRoute><Component></PrivateRoute>}/>

Component verra renderizzato solo se l'utente è loggato, se no non viene renderizzato e vado alla pagina di login

se l'utente è loggato, importando il contesto UsernameContext, creao un provider per tale contesto che ha come valore lo username dell'utente loggato
tale contesto verra usato dal Component renderizzato, accessibile importando il contesto UsernameContext e usando const username=useContext(UsernameContext)

si mette la createContext in un file esterno per far si che si possa importare il contesto in file esterni, cioè in altre componenti, e quindi usare la 
useContext; se lo avessi creato qui il contesto, la useContext nel componente mi avrebbedato errore in quanto UsernameContext non era definita
*/

export default PrivateRoute;