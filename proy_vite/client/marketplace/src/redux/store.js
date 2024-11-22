import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import cartReducer from './CartSlice'
import discountReducer from './DiscountSlice'
import orderReducer from './OrderSlice'
import userReducer from './UserSlice'
import paymentReducer from './PaymentSlice'
import productReducer from './ProductSlice'
import suggestionReducer from './SuggestionSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        discount: discountReducer,
        order: orderReducer,
        user: userReducer,
        payment: paymentReducer,
        product: productReducer,
        suggestion: suggestionReducer,
    },
})