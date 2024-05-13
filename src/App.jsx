import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedinUserAsync } from "./features/user/UserSlice";
import LogOut from "./features/auth/components/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import Protected from "./features/auth/Protected";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <HomePage></HomePage>
    ),
  },
  {
    path: "/admin",
    element: (
      // <ProtectedAdmin>
        <AdminHomePage/>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage >,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage >,
  },
  {
    path: "/cart",
    element: (
      // <Protected>
        <CartPage></CartPage>
      // </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      // <Protected>
        <CheckoutPage></CheckoutPage>
      // </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      // <Protected>
        <ProductDetailsPage></ProductDetailsPage>
      // </Protected>
    ),
  },
  {
    path: "admin/product-details/:id",
    element: (
      // <ProtectedAdmin>
        <AdminProductDetailsPage></AdminProductDetailsPage>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "admin/orders",
    element: (
      // <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "admin/product-form",
    element: (
      // <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "/product-form/edit/:id",
    element: (
      // <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "/orderSuccess/:id",
    element: (
      // <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      // </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      // <Protected>
        <MyOrdersPage></MyOrdersPage>
      // </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      // <Protected>
        <UserProfilePage></UserProfilePage>
      // </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <LogOut></LogOut>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>  // always put this route at the end so if no path matches this will show
    ),
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  // console.log('user from App js', user[0].id);

  // loading user cart
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedinUserAsync(user.id));
    }
  },[dispatch, user]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
