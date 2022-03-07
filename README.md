# 使用 create-react-app 初始化 React 项目

- src --源代码文件夹(参与打包)
  index.tsx --入口文件
  App.tsx --App 本身
  react-app-env.d.ts --预定义 typescript 类型
  setupTests.ts --配置单元测试
- public --静态文件夹(不参与打包)
  index.html --App 页面
  favicon.ico --偏爱图标
  manifest.json --配置 pwa
  robots.txt --配置爬虫规则

- .gitignore --git 忽略文件

- package.json --项目入口文件(描述项目名称、版本、依赖)

- README.md --项目说明文件

- tsconfig.json --配置 typescript

- package-lock.json --依赖版本锁定文件

# 使用 jsx 渲染列表

- 额外知识点

1. decodeURIComponent() 解析 RUI 编码
2. encodeURIComponent() 编码

- 创建工程列表页面

1. 创建入口文件
2. 创建搜索组件
3. 创建列表组件
4. 整合组件

- 状态提升

1. 将组件状态抽取到入口文件
2. 通过 props 传递给子组件

- 修改 json-server 监听端口
  --port 3001

- 配置环境变量

1. 创建环境变量文件
   - .env
   - .env.development
2. 声明请求 URL 变量
   - REACT_APP_API_URL = http://localhost:3001
3. 使用环境变量声明的 URL
   - const apiUrl = process.env.REACT_APP_API_URL

- 使用 mock

- 初始化 users

- 创建工具类

1. 处理空参对象

- 自定义 hook

1. 注意

   - hook 只能在组件中 或 自定义 hook 中运行
   - hook 不能在函数中运行
   - 自定义 hook 必须使用 use 前缀

2. 自定防抖 hook
   - 创建监听 param 状态 hook
   - 当 param 发生变化时，开启一个定时器，将关闭定时器的函数作为 useEffect 的回调函数
   - 当下一次触发 useEffect 就会执行关闭定时器的回调
   - 最终返回新的对象

- useContext

使用 useContext 管理用户状态

1. 声明用户状态接口类型，并为其赋初始值
2. 包装用户状态函数，将函数或对象交托给 Provider 组件
3. 自定义 hook 消费
4. 定义顶层 Provider 组件包裹整个 App 应用
