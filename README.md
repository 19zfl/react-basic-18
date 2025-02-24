# React18学习笔记

[TOC]



## 1. React基础篇

### 1.1 使用create-react-app快速搭建开发环境

create-react-app 是一个快速创建React开发环境的工具，底层是由Webpack构建，封装了配置细节，开箱即用。

执行命令：

```node
npx create-react-app react-basic
```

1. npx Node.js工具命令，查找并执行后续的包命令；
2. create-react-app 核心包（固定写法），用于创建React项目；
3. react-basic React项目名称（可以自定义）；

还有很多工具：Vite、Nest.js等等都可以搭建React开发环境。

### 1.2 了解JSX

概念：JSX是JavaScript和XML（HTML）的缩写，表示在JS代码中编写HTML模板结构，它是React中编写UI模板的方式。

![image-20250215214518033](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250215214518115.png)

优势：

1. HTML的声明式模板写法；
2. JS的可编程能力。

### 1.3 JSX的本质

JSX并不是标准的JS语法，它是<mark>JS的语法扩展</mark>，浏览器本身不能识别，需要通过<mark>解析工具做解析</mark>之后才能在浏览器中运行。

![image-20250215214931428](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250215214931475.png)

### 1.5 JSX中使用JS表达式

在JSX中可以通过<mark>大括号语法{}</mark>识别JavaScript中的表达式，比如常见的变量、函数调用、方法调用等等。

1. 使用引号传递字符串；
2. 使用JavaScript变量；
3. 函数调用和方法调用；
4. 使用JavaScript对象。

![image-20250215215951821](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250215215951876.png)

注意：if语句、switch语句、变量声明属于语句，不是表达式，不能出现在{}中。

### 1.6 JSX中实现列表渲染

![image-20250215220342162](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250215220342193.png)

语法：在JSX中可以使用原生JS中的<mark>map方法</mark>遍历渲染列表。

![image-20250215221115091](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250215221115126.png)

### 1.8 JSX中实现条件渲染

![image-20250216205704975](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216205705028.png)

语法：在React中，可以通过逻辑与运算符&&、三元表达式（?:）实现基础的条件渲染。

```jsx
{flag && <span>this is span</span>}

{loading ? <span>loading...</span> : <span>this is span</span>}
```

![image-20250216210321616](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216210321651.png)

### 1.9 JSX中实现复杂条件渲染

需求：列表中需要根据文章状态适配三种情况，单图，三图，和无图三种模式。

解决方案：自定义函数+if判断语句。

```jsx
// 定义文章类型
const articleType = 0 // 013

// 定义核心函数：根据文章类型返回不同的JSX模板
function getArticleTem() {
  if (articleType === 0) {
    return <div>我是无图文章</div>
  } else if (articleType === 1) {
    return <div>我是单图文章</div>
  } else {
    return <div>我是三图文章</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 调用函数渲染不同模板 */}
      { getArticleTem() }
    </div>
  );
}
```

### 1.10 React基础事件绑定

语法：<mark>on + 事件名称 = { 事件处理程序 }</mark>， 整体上遵循驼峰命名法。

```jsx
function App() {
  const clickHandler = () => {
    console.log('button被点击了');
    
  }
  return (
    <button onClick={clickHandler}></button>
  )
}
```

### 1.11 使用事件对象参数

语法：在事件回调函数中<mark>设置形参e</mark>。

```jsx
function App() {
  const clickHandler = (e) => {
    console.log('button被点击了', e);
    
  }
  return (
    <button onClick={clickHandler}>按钮</button>
  )
}
```

### 1.12 传递自定义参数

语法：事件绑定的位置改造成<mark>箭头函数</mark>的写法，在执行clickHandler实际处理业务函数的时候传递实参。

```jsx
function App() {
  const clickHandler = (name) => {
    console.log('button被点击了', name);
    
  }
  return (
    <button onClick={() => clickHandler('jack')}>按钮</button>
  )
}
```

注意：不能直接写函数调用，这里事件绑定需要一个<mark>函数引用</mark>。

### 1.13 同时传递事件对象和自定义参数

语法：在事件绑定的位置传递事件实参e和自定义参数，clickHandler中声明形参，注意顺序对应。

```jsx
function App() {
  const clickHandler = (name, e) => {
    console.log('button被点击了', name, e);
    
  }
  return (
    <button onClick={(e) => clickHandler('jack', e)}>按钮</button>
  )
}
```

