// import { Fragment, useEffect ,useState, useRef} from "react";
// import Header from "./components/Header/Header";
// import ProductList from './components/ProductList/ProductList'
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "./redux/cart";
// import axios from "axios";
import Home from './pages/home';
import SignupPage from "./pages/signuppage";
import LoginPage from "./pages/loginPage";
import AdminPage from './pages/AdminPage';
import AdminAddUser from './components/AdminComponents/AdminAddUser';
import UpdateUser from './components/AdminComponents/UpdateUser';
import UserList from './components/AdminComponents/UserList';
import Profile from './pages/Profile';
import { BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
//   const {userDetail} = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const counterRef = useRef(1);

//   useEffect(() => {
//     fetchUser(counterRef.current);
//   },[]);

//   const loadMoreUser = () => {
//     fetchUser(++counterRef.current);
//   };

//   const fetchUser = async (id)=> {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);

//     dispatch(updateUser(response.data));
// };

  return (
  <div className="App">
    {/* <Fragment>
       <Header/>
          <button onClick={loadMoreUser}>Add User</button>
          <pre style={{color:"white"}}>{JSON.stringify(userDetail,undefined,4)}</pre>
        <ProductList/>
    </Fragment> */}
    <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Home/>} />
          <Route path ='/signup' element={<SignupPage/>} />
          <Route path ='/login' element={<LoginPage/>} />
          <Route path ='/adminlogin'element= {<AdminPage />}/>  
          <Route path ='/profile' element={<Profile />} />
          <Route path ='/userlist'element= {<UserList />}/>
          <Route path ='/updateUser/:id'element= {<UpdateUser />}/>
          <Route path ='/adminAddUser'element= {<AdminAddUser />}/>
        
        </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
