import { React, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, selectedCartItems, updateCartAsync } from "./CartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { selectUserInfo } from "../user/UserSlice";
import { discountedPrice } from "../../utils/constants";


const Cart = () => {
  const cart = useSelector(selectedCartItems);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const cartTotalValue = cart?.reduce((total, item)=>{
    return total + discountedPrice(item.product) * item.quantity;
  },0);

  const totalItems = cart?.reduce((total, item)=>{
    return item.quantity + total;
  },0);

  const handleDeleteItem = (e, itemId)=>{
    dispatch(deleteItemFromCartAsync(itemId));
  }

  const handleQuantity = (e, item)=>{
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value}));
    // console.log("option item", e.target.value, item); 
  }

  return (
    <>
    {!cart.length && <Navigate to='/' replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white rounded-lg">
        <h2 className="text-lg md:text-3xl font-semibold py-3 border-b">Cart - ({cart?.length} items)</h2>

        <div className="px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart?.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a target="_blank" href={item.product.itemUrl}>{item.product.title}</a>
                        </h3>
                        <div>
                          <p className="ml-4">${discountedPrice(item?.product)}</p>
                          <p className="ml-4 text-sm text-gray-500 line-through">${item.product.price}</p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                      <label htmlFor="quantity">Qty</label> 
                        <select onChange={(e)=>handleQuantity(e, item)} value={item.quantity} id="quantity" className="mx-2 rounded-md">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button onClick={(e)=>{handleDeleteItem(e, item.id)}} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${cartTotalValue}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link to='/checkout'
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button 
                type="button" 
                className="font-medium text-indigo-600 hover:text-indigo-500" ><Link to='/'>Continue Shopping</Link><span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