### 1.15 React组件

概念：一个组件就是用户界面的一部分，它可以有自己的逻辑和外观，<mark>组件之间可以互相嵌套，也可以复用多次</mark>。

![image-20250216214330008](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216214330060.png)

在React中，一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图UI，渲染组件只需要把组件当成标签书写即可。

```jsx
// 自定义组件
function Button() {
  return <button>我是组件Button</button>
}

const NewBtn = () => {
  return <button>我是组件NewBtn</button>
}

function App() {
  return (
    <div>
      {/* 使用自定义组件 */}
      <Button />
      <NewBtn />
    </div>
  )
}
```



## 2. useState

### 2.1 useState基础使用

useState是一个React Hook（函数），它允许我们向组件添加一个<mark>状态变量</mark>，从而控制影响组件的渲染效果。

![image-20250216220056409](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216220056458.png)

本质：和普通JS变量不同的是，状态变量一旦发生变化组件的视图UI也会跟着变化<mark>（数据驱动视图）</mark>。

```jsx
const [count, setCount] = useState(0)
```

1. useState是一个函数，返回值是一个数组；
2. 数组中的第一个参数是状态变量，第二个参数是set函数用来修改状态变量；
3. useState的参数将作为count的初始值。

**useState实现一个计数器按钮**

```jsx
import { useState } from "react"

function App() {
  // 1.调用useState添加一个状态变量
  const [count, setCount] = useState(0)
  // 2.点击按钮回调：调用setCount方法修改count变量
  const handlerClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <button onClick={handlerClick}>{count}</button>
    </div>
  )
}
```

### 2.2 修改状态的规则

**状态不可变**

在React中，状态被认为是只读的，应该始终替换它而不是修改它，直接修改状态不能引发视图更新。

![image-20250216221915121](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216221915153.png)![image-20250216222050387](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216222050421.png)

***********

**修改对象状态**

规则：对于对象类型的状态变量，应该始终传给set方法一个全新的对象来进行修改。

![image-20250216222729271](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216222729348.png)

### 2.3 组件的样式处理

**组件基础样式方案**

React组件基础的样式控制有两种方式。

![image-20250216223716616](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216223716676.png)

### 2.5 受控表单绑定

概念：使用React组件的状态（useState）控制表单的状态。

![image-20250217230720639](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250217230720686.png)

1. 准备一个React状态值；

   ```jsx
   const [value, setValue] = useState('')
   ```

2. 通过value属性绑定状态，通过onChange属性绑定状态同步的函数。

   ```jsx
   <input
     type='text'
     value={value}
     onChange={(e) => setValue(e.target.value)}
   />
   ```

### 2.6 React中获取DOM

在React组件中获取/操作DOM，需要使用useRef钩子函数，分为两步：

1. 使用useRef创建ref对象，并与JSX绑定；

   ```jsx
   const inputRef = uesRef(null)
   
   <input type="text" ref={inputRef} />
   ```

2. 在DOM可用时，通过inputRef.current拿到DOM对象。

   ```jsx
   console.log(inputRef.current)
   ```

案例：

```jsx
const { useRef } = require("react")

function App() {
  const inputRef = useRef('')
  const showDOM = () => {
    console.dir(inputRef.current);
  }
  return (
    <>
      <input type="text" ref={inputRef}/>
      <button onClick={showDOM}>获取DOM</button>
    </>
  )
}
```



## \*案例：B站评论区\*

![image-20250216224013445](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250216224013497.png)

1. 渲染评论列表；
2. 删除评论实现；
3. 渲染导航Tab和高亮实现；
4. 评论列表排序功能实现。

**核心思路**

1. 使用useState维护评论列表；
2. 使用map方法对列表数据进行遍历渲染。

```jsx
const list = [
  {}...
]

const [disList, setDisList] = useState(list)

{disList.map(item => (
	<div className='item' key={item.rpid}>
		<img className='disAva' src={item.user.avatar} alt='touxiang'/>
		<div className='detail'>
			<span>{item.user.uname}</span>
			<div>{item.content}</div>
			<div className='container'>
				<span>{item.ctime}</span>
				<span>点赞数：{item.like}</span>
				<button className='delBtn'>删除</button>
			</div>
		</div>
	</div>
))}
```

### **删除评论实现**

1. 只有自己的评论才显示删除按钮；
2. 点击删除按钮，删除当前评论，列表中不再显示。

