import React,{useState , useEffect}from "react";


const Login =(props) =>{
    
   const [loginUserName, setLoginUsername] = React.useState('')
   const [loginPassword, setLoginPassword] = React.useState('')
   const [user, setUser] = React.useState({})
   const [token, setToken] = React.useState(null)


const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token')
    if(token){
        fetch ('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(result => {
            const user = result.data;
            setUser(user)
        })
        .catch(err => console.log(err))
    }
}   

useEffect (() => {
    exchangeTokenForUser();
},[token])

const login = (ev)=> {
    ev.preventDefault();
    
    fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
           },
        
        body: JSON.stringify({
            user: {
                username: loginUserName,
                password: loginPassword
            }
        })
     }).then(response => response.json())
                .then(result => {
                    if(!result.success){
                        throw result.error;
                        
                    }else{
                        console.log(result)
                        console.log(result.data.token)
                         setToken(result.data.token)
                         window.localStorage.setItem('token',result.data.token)
                    }
                })
     }
        
    


const logout = () => {
    window.localStorage.removeItem('token');
    setUser({})
}


return (
        <div>

        {
            user._id ? <div>Welcome { user.username } <button onClick={ logout }>Logout</button></div> : null
        }
        {
            !user._id ? (
                <div>
            

          <form onSubmit= { login }>
          <input 
          placeholder='username' 
          value={ loginUserName } 
          onChange = { ev => setLoginUsername(ev.target.value)}
          />
         <input 
         placeholder='password' value={ loginPassword } 
         onChange = { ev => setLoginPassword(ev.target.value)}/>
      
         <button>Login</button>
      
         </form>
       </div>) : null
    }
    </div>
)
}



    


export default Login;