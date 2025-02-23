import { useEffect, useRef, useState } from 'react'

import _ from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

import './index.css'

// 评论项组件
function CommentItem({ item, onHandleDelete }) {
  return (
    <div className='item' key={item.rpid}>
      <img className='disAva' src={item.user.avatar} alt='touxiang'/>
      <div className='detail'>
        <span>{item.user.uname}</span>
        <div>{item.content}</div>
          <div className='container'>
            <span>{item.ctime}</span>
            <span>点赞数：{item.like}</span>
            {user.uid === item.user.uid && 
              <button className='delBtn' onClick={() => {onHandleDelete(item.rpid)}}>删除</button>
            }
        </div>
      </div>
    </div>
  )
}

// 登录用户数据
const user = {
  uid: '210123',
  avatar: '../logo512.png',
  uname: '张三'
}

// 评论列表数据
// const list = [
//   {
//     rpid: 3,
//     user: {
//       uid: '210123',
//       avatar: '../logo512.png',
//       uname: '张三'
//     },
//     content: '哎哟不错。',
//     ctime: '10-18 08:15',
//     like: 66,
//   },
//   {
//     rpid: 2,
//     user: {
//       uid: '210122',
//       avatar: '../logo512.png',
//       uname: '王五'
//     },
//     content: '我喜欢',
//     ctime: '10-18 07:33',
//     like: 88,
//   },
//   {
//     rpid: 1,
//     user: {
//       uid: '210121',
//       avatar: '../logo512.png',
//       uname: '赵六'
//     },
//     content: '很可以啊！',
//     ctime: '10-18 07:15',
//     like: 99,
//   },
// ]

// tabs
const tabs = [
  {type: 'hotest', text: 'hotest'},
  {type: 'latest', text: 'latest'}
]

function App() {
  const [list, setList] = useState([])
  const [type, setType] = useState(tabs)

  // 获取接口数据
  useEffect(() => {
    // 请求接口
    async function sendRequest() {
        const res = await axios.get('http://localhost:3003/list')
        setList(res.data)
    }
    sendRequest()
  }, [])

  // 删除评论
  const handleDelete = (id) => {
    setList(list.filter(item => item.rpid !== id))
  }

  // tab切换排序规则
  const handleChangeTab = (type) => {
    setType(type)
    if (type === 'hotest') {
      setList(_.orderBy(list, 'like', 'desc'))
    } else {
      setList(_.orderBy(list, 'ctime', 'desc'))
    }
  }
  const inputRef = useRef(null)

  // 发布评论
  const handlePublish = () => {
    const newComment = {
      rpid: uuidV4(),
      user: {
        uid: user.uid,
        avatar: user.avatar,
        uname: user.uname
      },
      content: inputRef.current.value,
      ctime: dayjs(new Date()).format('MM-DD HH:mm'),
      like: 6,
    }
    setList([
      ...list,
      newComment
    ])
    // 清空输入框
    inputRef.current.value = ''
    // 重新聚焦
    inputRef.current.focus()
  }
  return (
    <div className='App'>
      <div className='header'>
        <span className='discuss'>Discuss</span>
        <span className='tab'>
          {tabs.map(item => (
            <span
              className={classNames({active: type === item.type})}
              key={item.type} 
              onClick={() => handleChangeTab(item.type)}
              >
                {item.text}
            </span>
          ))}
        </span>
      </div>
      <div className='main'>
        <img className='avatar' src='../logo512.png'  alt='touxiang'/>
        <input className='input' placeholder='发一条友善的评论' ref={inputRef} />
        <button className='btn' onClick={handlePublish}>发布</button>
      </div>
      <div className='disDiv'>
        {list.map(item => <CommentItem key={item.rpid} item={item} onHandleDelete={handleDelete}/>)}
      </div>
    </div>
  )
}

export default App