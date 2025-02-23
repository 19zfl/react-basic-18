import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { requestAjax } from "./store/modules/channelStore"

function App() {
    // 拿到store中的channels数据
    const {channelList} = useSelector(state => state.channel)
    const dispatch = useDispatch()
    // 执行请求获取数据
    useEffect(() => {
        dispatch(requestAjax())
    }, [dispatch])
    return (
        <div>
            <h1>This is App Component.</h1>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default App