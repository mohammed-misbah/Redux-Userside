import { Fragment, useEffect ,useRef} from "react";
import Header from "./components/Header/Header";
import ProductList from './components/ProductList/ProductList'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/cart";
import axios from "axios";

function App() {
  const {userDetail} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const counterRef = useRef(1);

  useEffect(() => {
    fetchUser(counterRef.current);
  },[]);

  const loadMoreUser = () => {
    fetchUser(++counterRef.current);
  };

  const fetchUser = async (id)=> {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);

    dispatch(updateUser(response.data));
};

  return (
   <Fragment>
       <Header/>
      <button onClick={loadMoreUser}>Add User</button>
      <pre style={{color:"white"}}>{JSON.stringify(userDetail,undefined,4)}</pre>
      <ProductList/>
   </Fragment>
  );
}

export default App;
