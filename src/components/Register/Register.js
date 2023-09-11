import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Register = () => {
  const [userMess, setUserNMess] = useState('')
  const [emailMess, setErrEmail] = useState('')
  const [passMess, setMessigePass] = useState('')

  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
 
  let onUser = (e) => {
    e.preventDefault()
    if (e.target.value.length < 2) {
      setUserNMess('Username mast be at least two character long')
    } else {
      setUserNMess('')
    }
  }

  let onEmail = (e) => { //<input onInput={onEmail} >
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

   let onPass = (e) => {
    if (e.target.value.length < 2) {
      setMessigePass('Password mast be at least twe character long')
      //return alert('Email or Password mast be at least two character long')
    } else {
      setMessigePass('')
    }
   }

  const onSubmit = async (e) => {
      e.preventDefault();

       const formData = new FormData(e.target); 
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      const repass = formData.get('repass')
        //console.log('Register ' + username)
      
      if (password !== repass) { 
        return alert('Password don/t match')
      }
  
   
        authService.register(username, email, password)
           .then(userData => {
              if (userData.error) {
                //console.log(userData.error['message'])
                alert(userData.error['message'])
                return;
               }
               userLogin(userData);
               if (userData) {
                alert("Data saved succesfully");
               }
             
                navigate('/');
           })
          //  .catch((err) => {
          //    navigate('/register')
          //    throw new Error (err.message)
          //   });
      
    }

  return (
         
  <div className="register">
  <form action="/register" onSubmit={onSubmit} method="POST">
    <p className="desc">Registration</p>
    <div className="username">
      <label htmlFor="username">Username</label>
      <input onInput={onUser} type="text" name="username" id="username" placeholder='Username' />
       <div className='err'>{userMess}</div>
    </div>
    <div className="email">
      <label htmlFor="email">Email</label>
      <input onInput={onEmail} type="email" name="email" id="email"  placeholder='pesho@aaa.com' />
      <div className='err'>{emailMess}</div>
    </div>

    <div className="password">
      <label htmlFor="password">Password</label>
     <input onInput={onPass} type="password" name="password" placeholder='password' />
     <div className='err'>{passMess}</div>
    </div>

    <div className="repass">
      <label htmlFor="repass">Repeat password</label>
      <input type="password" name="repass" />
    </div>
    
    <button type='submit'>Register</button>

    <div className="horizontal" />
    <p className="text-center">
      Have an account?
      <Link to="/login">Log In</Link>
    </p>
  </form>
</div>              
  )
};

export default Register;
