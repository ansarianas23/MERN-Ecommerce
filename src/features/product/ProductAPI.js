export function fetchAllProductsCount(){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        resolve(data.length);
    })
}


export function fetchProductsByFilters(filter, sort, pagination){
    // filter = {"category":["smartphone", laptops]}
    // sort = {_sort: 'price', _order: 'desc'}
    // pagination = {_page: 1, limit:10}
    // console.log('from APi function sortObj', sort);

    // TODO: on server we will support multi values

    let queryString = '';

    // Filter
    for(let key in filter){
        const categoryValues = filter[key];     // output ["smartphone", "laptops"]
        if (categoryValues.length) {
            const lastCategoryValue = categoryValues[categoryValues.length-1];
            queryString+=`${key}=${lastCategoryValue}&`;
        }
    }

    // Sort
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }

    // Pagination
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
    }

    return new Promise(async (resolve)=>{
        const response = await fetch(`http://localhost:3000/products?${queryString}`);
        const data = await response.json();
        resolve(data);
    })
}