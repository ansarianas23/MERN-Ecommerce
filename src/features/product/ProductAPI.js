export function fetchAllProducts(){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        resolve(data);
    })
}


export function fetchProductsByFilters(filter){
    const queryString = '';
    for(let key in filter){
        queryString += `${key}=${filter[key]}&`
    }


    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/products?${filter}`);
        const data = await response.json();
        resolve(data);
    })
}