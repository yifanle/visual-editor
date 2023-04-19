```
       __     ___                 _   _____    _ _ _             
       \ \   / (_)___ _   _  __ _| | | ____|__| (_) |_ ___  _ __ 
        \ \ / /| / __| | | |/ _` | | |  _| / _` | | __/ _ \| '__|
         \ V / | \__ \ |_| | (_| | | | |__| (_| | | || (_) | |   
          \_/  |_|___/\__,_|\__,_|_| |_____\__,_|_|\__\___/|_|   
                                                           

```
Visual-Editor是一个可视化拖拽编辑器，可拖拽左侧物料区组件，放置在中间画布中，并支持组件样式、属性、事件编辑。<br/>
<a target="_blank" href="http://anyapp.run:3000/#/editor">项目预览地址</a> <br/>
#### 可以用它：
> 可视化搭建表单<br/>
> 低代码、可视化设计移动端、PC网页端页面设计<br/>

#### 我们的不同：<br/>
> 不止拖拽：<br/>
> 将实现自定义组件像画画一样简单！<br/>
> 丰富的社区内容：<br/>
> 敬请期待！

#### 技术栈：<br/>
> `前端：`
> - vue3
> - TypeScript
> - pinia
> - vue-router <br/>
>
>`后端：暂未启动开发`<br/>
> - java
> - springboot
> - ······

#### 前端项目目录介绍：
```
workflow-editor
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ scss
│  │  │  └─ element-plus.scss
│  │  └─ vue.svg
│  ├─ components  # 系统组件
│  │  ├─ admin    # 项目留存的admin系统的接口文件夹，
│  │  │  │        # 用于存放admin系统的组件
│  │  │  └─ menu
│  │  │     └─ index.vue
│  │  ├─ common   # 公用组件
│  │  │  └─ header
│  │  │     └─ index.vue
│  │  ├─ editor   # 编辑器组件
│  │  │  ├─ configArea  # 右侧属性编辑区
│  │  │  │  └─ index.vue
│  │  │  ├─ mainCanvas  # 中间画布
│  │  │  │  └─ index.vue
│  │  │  ├─ materials   # 左侧物料组件区
│  │  │  │  └─ index.vue
│  │  │  └─ weRender    # Item渲染组件
│  │  │     └─ index.vue
│  │  └─ svgIcon
│  │     └─ index.vue
│  ├─ interface         # Model类型
│  │  ├─ IDataModel.ts
│  │  ├─ IDragState.ts
│  │  ├─ IMaterialsData.ts
│  │  └─ IRenderItem.ts
│  ├─ layouts           # 项目布局，支持admin系统布局
│  │  ├─ admin.vue
│  │  ├─ editor.vue
│  │  └─ index.vue
│  ├─ main.ts           # 项目入口文件
│  ├─ mock              # jsonSchema 描述文件
│  │  ├─ data.json
│  │  └─ materials.json
│  ├─ pages             # 系统页面 admin扩展的页面将放在这里
│  │  ├─ 404.vue
│  │  ├─ about.vue
│  │  └─ index.vue
│  ├─ router            # 路由，目前为最简单的写法，需要用到时修改
│  │  └─ index.ts
│  ├─ utils             # 工具类们
│  │  ├─ EmitterUtil.ts
│  │  ├─ UseFocus.ts
│  │  ├─ useIcon.ts
│  │  ├─ UseItemDraggable.ts
│  │  └─ UseMenuDraggable.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
#### 关于提交
1.fork项目<br/>
2.clone到本地<br/>
3.在自己clone的项目中<br/>
```
git add .
git commit -m "提交的内容"
git push -u origin main
```
> 点击pull request<br/>
> 每次requset之前请先pull原项目来更新合并自己的项目<br/>
> <a href="https://blog.csdn.net/JavaMonsterr/article/details/125930855">如何更新fork来的项目</a><br/>
> <img src="https://img-blog.csdnimg.cn/img_convert/e4b7a36f176ad0c4cba3a9bc982a50b2.png"/>
