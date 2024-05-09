import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, fetchAllOrdersCountAsync, selectAllOrders, selectAllOrdersCounts, updateOrderAsync } from '../../order/orderSlice';
import {ChevronLeftIcon, ChevronRightIcon, EyeIcon, PencilIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE, discountedPrice } from '../../../utils/constants';
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
      console.log(order);
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
                <th className="py-3 px-6 text-left">Order Number</th>
                <th className="py-3 px-6 text-left">Items & Price</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className="py-3 px-6 text-center">Shipping Address</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">

            {
                orders?.map((order, index)=>(
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <span className="font-medium">{order.id}</span>
                            </div>
                        </td>

                        <td className="py-3 px-6 text-left">
                            {
                                order?.items?.map((item, index)=>(
                                    <Link key={index} target='_blank' to={item.itemUrl}>
                                        <div className="flex items-center">
                                            <img className="mr-2 w-6 h-6 rounded-full" src={item.thumbnail}/>
                                            <div className='flex items-center space-x-2'>
                                                <span className='font-medium'>{item.title} -</span>
                                                <span className='font-medium'>${discountedPrice(item)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </td>

                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span className='font-medium'>x {order.totalItems}</span>
                            </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span className='font-medium'>${order.totalAmount}</span>
                            </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                            <div className='font-semibold'>{order.selectedAddress?.name},</div>
                            <div>{order.selectedAddress?.street},</div>
                            <div>{order.selectedAddress?.city},</div>
                            <div>{order.selectedAddress?.state},</div>
                            <div>{order.selectedAddress?.pinCode},</div>
                            <div>{order.selectedAddress?.phone}</div>
                        </td>

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

          <Pagination handlePgination={handlePgination} totalOrders={totalOrders} page={page} setPage={setPage}></Pagination>
        </div>

      </div>
    </div>
  </div>


</>

  )
}

export default AdminOrders

const Pagination = ({ handlePgination, page, setPage, totalOrders }) => {

    const totalPages = Math.ceil(totalOrders/ITEMS_PER_PAGE);
  
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button disabled={page===1? true : false} onClick={()=>setPage(page-1)} className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 tex font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button disabled={page===totalPages? true : false} onClick={()=>setPage(page+1)} className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 tex  font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to{" "}
              <span className="font-medium">{page *ITEMS_PER_PAGE > totalOrders? totalOrders : page*ITEMS_PER_PAGE}</span> of{" "}
              <span className="font-medium">{totalOrders}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button disabled={page===1? true : false} onClick={()=>setPage(page-1)} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-i ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
  
              {/* Dynamic pages here */}
              {
                Array.from({length:Math.ceil(totalPages)}).map((elem, index)=>(
                  <span key={index} aria-current="page"
                  onClick={(e)=>handlePgination(index+1)}
                   className={`cursor-pointer relative z-10 inline-flex items-center ${index+1 === page? 'bg-indigo-600 text-white hover:bg-indigo-700': 'bg-white text-black hover:bg-gray-50'} px-4 py-2 text-sm font-semibold text-w  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offs focus-visible:outline-indigo-600 ring-1 ring-i ring-gray-300`}>
                      {index+1}
                  </span>
                ))
              }
              
              <button disabled={page===totalPages ? true : false} onClick={()=>setPage(page+1)} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-i ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };
