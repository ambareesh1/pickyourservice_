import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';

const MyServiceSlice = createSlice({
    name: 'service',
    initialState: [],
    reducers: {
        addMyServices(state, action) {
            state.push(action.payload);
        },
        updateMyServices(state, action) {
            let categoryIndex = action.payload.categoryIndex;
            let serviceIndex = action.payload.serviceIndex;
            console.log("--------category---------");
            console.log(action.payload);
            if (state.length > 0) {
                state[categoryIndex].subCategories[serviceIndex].details.map((item, index) => {
                    if (item._key == action.payload._key) {
                        item.isActive = !item.isActive;
                    }
                })
            }
        }
    }
})

export const { addMyServices, updateMyServices } = MyServiceSlice.actions;
export default MyServiceSlice.reducer;