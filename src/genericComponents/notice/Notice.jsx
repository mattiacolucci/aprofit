import './Notice.css';

const Notice=(props)=>{
    return(
        <>
            {props.show &&
                <div className='NoticeContainerTop'>
                    <div className='NoticeContainer'>
                        {props.text}
                    </div>
                </div>
            }
        </>
    );
}

export default Notice;