核心思路：

1. 删除显示 - 条件渲染；
2. 删除功能 - 拿到当前项id以id为条件对评论列表做filter过滤。

```jsx
const handlerDelete = (id) => {
    setDisList(list.filter(item => item.rpid !== id))
}

<div className='container'>
	<span>{item.ctime}</span>
	<span>点赞数：{item.like}</span>
	{user.uid === item.user.uid && 
		<button className='delBtn' onClick={() => handlerDelete(item.rpid)}>删除</button>
	}
</div>
```

### **渲染Tab+点击高亮实现**

需求：点击哪个tab项，哪个做高亮处理。

核心思路：点击谁就把谁的<mark>type（独一无二的标识）</mark>记录下来，然后和遍历时的<mark>每一项的type做匹配</mark>，谁匹配到就设置负责高亮的类名。

```jsx
const [type, setType] = useState(tabs)

const handleChangeTab = (type) => {
	setType(type)
}

<span className='tab'>
	{tabs.map(item => (
		<span
			className={type === item.type ? 'active' : ''} 
			key={item.type} 
			onClick={() => handleChangeTab(item.type)}
		>
			{item.text}
		</span>
	))}
</span>
```

### classnames优化类名控制

classnames是一个简单的JS库，可以非常方便的通过条件动态控制class类名的显示。

![image-20250217225253430](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250217225253518.png)

```jsx
// 安装库
npm install classnames

// 引入库
import classNames from ‘classnames’

//修改前
className={type === item.type ? 'active' : ''} 

// 修改后
className={classNames({active: type === item.type})}
```

### **排序功能实现**

需求：点击最新，评论列表按照创建时间倒序排列（新的在前），点击最热按照点赞数排序（多的在前）。
核心思路：把评论列表状态数据进行不同的排序处理，当成新值传给set函数重新渲染视图UI。

```jsx
// 排序利用到lodash库
npm install lodash

// 引入
import _ from 'lodash'

const handleChangeTab = (type) => {
    setType(type)
    if (type === 'hotest') {
      setDisList(_.orderBy(list, 'like', 'desc'))
    } else {
      setDisList(_.orderBy(list, 'ctime', 'desc'))
    }
}
```

### 发表评论

1. 获取评论内容；
2. 点击发布按钮发布评论。

```jsx
const inputRef = useRef('')
const handlePublish = () => {
    setDisList([
      ...disList,
      {
        rpid: 4,
        user: {
          uid: user.uid,
          avatar: user.avatar,
          uname: user.uname
        },
        content: inputRef.current.value,
        ctime: '10-18 09:12',
        like: 6,
      },
    ])
}

<input className='input' placeholder='发一条友善的评论' ref={inputRef} />
<button className='btn' onClick={handlePublish}>发布</button>
```

### id处理和事件处理

```jsx
{
    rpid: 100,
    user: {
        uid: '200101',
        avatar: '',
        uname: 'nick'
    },
    content: content,
    ctime: '10-19 09:11',
    like: 12,
}
```

1. rpid要求一个唯一的随机数id -uuid；
2. ctime要求以当前时间为标准，生成固定格式 -dayjs。

```jsx
	{
        rpid: uuidV4(),
        user: {
          uid: user.uid,
          avatar: user.avatar,
          uname: user.uname
        },
        content: inputRef.current.value,
        ctime: dayjs(new Date()).format('MM-DD HH:mm'),
        like: 6,
      },
```

### 清空内容并重新聚焦

![image-20250221152337199](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221152337239.png)

1. 清空内容 - 把控制input框的value状态设置为空串；
2. 重新聚焦 - 拿到input的dom元素，调用focus方法。

```jsx
// 清空输入框
inputRef.current.value = ''
// 重新聚焦
inputRef.current.focus()
```



## 3. 组件通信

概念：组件通信就是<mark>组件之间的数据传递</mark>，根据组件嵌套关系的不同，有不同的通信方法。

![image-20250221154350937](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221154351014.png)

### 3.1 父传子-基础实现

![image-20250221154443088](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221154443234.png)

实现步骤：

1. 父组件传递数据 - 在子组件标签上绑定属性；
2. 子组件接收数据 - 子组件通过props参数接收数据。

### 3.2 父传子-props说明

1. props可传递任意的数据；

   数字、字符串、布尔值、数组、对象、函数、JSX；

![image-20250221161622383](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221161622463.png)

