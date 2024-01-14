import "./Container.css";

const Container=(props)=>
{
    return(
        <div className='container' ref={props.refContainer}>
            {props.children}
        </div>
    );
}

export default Container;

