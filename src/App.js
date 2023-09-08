//import { lazy, Suspense } from "react";//npm run build //
import { Routes, Route } from 'react-router-dom'; //npm i react-router-dom 

 import { PostProvider } from './contexts/PostContext';
 import { AuthProvider } from './contexts/AuthContext';
 import PrivateRoute from "./components/common/PrivateRoute"; 

  import  Header  from './components/Header/Header.js'
  import Home from './components/Home/Home'
  import  Register from './components/Register/Register.js'
  import  Login  from './components/Login/Login.js'
  import Logout from './components/Logout/Logout';
  import  Catalog  from './components/Catalog/Catalog'
  import  Details  from './components/Details/Details'
  import  Create  from './components/Create/Create'
  import  Edit  from './components/Edit/Edit'
  import MyPosts from './components/MyPosts/MyPosts'
  import Shopping from './components/Shopping/Shopping'
  import  Search  from './components/Search/Search'
  import  Footer  from './components/Footer/Footer'
  import  Page404  from './components/Page404/Page404';
  //const Search = lazy(() => import('./components/Search/Search'));

const App = () => {
  return (
    <div id="container">
    <AuthProvider> 
    
      <PostProvider>
      <Header />
       
    <main>
      {/* <Suspense fallback>{<div>Loading...</div>} */}
      <Routes>
     <Route path="/" element={<Home />} />  
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/search" element={<Search />} />

      <Route path="/logout" element={(
         <PrivateRoute>
           <Logout />
         </PrivateRoute>
       )} />


      <Route path="/create" element={(
            <PrivateRoute>
               <Create />
             </PrivateRoute>
       )} />

       <Route path="/edit/:id" element={( 
          <PrivateRoute> 
            <Edit />
          </PrivateRoute> 
        )} />

        <Route path="/details/:id" element={(
           <PrivateRoute>
              <Details />
           </PrivateRoute>
        )} />

       <Route path="/mylist/:id" element={(
            <PrivateRoute>
               <MyPosts />
             </PrivateRoute>
       )} />

      <Route path="/shopping/:id" element={(
            <PrivateRoute>
               <Shopping />
             </PrivateRoute>
       )} />

     <Route path="*" element={<Page404 />} />

      </Routes>
      {/* </Suspense> */}
    </main>
    
    </PostProvider>
    <Footer />
    </AuthProvider>
    </div>
  )
}

export default App;