2. props是只读对象；

   子组件只能读取props中的数据，不能直接进行修改，父组件的数据只能由父组件修改。

### 3.3 父传子-特殊的prop children

场景：当我们把内容嵌套在子组件标签中时，父组件会自动在名为children的prop属性中接收该内容。

![image-20250221162454215](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221162454272.png)

```jsx
function Container(props) {
    console.log(props);
    return (
        <div>{props.children}</div>
    )
}

function App() {
    return (
        <div>
            <Container>
                <span>sss</span>
            </Container>
        </div>
    )
}
```

### 3.5 父子组件通信-子传父

![image-20250221202145486](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221202145585.png)

核心思路：在子组件中调用父组件中的函数并传递参数。

![image-20250221202434354](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221202434418.png)

```jsx
import { useState } from "react"

function Son({onGetSonMsg}) {
    const sonMsg = '子组件传递给父组件的消息'
    return (
        <div>
            this is Son&nbsp;
            <button onClick={() => {onGetSonMsg(sonMsg)}}>send</button>
        </div>
    )
}

function App() {
    const [msg, setMsg] = useState('')
    const getSonMsg = (sonMsg) => {
        console.log(sonMsg);
        setMsg(sonMsg)
    }
    return (
        <>
            this is App
            <Son onGetSonMsg={getSonMsg}/>
            消息：{msg?msg:"空"}
        </>
    )
}
```

### 3.6 使用状态提升实现兄弟组件通信

![image-20250221210751483](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221210751606.png)

实现思路：借助 “状态提升” 机制，通过父组件进行兄弟组件之间的数据传递。

1. A组件先通过子传父的方式把数据传给父组件App；
2. App拿到数据后通过父传子的方式在传递给B组件。

```jsx
import { useState } from "react"

function A({onGetAMsg}) {
    const aMsg = '这是一条消息'
    return (
        <div>
            this is A component.&nbsp;
            <button onClick={() => {onGetAMsg(aMsg)}}>send</button>
        </div>
    )
}

function B({msg}) {
    return (
        <div>
            this is B component.<br/>
            来自A组件的消息：{msg?msg:'null'}
        </div>
    )
}

function App() {
    const [msg, setMsg] = useState('')
    const getMessage = (message) => {
        console.log(message);
        setMsg(message)
    }
    return (
        <div>
            this is App
            <A onGetAMsg={getMessage}/>
            <B msg={msg}/>
        </div>
    )
}
```

### 3.8 使用Context机制跨层级组件通信

![image-20250221213747924](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221213748023.png)

实现步骤：

1. 使用createContext方法创建一个上下文对象Ctx；
2. 在顶层组件（App）中通过Ctx.Provider组件提供数据；
3. 在底层组件（B）中通过useContext钩子函数获取消费数据。

```jsx
import { createContext, useContext } from "react"

const MsgContext = createContext()

function A() {
    return (
        <div>
            this is A component.
            <B />
        </div>
    )
}

function B() {
    const msg = useContext(MsgContext)
    return (
        <div>
            this is B component.<br/>
            {msg}
        </div>
    )
}

function App() {
    const msg = "this is App'msg"
    return (
        <div>
            this is App.
            <MsgContext value={msg}>
                <A />
            </MsgContext>
        </div>
    )
}
```



## 5. useEffect

概念理解：useEffect是一个React Hook函数，用于在React组件中创建不是由事件引起而是由渲染本身引起的操作，比如发送Ajax请求，更改DOM等。

![image-20250221214213099](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221214213172.png)

说明：上面的组件中没有发生任何的用户事件，组件渲染完毕之后就需要和服务器要数据，整个过程属于“只由渲染引起的操作“。

### 5.1 useEffect基础使用

需求：在组件渲染完毕之后，立刻从服务端获取频道列表数据并显示到页面中。

语法：`useEffect(() => { }, [])`

参数1是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的操作；

参数2是一个数组（可选参），在数组里放置依赖项，不同依赖会影响第一个参数函数的执行，当是一个空数组的时候，副作用函数只会在组件渲染完毕之后执行一次。	

demo代码：

```jsx
import { useEffect, useState } from "react"

const api = 'https://geek.itheima.net/v1_0/channels'

function App() {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            const res = await fetch(api)
            const data = await res.json()
            console.log(data);
            setList(data.data.channels)
        }
        getList()
    }, [])

    return (
        <div>
            this is App
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}
```

