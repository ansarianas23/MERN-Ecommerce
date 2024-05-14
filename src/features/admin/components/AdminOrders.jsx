import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, fetchAllOrdersCountAsync, selectAllOrders, selectAllOrdersCounts, updateOrderAsync } from '../../order/orderSlice';
import {ChevronLeftIcon, ChevronRightIcon, EyeIcon, PencilIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE, discountedPrice } from '../../../utils/constants';
import Pagination from '../../common/Pagination';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const orders = useSelector(selectAllOrders);
    const totalOrders = useSelector(selectAllOrdersCounts);
    const [editableOrderid, setEditableOrderid] = useState(-1);

    useEffect(() => {
        const pagination = {_page:page, _limit:ITEMS_PER_PAGE}
        dispatch(fetchAllOrdersAsync(pagination));
        dispatch(fetchAllOrdersCountAsync());
    }, [dispatch, page]);

    const handlePgination = (pageNo)=>{
        setPage(pageNo);
    }

    const handleEdit = (e, order)=>{
      setEditableOrderid(order.id);
    }

    const handleShow = (e, order)=>{
      console.log("show");
    }

    const handleUpdate = (e, order)=>{
      const updateOrder = {...order}
      updateOrder.status = e.target.value;
      dispatch(updateOrderAsync(updateOrder))
      setEditableOrderid(-1);
    }

    const chooseColor = (status)=>{
      switch(status){
        case 'pending': 
        return 'bg-purple-200 text-purple-600';

        case 'dispatched': 
        return 'bg-yellow-200 text-yellow-600';

        case 'delivered': 
        return 'bg-green-200 text-green-600';

        case 'cancelled': 
        return 'bg-red-200 text-red-600';

        default: 'bg-purple-200 text-purple-600';
      }
    }

  return (
    <>
  {/* component */}
  <div className="overflow-x-auto">
    <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full lg:w-5/6">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">

            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order#</th>
                <th className='border-l-[1px] border-gray-300'/>
                <th className="py-3 px-6 text-left">Items & Price</th>
                <th className='border-l-[1px] border-gray-300'/>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className='border-l-[1px] border-gray-300'/>
                <th className="py-3 px-6 text-center">Shipping Address</th>
                <th className='border-l-[1px] border-gray-300'/>
                <th className="py-3 px-6 text-center">Status</th>
                <th className='border-l-[1px] border-gray-300'/>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">

            {
                orders?.map((order, index)=>(
                    <tr key={index} className="border-b-[1px] border-gray-300 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <span className="font-medium">{order.id}</span>
                            </div>
                        </td>

                        <td className='border-l-[1px] border-gray-300'/>

                        <td className="py-3 px-6 text-left">
                            {
                                order?.items?.map((item, index)=>(
                                    <Link key={index} target='_blank' to={item?.itemUrl}>
                                        <div className="flex items-center my-5">
                                            <img className="mr-2 w-6 h-6 rounded-full" src={item?.product.thumbnail}/>
                                            <div className='flex items-center space-x-2'>
                                                <span className='font-medium hover:text-red-600'>{item?.product.title} -</span>
                                                <span className='font-medium'>${discountedPrice(item?.product)}</span>
                                                <span className='font-medium text-red-600'>x {item.quantity}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </td>

                        <td className='border-l-[1px] border-gray-300'/>

                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span className='font-medium'>${order.totalAmount}</span>
                            </div>
                        </td>

                        <td className='border-l-[1px] border-gray-300'/>

                        <td className="py-3 px-6 text-center">
                            <div className='font-semibold'>{order.selectedAddress?.name},</div>
                            <div>{order.selectedAddress?.street},</div>
                            <div>{order.selectedAddress?.city},</div>
                            <div>{order.selectedAddress?.state},</div>
                            <div>{order.selectedAddress?.pinCode},</div>
                            <div>{order.selectedAddress?.phone}</div>
                        </td>

                        <td className='border-l-[1px] border-gray-300'/>

                        <td className="py-3 px-6 text-center space-x-4">
                              {editableOrderid === order.id ? <select className='outline-none rounded-md py-1' value={order.status} onChange={(e)=>handleUpdate(e, order)}>
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              :
                                <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs font-medium`}>
                                {order.status}
                                </span>
                              }                            
                        </td>

                        <td className='border-l-[1px] border-gray-300'/>

                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                  <EyeIcon onClick={(e)=>handleShow(e,order)} className='w-6 h-6'></EyeIcon>
                                </div>

                                <div  className="w-6 mr-3 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                  <PencilSquareIcon onClick={(e)=>handleEdit(e,order)} className='w-6 h-6'></PencilSquareIcon>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
            }

            </tbody>
          </table>

          <Pagination handlePgination={handlePgination} totalItems={totalOrders} page={page} setPage={setPage}></Pagination>
        </div>

      </div>
    </div>
  </div>


</>

  )
}

export default AdminOrders
