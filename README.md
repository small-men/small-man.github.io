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

- 抽取 fetch

fetch 只有在网络异常返回结果才会被 catch 所捕获
axios 则是请求失败返回结果也同样会被 catch 捕获

- React hook 不能使用在函数中，仅仅使用在自定义 HOOK 或者 React Component 当中

- 异步代码与同步代码 存在差异性，当异步代码执行结果为返回，而同步代码已执行将导致结果偏差
  在页面持久化实践中，由于刷新页面，会获取 localStorage 中 TOKEN 并发送异步请求
  请求结果为返回时，可能将导致页面退出登录状态
  当请求结果返回后，

- utility type

1. Partial<T>: 选择 T 中任意属性类型或不选
2. Omit<T,U>: 忽略 T 中指定类型
3. Pick<T,U>: 选择 T 中指点类型
4. Exclude<T,U>

- Partial 的实现
  type Partial<T> = {
  [P in keyof T]?: T[P];
  };

  - (keyof T): 获取 T 中的属性并转换为字符串的联合联合类型
  - (P in keyof T)?: 遍历联合联合类型,并将其作为可选项
  - (T[P]): 属性对应值

- Pick 的实现
  type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
  };

  - (K extends keyof T): 约束挑选属性必须是 T 键集合的子集
  - ([P in K]: T[P]): 传入属性与对应值匹配

- Exclude 的实现
  type Exclude<T, U> = T extends U ? never : T;
  若 U 在 T 的约束访问内，则返回 never,即被排除
  否则返回 T

- Omit 的实现
  type Omit<T, K extends keyof any>
  = Pick<T, Exclude<keyof T, K>>;

  - (Exclude<keyof T, K>):排除掉 T 中的对应 K 的键集
  - (Pick<T, Exclude<keyof T, K>>): 挑选剩余 K 的键值对