### 5.2 useEffect依赖项参数说明

useEffect副作用函数的执行时机存在多种情况，根据传入依赖项的不同，会有不同的执行表现。

| 依赖项         | 副作用函数执行时机                |
| -------------- | --------------------------------- |
| 没有依赖项     | 组件初始渲染+组件更新时机         |
| 空数组依赖     | 只在初始渲染时执行一次            |
| 添加特定依赖项 | 组件初始渲染+特定依赖项变化时执行 |

```jsx
import { useEffect, useState } from "react"

function App() {
    // 1. 没有依赖项 初始 + 组件更新
    // useEffect(() => {
    //     console.log('useEffect被执行了');
    // })
    const [count, setCount] = useState(0)

    // 2. 空依赖项 只在初始渲染时执行一次
    // useEffect(() => {
    //     console.log('useEffect被执行了');
    // },[])

    // 3. 添加特定依赖项 组件初始渲染 + 特定依赖项变化时执行
    useEffect(() => {
        console.log('useEffect被执行了');
    },[count])

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>+:{count}</button>
        </div>
    )
}
```

### 5.3useEffect - 清楚副作用

在useEffect中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，比如useEffect中开启了一个定时器，想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用。

```jsx
useEffect(() => {
    // 实现副作用操作逻辑
    return() => {
        // 清楚副作用逻辑
    }
}, [])
```

说明：清楚副作用的函数最常见的执行时机是在组件卸载时自动执行。

需求：在Son组件渲染时开启一个定时器，卸载时清楚这个定时器。

```jsx
import { useEffect, useState } from "react"

function Son() {
    useEffect(() => {
        // 副作用逻辑
        const timer = setInterval(() => {
            console.log('定时器执行中。。。')
        }, 1000)
        return () => {
            // 清楚副作用
            clearInterval(timer)
        }
    }, [])
    return (
        <div>
            this is Son
        </div>
    )
}

function App() {
    const [show, setShow] = useState(true)
    return (
        <div>
            {show && <Son />}
            <button onClick={() => {setShow(false)}}>clear</button>
        </div>
    )
}
```



## 6. 自定义Hook函数

概念：自定义Hook是以use打头的函数，通过自定义Hook函数可以用来实现逻辑的封装和复用。

![image-20250221225028514](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221225028636.png)

不封装直接实现

```jsx
import { useState } from "react"

function App() {
    const [show, setShow] = useState(true)
    const toggle = () => setShow(false)
    return (
        <div>
            {show && <div>this is a div</div>}
            <button onClick={toggle}>toggle</button>
        </div>
    )
}
```

使用自定义Hook函数：

```jsx
import { useState } from "react"

function useToggle() {
    const [show, setShow] = useState(true)
    const toggle = () => setShow(!show)
    return {
        show,
        toggle
    }
}

function App() {
    const {show, toggle} = useToggle()
    return (
        <div>
            {show && <div>this is a div</div>}
            <button onClick={toggle}>toggle</button>
        </div>
    )
}
```

封装自定义Hook通用思路：

1. 声明一个以use打头的函数；
2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）；
3. 把组件中用到的状态或者回调return出去（以对象形式或数组）；
4. 在哪个组件中要用到这个逻辑，就执行这个函数，结构出来状态和回调进行使用。



## 8. React Hooks使用规则

使用规则：

1. 只能在组件中或者其他自定义Hook函数中调用；
2. 只能在组件的顶层调用，不能嵌套在if、for、其他函数中。



## \*\*案例：优化B站评论\*\*

![image-20250221231114044](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250221231114114.png)

优化需求1：

1. 使用请求接口的方式获取评论列表并渲染；
2. 使用自定义Hook函数封装数据请求的逻辑；
3. 把评论中的每一项抽象成一个独立的组件实现渲染。

通过接口获取评论列表

1. 使用json-server工具模拟接口服务，通过axios发送接口请求，json-server是一个快速以`.json`文件作为数据源模拟接口服务的工具，axios是一个广泛使用的前端请求库；

   ```json
   "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject",
       "mock": "json-server db.json --port 3003"
     },
   ```

   ```cmd
   npm run mock // 启动服务
   ```

2. 使用useEffect调用接口获取数据。

```jsx
useEffect(() => {
    // 请求接口
    async function sendRequest() {
        const res = await axios.get('http://localhost:3003/list')
        console.log(res);
    }
    sendRequest()
}, [])
```

