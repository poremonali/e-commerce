const initialState = {
    items: localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem("cartitems")) : []
}
const itemreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            //while adding item to cart we check weather it is available in cart if yes then increment quantity otherwise add that item to cart.
            const cartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id);

            if (cartItemIndex >= 0) {
                state.items[cartItemIndex].quantity += 1;
                console.log("greater");
                return { ...state, items: [...state.items] }
            }
            else {
                console.log("not in cart");

                localStorage.setItem("cartitems", JSON.stringify(state.items))
                return { ...state, items: [...state.items, action.payload] }
                // return  {...state,items:[...state.items,action.payload]}
            }




        case 'REMOVE_ITEM':
            //remove item from cart after clicking delete button
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) }

        case 'DECREMENT_QUANTITY':
            //if item available in cart ,decrement quantity..if quantity of  item  supposed to be decrement quantity is 1 then delete it from cart
            const cartItemIndex1 = state.items.findIndex(
                (item) => item.id === action.payload.id);
            if (state.items[cartItemIndex1].quantity == 1) {
                return { ...state, items: state.items.filter(item => item.id !== action.payload.id) }
            }
            else {
                state.items[cartItemIndex1].quantity -= 1
                return { ...state, items: [...state.items] }
            }
        case 'CLEAR_CART':
            //if cart has one item only and we are deleting that also...then card will become empty so we clear cart..
            state.items = [];
            return state;
        default:
            return state;
    }
}

export default itemreducer;