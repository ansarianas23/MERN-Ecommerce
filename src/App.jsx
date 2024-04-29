import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import {createBrowserRouter, RouterProvider} from "react-router-dom"; 
import ProductDetailsPage from "./pages/ProductDetailsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  },
  {
    path: "/cart",
    element: <CartPage/>
  },
  {
    path: "/checkout",
    element: <CheckoutPage/>
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage/>
  }
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
