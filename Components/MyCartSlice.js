import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

const MyCartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addServiceToMyCart(state, action) {

            let myindex = -1;

            state.forEach((item, index) => {
                if (item._key === action.payload._key) {
                    myindex = index;
                }
            });

            if (myindex === -1) {
                state.push(action.payload);
            }
        },
        updateServiceInMyCart(state, action) {
            let index = state.findIndex(obj => obj._key === action.payload._key);
            state.splice(index, 1);
        },
        emptyChartItems (state, action){
            console.log("-----------empty cart --------in slice")
            return {
                ...state,
                initialState: []
              };
        }
        
    }
});

export const { addServiceToMyCart, updateServiceInMyCart, emptyChartItems } = MyCartSlice.actions;
export default MyCartSlice.reducer;