优化需求2 - 自定义Hook函数封装数据请求：

1. 编写一个Hook函数；
2. 函数内部编写封装的逻辑；
3. return 出去组件中用到的状态和方法；
4. 组件中调用函数解构赋值使用。

![image-20250222231943257](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250222231943349.png)

优化需求3 - 封装评论项Item组件：

![image-20250222232148923](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250222232148990.png)

抽象原则：App作为“智能组件”负责数据的获取，Item作为“UI组件”负责数据渲染。

```jsx
{list.map(item => <CommentItem key={item.rpid} item={item} onHandleDelete={handleDelete}/>)}

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
```



## 9. Redux

Redux是React最常用的集中状态管理工具，类似于Vue中的Pinia（Vuex），可以独立于框架运行。

作用：通过集中管理的方式管理应用的状态。

![image-20250223134502557](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223134502636.png)

### 9.1 Redux快速体验

不和任何框架绑定，不使用任何构建工具，使用纯Redux实现计数器。

![image-20250223134723952](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223134724003.png)

思路：

1. 定义一个reducer函数（根据当前想要做的修改返回一个新的状态）；
2. 使用createStore方法传入reducer函数生成一个store实例对象；
3. 使用store实例的subscribe方法订阅数据的变化（数据一旦变化，可以得到通知）；
4. 使用store实例的dispatch方法提交action对象触发数据变化（告诉reducer怎么修改数据）；
5. 使用store实例的getState方法获取最新的状态数据更新到视图中。

```html
<button id="decrement">-</button>
<span id="count">0</span>
<button id="increment">+</button>
<script>
    // 1.定义reducer函数
    // 作用：根据不同的action对象，返回不同的新的state
    // state：管理的数据初始状态
    // action：对象type标记当前想要执行的操作
    function reducer(state = {count:0}, action) {
        if (action.type === 'INCREMENT') {
            return { count:state.count + 1 }
        }
        if (action.type === 'DECREMENT') {
            return { count:state.count - 1 }
        }
        return state
    }
    // 2.使用reducer函数生成store实例
    const store = Redux.createStore(reducer)
    // 3.通过store实例的subscribe订阅数据变化 
    // 回调函数在每次state发生变化的时候自动执行
    store.subscribe(() => {
    // 5.通过store实例的getState方法获取最新状态更新到视图中
        document.getElementById('count').innerText=store.getState().count
    })
    // 4.通过store实例的dispatch函数提交action更改状态
    const inBtn = document.getElementById('increment')
    inBtn.addEventListener('click', () => {
        store.dispatch({
            type:'INCREMENT'
        })
    })
    const deBtn = document.getElementById('decrement')
    deBtn.addEventListener('click', () => {
        store.dispatch({
            type:'DECREMENT'
        })
    })
</script>
```

### 9.2 Redux管理数据流程梳理

![image-20250223143058959](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223143059025.png)

为了职责清晰，数据流向明确，Redux把整个数据修改的流程分为了三个核心概念，分别是：state、action和reducer。

1. state：一个对象，存放管理的数据状态；
2. action：一个对象，描述怎么修改数据；
3. reducer：一个函数，根据action的描述生成一个新的state。

### 9.3 Redux与React

#### 9.3.1 配套工具

在React中使用Redux，要求安装两个插件：Redux Toolkit 和 react-redux。

```cmd
npm install @reduxjs/toolkit react-redux
```

1. Redux Toolkit（RTK）- 官方推荐编写Redux逻辑的方式，是一套工具的集合集，简化书写方式；

![image-20250223143732254](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223143732313.png)

2. react-redux - 用来链接Redux和React组组件的中间件。

![image-20250223143806205](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223143806271.png)

#### 9.3.2 store目录结构设计

![image-20250223144434749](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223144434803.png)

1. 通常集中状态管理的部分都会单独创建一个store目录；
2. 应用通常会有很多个子store模块，所以创建一个modules目录，在内部编写业务分类的子store；
3. store中的入口文件index.js的作用是组合modules中所有的子模块，并导出store。

#### 9.3.3 整体路径熟悉

![image-20250223144949962](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223144950050.png)

#### 9.3.5 使用React Toolkit创建counterStore

![image-20250223145343908](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223145344031.png)

#### 9.3.6 为React注入store

react-redux负责把Redux和React链接起来，内置Provider组件通过store参数把创建好的store实例注入到应用中，链接正式建立。

