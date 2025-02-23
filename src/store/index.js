import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./modules/counterStore";
import channelReducer from "./modules/channelStore";

const store = configureStore({
    reducer: {
        counter: countReducer,
        channel: channelReducer
    }
})

export default store