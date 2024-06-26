import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // cartitems: JSON.parse(localStorage.getItem("cartitems")) || [],
  cartitems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.loading = true;
      const index = state.cartitems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        // console.log(action.payload)

        state.cartitems[index] = action.payload;
      } else {
        // console.log(action.payload)
        state.cartitems.push(action.payload);
      }
      // localStorage.setItem("cartitems", JSON.stringify(state.cartitems));
      state.loading = false;
    },
    removeCartItems: (state, action) => {
      (state.loading = true),
        (state.cartitems = state.cartitems.filter(
          (i) => i.productId !== action.payload
        ));
      // console.log(action.payload)

      state.loading = false;
    },
    calculatePrice: (state) => {
      const subtotal = state.cartitems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 250;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.tax + state.shippingCharges - state.discount + state.subtotal;
    },
    discountApplied: (state, action) => {
      // console.log(action.payload)

      state.discount = action.payload;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      // console.log(state.shippingInfo)
    },
    resetCart: () => initialState,
  },
});

export const {
  addtoCart,
  removeCartItems,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
