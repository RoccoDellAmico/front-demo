import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import cartReducer from './CartSlice'
import discountReducer from './DiscountSlice'
import orderReducer from './OrderSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        discount: discountReducer,
        order: orderReducer,
    },
})