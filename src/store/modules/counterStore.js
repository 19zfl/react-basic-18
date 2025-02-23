import { createSlice } from "@reduxjs/toolkit";

const countStore = createSlice({
    // 名字
    name: 'counter',
    // 初始化状态
    initialState: {
        count: 0
    },
    // 修改状态的方法 同步修改方法
    reducers: {
        increment(state) {
            state.count ++
        },
        decrement(state) {
            state.count --
        },
        addToNum(state, action) {
            state.count += action.payload
        },
        cutToNum(state, action) {
            state.count -= action.payload
        }
    } 
})

// 解构出来actionCreator函数
const { increment, decrement, addToNum, cutToNum } = countStore.actions

// 获取reducer
const countReducer = countStore.reducer

// 导出
export { increment, decrement, addToNum, cutToNum }

export default countReducer