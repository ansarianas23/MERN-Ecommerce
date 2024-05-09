import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteItemFromCartAsync, selectedCartItems, updateCartAsync } from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/UserSlice";
import { discountedPrice } from "../utils/constants";

const Checkout = () => {

  const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const dispatch = useDispatch();
  const cart = useSelector(selectedCartItems);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);  

  const cartTotalAmount = cart?.reduce((total, item)=>{
    return total + discountedPrice(item) * item.qty;
  },0);

  const totalItems = cart?.reduce((total, item)=>{
    return item.qty + total;
  },0);

  const handleQuantity = (e, item)=>{
    dispatch(updateCartAsync({...item, qty: +e.target.value}));
  }

  const handleDeleteItem = (e, itemId)=>{
    dispatch(deleteItemFromCartAsync(itemId));
  }

  const handleAddress = (e)=>{
    setSelectedAddress(user.addresses[e.target.value]);
  }

  const handlePayment = (e)=>{
    setPaymentMethod(e.target.value);
  }

  const handleOrder = (e)=>{
    const order = {
      items: cart,
      totalAmount: cartTotalAmount, 
      totalItems,
      user:user, 
      paymentMethod, 
      selectedAddress, 
      status: 'pending' // once product delivered admin can change the status
    }

    dispatch(createOrderAsync(order));
  }


  return (
    <>
    {!cart?.length>0 && <Navigate to='/' replace={true}></Navigate>}
    {currentOrder && <Navigate to={`/orderSuccess/${currentOrder.id}`} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Form start here */}
          <div className="lg:col-span-3 p-3 rounded-lg bg-white">
            <form  noValidate onSubmit={handleSubmit((data)=>{
              dispatch(
                updateUserAsync({...user, addresses: [...user.addresses, data]})
              );
              reset();
            })}>
              <div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addressal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', {required: "name is requied"})}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', {required: "email is requied"})}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                      <input
                          id="phone"
                          {...register('phone', {required: "phone is requied"})}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', {required: "street is requied"})}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', {required: "city is requied"})}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', {required: "state is requied"})}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', {required: "pinCode is requied"})}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                      Cancel
                    </button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Add
                    </button>
                  </div>

                </div>

                <div className="border-b border-gray-900/10 py-5">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing addresses
                  </p>

                  {/* Address list starts here */}
                  <ul role="list" className="space-y-3">
                    {user?.addresses?.map((address, index) => (
                      <li key={index} className="flex justify-between gap-x-6 py-5 border-[1px] px-2 rounded-md border-gray-200 ">
                        <div className="flex min-w-0 gap-x-4 ">
                          <input
                            onChange={handleAddress}
                            value={index}
                            id="address"
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>

                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>

                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.phone}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                          {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Address list ends here */}

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Paayment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            value='cash'
                            checked={paymentMethod === 'cash'}
                            id="cash"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                            Cash
                          </label>
                        </div>

                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            value='card'
                            checked={paymentMethod === 'card'}
                            id="card"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

            </form>
          </div>
          {/* Form ends here */}

          {/* Checkout products starts here */}
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 rounded-lg bg-white">
              <h2 className="text-lg md:text-3xl font-semibold border-b py-3 px-5">
                Cart ({totalItems} items)
              </h2>

              <div className="px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart?.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.itemUrl}>{item.title}</a>
                              </h3>
                              <div>
                                <p className="ml-4">$ {discountedPrice(item)}</p>
                                <p className="ml-4 text-sm line-through text-gray-500">$ {item.price}</p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item?.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="qty">Qty</label>
                              <select onChange={(e)=>handleQuantity(e, item)} value={item.qty} id="qty" className="mx-2 rounded-md">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button onClick={(e)=>handleDeleteItem(e, item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartTotalAmount}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div onClick={handleOrder} className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <Link to="/">Continue Shopping</Link>
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Checkout products ends here */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
