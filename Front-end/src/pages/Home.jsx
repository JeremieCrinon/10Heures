export default function Home(){

    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    
    // On récupert le cookie token et role
    const token = getCookie('token');
    const role = getCookie('role');
    
    return (
        <>
            <h1>Home</h1>
            <p>token : {token}</p>
            <p>role : {role}</p>
        </>
        
    );
}