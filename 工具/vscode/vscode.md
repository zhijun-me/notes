# vscode

## 设置

vscode 关闭右侧预览
editor.minimap.enabled

### 编辑 settings.json 文件

打开设置 搜索 settings.json ，然后找到 **edit in settings.json**

## 自定义代码片段

以 HTML 片段为例:

File => Preferences => User Snippets => html.json

加入

```json
"helloWorld":{
    "prefix": "hw",
    "body": "hello world",
    "description": "hello world"
}
```

然后打开 html 文件，在 **body** 里面输入，**hw**，可以出现提示。  
这里奇怪的是，在`JavaScript`标签里面输入没有提示。  
但是在 JavaScript 标签里面，可以使用在 JavaScript.json 里面添加的代码片段。

### 给 md 文件添加代码提示

编辑 settings.json 文件。添加以下内容

```json

"[markdown]": {
    "editor.formatOnSave": true,
    "editor.renderWhitespace": "all",
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    },
    "editor.acceptSuggestionOnEnter": "on"
}
```

### vscode 有时候代码无法格式化的 bug

html 文件下验证有效
先检查 右下角 Prettier 的状态。没问题的话。 【右键】 => 【format Document with】 => 【configure default Formatter 】=> 【Prettier 】
