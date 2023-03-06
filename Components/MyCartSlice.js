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
        }
    }
});

export const { addServiceToMyCart, updateServiceInMyCart } = MyCartSlice.actions;
export default MyCartSlice.reducer;
