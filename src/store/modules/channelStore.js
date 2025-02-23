import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const channelStore = createSlice({
    name: 'channelStore',
    initialState: {
        channelList:[]
    },
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload
        }
    }
})

const requestAjax = () => {
    return async (dispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannels(res.data.data.channels))
    }
}

const { setChannels } = channelStore.actions

const channelReducer = channelStore.reducer

export { requestAjax }

export default channelReducer