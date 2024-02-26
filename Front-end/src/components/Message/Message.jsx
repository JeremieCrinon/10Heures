import './Message.css';

export default function Message(){
    if(localStorage.getItem('message') !== null){
        let message = localStorage.getItem('message');
        localStorage.removeItem('message');
        return (
            <div className='message'>
                <p>{message}</p>
            </div>
        )
    } else if (localStorage.getItem('error') !== null){
        let error = localStorage.getItem('error');
        localStorage.removeItem('error');
        return (
            <div className='error'>
                <p>{error}</p>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}