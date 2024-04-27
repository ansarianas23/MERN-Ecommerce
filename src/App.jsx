import Layout from "./features/layout/Layout";
import ProductList from "./features/product-list/ProductList"
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import {createBrowserRouter, RouterProvider, Route, Link, createRoutesFromElements,} from "react-router-dom"; 


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Route>
  )
);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
