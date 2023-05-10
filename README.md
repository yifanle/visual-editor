```
       __     ___                 _   _____    _ _ _             
       \ \   / (_)___ _   _  __ _| | | ____|__| (_) |_ ___  _ __ 
        \ \ / /| / __| | | |/ _` | | |  _| / _` | | __/ _ \| '__|
         \ V / | \__ \ |_| | (_| | | | |__| (_| | | || (_) | |   
          \_/  |_|___/\__,_|\__,_|_| |_____\__,_|_|\__\___/|_|   
                                                           

```
Visual-Editor是一个可视化拖拽编辑器，可拖拽左侧物料区组件，放置在中间画布中，并支持组件样式、属性、事件编辑。<br/>
🔗 <a target="_blank" href="http://anyapp.run:3000/#/editor">项目预览地址</a> <br/>
也许您对这个项目很感兴趣，也想加入项目未来的发展，或者您也有奇妙的想法想加在这个项目上，或者想通过这样的项目来提升自己的技术，让自己的简历上填上一笔，都期待您参与进来，<a href="#lianxi">📡 欢迎私信骚扰</a>！
#### 👓 效果图：
<img src="https://img-blog.csdnimg.cn/39d92a06f109482c99ffd4efb0a61a19.gif"></img>
#### ✨ 可以用它：
> 可视化搭建表单<br/>
> 低代码、可视化设计移动端、PC网页端页面设计<br/>

#### 🧿 我们的不同（计划）：<br/>
> 不止拖拽：<br/>
> 将实现自定义组件像画画一样简单！<br/>
> 丰富的社区内容：<br/>
> 敬请期待！

#### 🔨 目前已经完成的功能：
 - 左侧物料区添加组件
 - 左侧物料区组件拖拽至中间画布
 - 画布内组件拖拽位置变动
 - 拖拽辅助线，自动对齐贴合
 - 画布标尺，测量线，画布拖拽
 - 撤销（ctrl+z）、恢复（ctrl+y）
 - JSON数据编辑和导出（2023年5月9日）
 - 实现清空画布功能并支持撤回(2023年5月10日)

#### 🔮 未来的计划
1.先将visual-editor编辑器的功能完善<br/>
2.可结合visual-editor编辑器搭建：
> - 流程可视化平台
>- 可视化大屏
>- 低代码/无代码 设计开发平台


3.创建低代码平台组件、页面设计社区<br/>
4.打通平台开发、平台数据支持、线上部署等业务<br/>
5.定制私有化

#### 🧬 技术栈：<br/>
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

#### 📂 前端项目目录介绍：
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
#### 📡 <a name="lianxi">联系我们</a>
如果你也想成为这个项目的贡献者，可以扫描下方的二维码！只要您的奇思妙想被采纳，或者参与项目的编写，都将成为这个项目的贡献者！欢迎您的加入🎉🎊！<br/>
<a href="https://sm.ms/image/rPjZVdN8plneYHv" target="_blank"><img style="display:inline-block;width:300px;" src="https://s2.loli.net/2023/05/10/rPjZVdN8plneYHv.jpg" ></a>
<a href="https://sm.ms/image/bDQwzRIu7xOEmdG" target="_blank"><img style="display:inline-block;width:300px;;" src="https://s2.loli.net/2023/05/10/bDQwzRIu7xOEmdG.jpg" ></a>
#### 🧠 关于提交
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
