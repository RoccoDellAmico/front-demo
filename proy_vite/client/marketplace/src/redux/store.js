import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import cartReducer from './CartSlice'
import discountReducer from './DiscountSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        discount: discountReducer,
    },
})