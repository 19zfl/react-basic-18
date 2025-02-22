import { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './index.css'

const user = {
  uid: '210123',
  avatar: '../logo512.png',
  uname: '张三'
}

const list = [
  {
    rpid: 3,
    user: {
      uid: '210123',
      avatar: '../logo512.png',
      uname: '张三'
    },
    content: '哎哟不错。',
    ctime: '10-18 08:15',
    like: 66,
  },
  {
    rpid: 2,
    user: {
      uid: '210122',
      avatar: '../logo512.png',
      uname: '王五'
    },
    content: '我喜欢',
    ctime: '10-18 07:33',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '210121',
      avatar: '../logo512.png',
      uname: '赵六'
    },
    content: '很可以啊！',
    ctime: '10-18 07:15',
    like: 99,
  },
]

const tabs = [
  {type: 'hotest', text: 'hotest'},
  {type: 'latest', text: 'latest'}
]

function App() {
  const [disList, setDisList] = useState(list)
  const [type, setType] = useState(tabs)
  const handleDelete = (id) => {
    setDisList(list.filter(item => item.rpid !== id))
  }
  const handleChangeTab = (type) => {
    setType(type)
    if (type === 'hotest') {
      setDisList(_.orderBy(list, 'like', 'desc'))
    } else {
      setDisList(_.orderBy(list, 'ctime', 'desc'))
    }
  }
  return (
    <div className='App'>
      <div className='header'>
        <span className='discuss'>Discuss{list.length}</span>
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
        <input className='input' placeholder='发一条友善的评论'/>
        <button className='btn'>发布</button>
      </div>
      <div className='disDiv'>
        {disList.map(item => (
          <div className='item' key={item.rpid}>
            <img className='disAva' src={item.user.avatar} alt='touxiang'/>
            <div className='detail'>
              <span>{item.user.uname}</span>
              <div>{item.content}</div>
              <div className='container'>
                <span>{item.ctime}</span>
                <span>点赞数：{item.like}</span>
                {user.uid === item.user.uid && 
                  <button className='delBtn' onClick={() => handleDelete(item.rpid)}>删除</button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App