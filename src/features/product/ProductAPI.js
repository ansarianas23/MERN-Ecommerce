export function fetchAllProducts(){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        resolve(data);
    })
}


export function fetchProductsByFilters(filter){
    let queryString = '';
    for(let key in filter){
        const categoryValues = filter[key];
        if (categoryValues.length) {
            queryString += `${key}/${categoryValues}`
        }
    }

    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/products/${queryString}`);
        const data = await response.json();
        resolve(data);
    })
}