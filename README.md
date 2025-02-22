# React18学习笔记



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

















## 库

| 库名        | 功能                                 |
| ----------- | ------------------------------------ |
| lodash      | 列表排序                             |
| classnames  | 优化类名控制                         |
| uuid        | 唯一随机数生成                       |
| dayjs       | 时间格式处理                         |
| json-server | 以json文件作为数据源模拟接口服务工具 |
| axios       | 前端请求库                           |

