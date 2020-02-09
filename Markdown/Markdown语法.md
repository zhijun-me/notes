# Markdown 语法(Typora版)

参考自 https://www.cnblogs.com/Jetictors/p/8506757.html

[toc]

# 1. 标题

最多可以用 6 个#，即 6 级标题。 

快捷键<kbd> Ctrl</kbd>+<kbd>1</kbd> ，几级标题就数字几。ctrl+ = 来增加级别，用ctrl+- 来减小级别。

```markdown
# 一级标题
## 二级标题
...
```

# 2.  列表

## 2.1  有序列表

使用数字加一个.  再加一个空格。空格必须要有。

```markdown
1. 中国
2. 美国
3. 英国
```


## 2.2  无序列表

在内容前面加上  ***** 、**-** 、 **+** 即可

```markdown
- 中国
- 美国

* 中国
* 美国

+ 中国
+ 美国
```

## 2.3  有序列表和无序列表嵌套

前面使用 tab 即可：

```markdown
1. 中国
	- 深圳
	- 上海
2. 美国
	- 纽约
	- 硅谷
```

# 3. 引用

## 3.1 基本引用

```markdown
> 我是引用文本
```

## 3.2 嵌套引用

可以有很多层嵌套引用。 

```markdown
> 引用文本1
> > 嵌套的引用文本2
> > > 嵌套的引用文本3
```

# 4.  文字样式

## 4.1 加粗

快捷键 <kbd>Ctrl</kbd>+<kbd>B</kbd>

```markdown
**加粗的文本1**
__加粗的文本2__
```

## 4.2  斜体

快捷键 <kbd>Ctrl</kbd>+<kbd>I</kbd>

```markdown
*倾斜的文本1*
_倾斜的文本2_
```

## 4.3 删除线

使用 \~\~ 将文本包含起来即可

快捷键  alt+shift+5  

```markdown
删除~~人类~~这个词语
```

## 4.4 下划线

1.使用 \<u\> 标签 添加下划线。教程里面不推荐这个，但是我觉得比下面的那个方便一些。

  快捷键 Ctrl +u 

```markdown
这里需要加<u>下划线</u>，使用 <u>标签即可
```

2.使用 <span> 标签 添加下划线

```markdown
<span style="border-bottom:1px solid ;">所添加的需要加下划线的行内文字</span>
```


## 4.5 数学公式

很少用到。有需要再研究吧。https://www.jianshu.com/p/a0aa94ef8ab2

# 5. 链接和图片

## 5.1 链接

 快捷键   ctrl+k  

```markdown
[百度](http://www.baidu.com)
[掘金](https://juejin.im)
```

## 5.2 图片

 快捷键 ctrl+shift+i  。直接拖动图片，或者直接复制粘贴 更方便一些。

```markdown
![图片1](图片的连接)    
![图片2](图片的连接) 
```

# 6. 表格

表格内容默认左对齐。可以 使用 `:` 来控制, 当 : 在左边时表示左对齐;两边都有时，居中对齐;在右边时为 右对齐。 在  中，使用 ctrl+T 可以快速插入;也可以 输入 第一列(|  列名1  |  列名2  |  列名3  |)后直接回车。

```markdown
|  列名1  |  列名2  |  列名3  |
|:-------|:-------:|-------:|
|  值1    |   值1   |  值2    |
|  值1    |   值1   |  值2    |
|  值1    |   值1   |  值2    |
```

# 7. 关键字、代码块、多行文本、换行

## 7.1 关键字 

 可以使用 快捷键   ctrl+shift+\`   

```markdown
`关键字`
```

## 7.2 代码块

  ctrl+shift+k

```markdown
​```java
for(int i=0;i<10;i++)
	//dosomething...
​```
```

## 7.3 纯文本

```
​```
纯文本...
​```
```

## 7.4 换行符

-   使用 \<br/\> 标签。我看的那个教程不推荐... 在表格里面，可以使用这个来帮助换行

-   使用2个空格再换行

    ```markdown
    第一段文本  <!-- 注意这后面有2个空格 -->
    第二段文本
    ```

# 8. 分割线

```markdown
---
```

# 9. 其它

## 9.1 上标

使用 \<sup\> 标签。效果: 爆米<sup>TM</sup>

```markdown
爆米<sup>TM</sup>
```

## 9.2 下标

使用 \<sub\> 标签。效果 H<sub>2</sub>O

```markdown
H<sub>2</sub>O
```

## 9.3 键盘文字

使用 \<kbd\> 标签. 效果 <kbd>Ctrl</kbd>

```markdown
<kbd>Ctrl</kbd>
```

## 9.4 目录

使用 [toc] 可以生成目录， 支持自动更新。

vscode需要安装toc插件，通过其它方式生成。

## 9.5 文本居中

使用 \<center\> 标签

```markdown
<center>这段文字会居中</center>
```

## 9.6 \\  转义

使用 反斜杠 \\ 可以 显示一些符号，比如 \` 

## 9.7 注释

```markdown
<!-- 这是注释  -->
```

## 9.8 根号

   效果:  √<span style="text-decoration:overline">x</span>

```markdown
√<span style="text-decoration:overline">x</span>
```

