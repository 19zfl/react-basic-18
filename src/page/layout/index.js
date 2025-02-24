import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            我是一级路由Layout
            <Link to='/about'>关于</Link>
            <Link to='/'>面板</Link>
            {/* 配置二级路由 */}
            <Outlet />
        </div>
    )
}

export default Layout