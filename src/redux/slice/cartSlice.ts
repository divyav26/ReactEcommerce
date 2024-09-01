import {createSlice, PayloadAction} from '@reduxjs/toolkit'



//define the cart item data
interface cartItems {
    id:number,
    title:string,
    price:number
}


interface cartState {
    cartItemData: {
        item: cartItems;
        quantity: number;
    }[];
    totalQuantity: number;
    totalPrice: number;
     
}



const initialState:cartState ={
    cartItemData:[],
    totalQuantity:0,
    totalPrice:0,
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addTocart:(state,action)=>{ 
            const existingItem = state.cartItemData.find(cartItem => cartItem.item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItemData.push({ item: action.payload, quantity: 1 });
            }
            state.totalQuantity += 1;
            state.totalPrice = parseFloat((state.totalPrice + action.payload.price).toFixed(2));
        },
        incrementQuantity:(state,action:PayloadAction<number>)=>{
            const item = state.cartItemData.find(cartItem=>cartItem.item.id === action.payload)
            if(item){
                item.quantity += 1
                state.totalQuantity += 1
                state.totalPrice = parseFloat((state.totalPrice + item.item.price).toFixed(2));
            }
        },

        decrementQuantity:(state, action:PayloadAction<number>)=>{
            const item = state.cartItemData.find(cartItem=>cartItem.item.id === action.payload)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice = parseFloat((state.totalPrice - item.item.price).toFixed(2));
                } else {
                    state.cartItemData = state.cartItemData.filter(cartItem => cartItem.item.id !== action.payload);
                    state.totalQuantity -= 1;
                    state.totalPrice = parseFloat((state.totalPrice - item.item.price).toFixed(2));
                }
            }  
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const item = state.cartItemData.find(cartItem => cartItem.item.id === action.payload);
            if (item) {
                state.cartItemData = state.cartItemData.filter(cartItem => cartItem.item.id !== action.payload);
                state.totalQuantity -= item.quantity;
                state.totalPrice = parseFloat((state.totalPrice - (item.quantity * item.item.price)).toFixed(2));
            }
        },
    }


})
export const {addTocart,incrementQuantity,decrementQuantity,removeItem} =cartSlice.actions
export default cartSlice.reducer