![image-20250223170323295](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223170323389.png)

#### 9.3.8 React组件使用store中的数据

在React组件中使用store中的数据，需要用到一个钩子函数 - useSelector，它的作用是把store中的数据映射到组件中，使用样例如下：

![image-20250223170608942](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223170609026.png)

#### 9.3.9 React组件修改store中的数据

React组件中修改store中的数据需要借助另外一个Hook函数 - useDispatch，它的作用是生成提交action对象的dispatch函数，使用样例如下：

```jsx
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "./store/modules/counterStore"

function App() {
    
    const { count } = useSelector(state => state.counter)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>This is App Component.</h1>
            <button onClick={() => dispatch(decrement())}>-</button>
            <span style={{fontSize:30}}>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}
```

### 9.5 Redux与React - 提交action传参

需求说明：

![image-20250223172451628](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223172451691.png)

组件中有两个按钮，可以直接把count修改到某一指定的值，目标count值是在组件中传递过去的，需要在提交action的时候传递参数。

#### 9.5.1 提交action传参实现需求

在reducers的<mark>同步修改方法</mark>中添加action对象参数，在调用actionCreator的时候传递参数，参数会被传递到action对象payload属性上。

```js
// counterStore.js
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
```

```js
// App.js
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement, addToNum, cutToNum } from "./store/modules/counterStore"

function App() {
    
    const { count } = useSelector(state => state.counter)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>This is App Component.</h1>
            <button onClick={() => dispatch(cutToNum(20))}>-20</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <span style={{fontSize:30}}>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addToNum(20))}>+20</button>
        </div>
    )
}
```

### 9.6 Redux与React - 异步状态操作

需求理解：

![image-20250223173629167](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223173629275.png)

异步操作思路：

1. 创建store的写法保持不变，配置好同步修改状态方法；
2. 单独封装一个函数，在函数内部return一个新函数，在新函数中：
   1. 封装异步请求获取数据；
   2. 调用同步actionCreater传入异步数据生成一个action对象，并使用dispatch提交；
3. 组件中dispatch的写法保持不变。

```js
// App.js
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
```

```js
// channelStore.js
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
```

```js
// ./store/index.js
const store = configureStore({
    reducer: {
        counter: countReducer,
        channel: channelReducer // 新增
    }
})
```

### 9.8 Redux调试 - devtools

Chrome安装扩展：Redux DevTools

![image-20250223225246586](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250223225246737.png)



## 10. ReactRouter

什么是前端路由：

一个路径path对应一个组件component当我们在浏览器中访问一个path的时候，path对应的组件会在页面中进行渲染。

```js
const routes = [
    {
        path: '/about',
        component: About
    },
    {
        path: '/article',
        component: Article
    }
]
```

创建路由开发环境：采用CRA创建项目的方式进行基础环境配置。

1. 创建项目并安装所有依赖：

   ```cmd
   npx create-react-app react-router-pro
   
   npm i
   ```

2. 安装最新的ReactRouter包：

   ```cmd
   npm i react-router-dom
   ```

3. 启动项目：

   ```cmd
   npm run start
   ```

### 10.1 快速开始

需求：创建一个可以切换登录页和文章页的路由系统。

![image-20250224151430288](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224151430355.png)

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const route = createBrowserRouter([
  {
    path: '/login',
    element: <div>login</div>
  },
  {
    path: '/article',
    element: <div>article</div>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={route}>
    <App />
  </RouterProvider>
);
```

### 10.2 抽离路由模块

实际开发中的router配置

![image-20250224152641727](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224152641806.png)

```js
// /page/login/index.js
const Login = () => {
    return (
        <div>我是登录页</div>
    )
}

export default Login
```

```js
// /page/article/index.js
const Article = () => {
    return (
        <div>我是文章页</div>
    )
}

export default Article
```

```js
// /router/index.js
import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article',
        element: <Article />
    }
])

