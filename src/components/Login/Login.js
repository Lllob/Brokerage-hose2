import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";//fetch, GET, POST

const Login = () => {
  const [errEmail, setErrEmail] = useState('')
  const [errPass, setErrPass] = useState('')

  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  let initEmail = (e) => {
    e.preventDefault()
    let em = e.target.value
    let emRegex = /([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/
    let hasMatch = em.match(emRegex)
    //console.log(hasMatch)
    if (!!hasMatch === false) {
      setErrEmail('email is not valid')
    } else {
        setErrEmail('')
    }
  }
  //
  let initPass = (e) => {
    e.preventDefault()
    if (e.target.value.length < 2) {
       setErrPass('Incorect password')
    } else {
        setErrPass('')
    }
  }

  const onSubmit = (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(e.target));

      if (data.password === '' || data.email === '') {
        return alert('Pleas, fill all fields!')
      }

      const formData = new FormData(e.target); 
      const email = formData.get('email');
      const password = formData.get('password');
           
       authService.login(email, password)
         .then(userData => {
            if (userData.error) {
                alert(userData.error['message'])
              return;
             }
              userLogin(userData);
               navigate('/');
          })
            // .catch (err => {
            //   navigate('/login')
            //   throw new Error (err.message)
            // })
             
  };

  return(
    <div className="login">
    <form onSubmit={onSubmit} action="/login" method="post" className="form">
      <p className="desc">Login</p>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input name="email" onInput={initEmail} type="text"  placeholder='email'/>
        <p className="err">{errEmail}</p>
      
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input name="password" onInput={initPass} type="text" placeholder="password" />
        <p className="err">{errPass}</p>
      </div>
      <button className="ok"  type="submit">Login</button>
      

      <div className="horizontal" />
      <p className="text-center">
        Don't have an account?
        <Link to="/register">Register</Link>
      </p>
    </form>
  </div>
  )
}


export default Login;
