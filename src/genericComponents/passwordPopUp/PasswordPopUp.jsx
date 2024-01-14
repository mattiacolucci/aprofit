import './PasswordPopUp.css';

function PasswordPopUp(props){

    const callback=()=>{
        props.okCallback();
    }

    return(
        <div className='passowrdPopUpDarkContainer'>
            <div className="passwordPopUpContainer">
                <div className="passwordPopUpText">La password deve:<br/>- Avere una lunghezza di almeno 7<br/>- Contenere almeno una lettera maiuscola<br/>- Contenere almeno un numero</div>
                <button className='userDataItemButton' onClick={callback}>OK</button>
            </div>
        </div>
    )
}

export default PasswordPopUp;