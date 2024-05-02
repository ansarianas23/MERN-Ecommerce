export function addToCart(Item){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/cart',{
            method: 'POST',
            body: JSON.stringify(Item),
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve(data);
    })
}


export function fetchItemsByUserId(userId){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/cart?user='+userId);
        const data = await response.json()
        resolve(data);
    })
}


export function updateCart(update){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/cart/'+update.id, {
            method: 'PATCH',
            body: JSON.stringify(update),    // JSON.stringify to send as a JSON Data
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve(data);
    })
}


export function deleteItemFromCart(itemId){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/cart/'+itemId, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve({data: {id: itemId}});
    })
}