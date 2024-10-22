import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false,
    canCloseSessions: false,
};

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId,name ,quantity, price, discount  } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
            } else {
                state.items.push({ productId, quantity, price, discount, name });
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            
            if (indexProductId >= 0) {
                if (quantity > 0) {
                    state.items[indexProductId].quantity = quantity;
                } else {
                    state.items = state.items.filter(item => item.productId !== productId);
                }
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = []; 
            localStorage.removeItem("carts");
        },
        toggleStatusTab(state) {
            state.statusTab = !state.statusTab; 
        },
        setCanCloseSessions(state, action) {
            state.canCloseSessions = action.payload; 
        },
    }
});

export const { addToCart, changeQuantity, toggleStatusTab, clearCart, setCanCloseSessions } = cartSlice.actions;
export default cartSlice.reducer;
