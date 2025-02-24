import { useParams } from "react-router-dom"

const Article = () => {
    const params = useParams()
    return (
        <div>我是文章页{params.id}</div>
    )
}

export default Article