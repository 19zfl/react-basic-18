import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>404</h1>
            <button onClick={() => navigate('/')}>返回主页</button>
        </div>
    )
}

export default NotFound