export default router
```

```js
// ../index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
```

### 10.3 路由导航

什么是路由导航：

路由系统中的多个路由之间需要进行路由跳转，并且在跳转的同时有可能需要传递参数进行通信。

![image-20250224153615797](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224153615853.png)

声明式导航：

声明式导航是指通过在模板中通过`<Link/>`组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行。

```js
<Link to="/article">文章</Link>
```

语法说明：通过组件的to属性指定要跳转到路由path，组件会被渲染为浏览器支持的a链接，如果需要传参直接通过字符串拼接的方式拼接参数即可。

编程式导航

编程式导航是指通过`useNavigate`钩子得到导航方法，然后通过调用方法以命令式的形式进行路由跳转，比如想在登录请求完毕之后跳转就可以选择这种方式，更加灵活。

```js
const login = () => {
    const navigate = useNavigate()
    return (
    	<div>
        	woshidengluye
        	<button onClick={() => navigate('/article')>跳转到文章</button>
        </div>
    )
}
```

语法说明：通过调用navigate方法传入地址path实现跳转。

### 10.5 导航传参

路由导航传参1：

![image-20250224154748145](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224154748214.png)

```js
// /login/index.js
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            我是登录页
            <Link to={'/article'}>跳转到文章</Link>
            <button onClick={() => navigate('/article')}>跳转到文章</button>
            <button onClick={() => navigate('/article?id=1001&name=jack')}>searchParams传参</button>
        </div>
    )
}
```

```js
// /article/index.js
import { useSearchParams } from "react-router-dom"

const Article = () => {
    const [params] = useSearchParams()
    return (
        <div>我是文章页{params.get('id')}{params.get('name')}</div>
    )
}
```

路由导航传参2：

![image-20250224155557684](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224155557757.png)

```js
// /router/index.js
import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article/:id',
        element: <Article />
    }
])
```

```js
// /login/index.js
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            我是登录页
            <button onClick={() => navigate('/article/1001')}>params传参</button>
        </div>
    )
}
```

```js
// /article/index.js
import { useParams } from "react-router-dom"

const Article = () => {
    const params = useParams()
    return (
        <div>我是文章页{params.id}</div>
    )
}
```

### 10.6 嵌套路由

什么是嵌套路由

在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称二级路由，例如：

![image-20250224160754389](C:\Users\zengf\AppData\Roaming\Typora\typora-user-images\image-20250224160754389.png)

嵌套路由配置

实现步骤：

1. 使用children属性配置路由嵌套关系
2. 使用`<Outlet/>`组件配置二级路由渲染位置

![image-20250224191405217](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224191405333.png)

```js
const About = () => {
    return (
        <div>我是关于页</div>
    )
}
```

```js
const Board = () => {
    return (
        <div>我是面板页</div>
    )
}
```

```js
import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            我是一级路由Layout
            <Link to='/about'>关于</Link>
            <Link to='/board'>面板</Link>
            {/* 配置二级路由 */}
            <Outlet />
        </div>
    )
}
```

```js
import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/layout";
import About from "../page/about";
import Board from "../page/board";

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
                path: '/board',
                element: <Board />
            }
        ]
    }
])
```

### 10.8 默认二级路由

场景和配置方式

当访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置去掉path，设置index属性为true。

![image-20250224193311547](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/20250224193311635.png)

```js
// /router/index.js
import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/layout";
import About from "../page/about";
import Board from "../page/board";

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
    }
])

export default router
```

```js
// /layout/index.js
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
```

### 10.9 404路由配置

404路由

场景：当浏览器输入url的路径在整个路由配置中都找不到对应的path，为了用户体验，可以使用404兜底组件进行渲染。

实现步骤：

1. 准备一个NotFound组件；
2. 在路由表数组的末尾，以*号作为路由path配置路由。

```js
// 404.js
const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
        </div>
    )
}
```

```js
// /router/index.js
import { createBrowserRouter } from "react-router-dom";
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
    ...
    {
        path:'*',
        element: <NotFound />
    }
])
```

### 10.10 路由两种模式

各个主流框架的路由常用的路由模式有两种，history模式和hash模式，ReactRouter分别由createBrowerRouter和createHashRouter函数负责创建。

| 路由模式 | url表现     | 底层原理                    | 是否需要后端支持 |
| -------- | ----------- | --------------------------- | ---------------- |
| history  | url/login   | history对象 + pushState事件 | 需要             |
| hash     | url/#/login | 监听hashChange事件          | 不需要           |





















## 库

| 库名        | 功能                                 |
| ----------- | ------------------------------------ |
| lodash      | 列表排序                             |
| classnames  | 优化类名控制                         |
| uuid        | 唯一随机数生成                       |
| dayjs       | 时间格式处理                         |
| json-server | 以json文件作为数据源模拟接口服务工具 |
| axios       | 前端请求库                           |

