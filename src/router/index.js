import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";
import Layout from "../page/layout";
import About from "../page/about";
import Board from "../page/board";
import NotFound from "../404"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/about',
                element: <About />
            },
            {
                index: 'true',
                element: <Board />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article/:id',
        element: <Article />
    },
    {
        path:'*',
        element: <NotFound />
    }
])

export default router