import { createContext, useState} from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()



export default AuthContext;

export const AuthProvider = ({children}) =>{
    
    let navigate = useNavigate();

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    let loginUser = async (e) =>{
        e.preventDefault()
        console.log('form submitted');
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method: 'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data:', data);
        console.log('response:', response);

        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }else{
            alert('something went wrong!')
        }
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
        {children}
        </AuthContext.Provider>
    )}