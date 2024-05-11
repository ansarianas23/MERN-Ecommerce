import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectAllBrands, selectAllCategories, selectProduct, updateProductAsync } from '../../product/ProductSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';



const AdminProductForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset} = useForm();
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProduct);
  const [isEdit, setIsEdit] = useState(false);

  // console.log('selected product is', selectedProduct);

  useEffect(()=>{
    if(params.id){
      dispatch(fetchProductByIdAsync(params.id)); // this make sure that if url contains edit id means it is edit form
    }else{
      dispatch(clearSelectedProduct()); // this disptach make sure that when add product form is open no field is populated like in case of edit form
    }

  },[params.id]);


  useEffect(()=>{
    // this ensure that if there is selected product form redux by id means populate all the fields as it is edit form
    if(selectedProduct){
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
      setValue('stock', selectedProduct.stock);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
    }
  },[selectedProduct,params.id, setValue]);


  const handleDelete = ()=>{
    if(selectedProduct){
      const product = {...selectedProduct}
      product.deleted = true;
      dispatch(updateProductAsync(product));
    }
  }



  return (
    <>
    <form className='bg-white' noValidate onSubmit={handleSubmit((data)=>{
      // creating updated product object
      let product = {...data} 
      product.images = [product.image1, product.image2, product.image3]
      product.rating = 0;
      delete product['image1']
      delete product['image2']
      delete product['image3']
      product.rating = 0
      product.price = +product.price
      product.discountPercentage = +product.discountPercentage
      product.stock = +product.stock
      
      // this statement is used because same form is being used to edit and add product
      if(params.id){
        product.id = params.id;
        product.rating = selectedProduct.rating || 0;
        dispatch(updateProductAsync(product));
        reset();
      }else{
        dispatch(createProductAsync(product));
        reset();
      }
    })}>

    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12 p-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Add product</h2>

        {selectedProduct?.deleted ? <p className='text-red-600'>This product is deleted</p> : null}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="sm:col-span-full">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Product Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  {...register('title', {
                    required: 'Title is required'
                  })}
                  id="title"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                {...register('description', {
                  required: 'Description name is required'
                })}
                rows={3} 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>

          <div className="sm:col-span-full">
            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
              Brand
            </label>
            <div className="mt-2">
              <select name="brand" id="brand" {...register('brand', {
                    required: 'Brand is required'
              })}>
                <option value="">--choose brand--</option>
                {
                  brands?.map((brand, index)=>(
                    <option key={index} value={brand.value}>{brand.label}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="sm:col-span-full">
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select name="category" id="category" {...register('category', {
                    required: 'Category is required'
                  })}>
                <option value="">--choose category--</option>
                {
                  categories?.map((category, index)=>(
                    <option key={index} value={category.value}>{category.label}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="number"
                  {...register('price', {
                    required: 'Price is required',
                    min:0
                  })}
                  id="price"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
              Discount Percentage
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="number"
                  {...register('discountPercentage', {
                    required: 'Discount Percentage is required',
                    min:0,
                    max:100
                  })}
                  id="discount"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
              Stock
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="number"
                  {...register('stock', {
                    required: 'Stock is required',
                    min:0
                  })}
                  id="stock"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
              Thumbnail
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  {...register('thumbnail', {
                    required: 'Thumbnail is required'
                  })}
                  id="thumbnail"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
              Image 1
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  {...register('image1')}
                  id="image1"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
              Image 2
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  {...register('image2')}
                  id="image2"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
              Image 3
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  {...register('image3')}
                  id="image3"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6 p-5">
      {selectedProduct && !selectedProduct.deleted && <button
        onClick={handleDelete}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
        Delete
      </button>}

      <button
        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
  </form>

  {/* {selectedProduct && (
    <Modal
      title={`Delete ${selectedProduct.title}`}
      message="Are you sure you want to delete this Product ?"
      dangerOption="Delete"
      cancelOption="Cancel"
      dangerAction={handleDelete}
      cancelAction={() => setOpenModal(null)}
      showModal={openModal}
    ></Modal>
  )} */}
  </>
  )
}

export default AdminProductForm
