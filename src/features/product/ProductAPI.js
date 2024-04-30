export function fetchAllProducts(){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        resolve(data);
    })
}


export function fetchProductsByFilters(filter, sort){
    // console.log("filter from api function", filter);
    // console.log("sort from api function", sort);

    // filter = {"category":["smartphone", laptops]}
    // sort = {"_sort": "price", "_order":"desc}
    // TODO: on server we will support multi values

    let queryString = '';

    for(let key in filter){
        const categoryValues = filter[key];     // output ["smartphone", "laptops"]
        if (categoryValues.length) {
            const lastCategoryValue = categoryValues[categoryValues.length-1]
            queryString+=`${key}/${lastCategoryValue}`
        }
    }

    // fake store Api

        for (let key in sort) {
            queryString += `${key}/${sort[key]}`
        }

    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/products/${queryString}`);
        const data = await response.json();
        resolve(data);
    })
}