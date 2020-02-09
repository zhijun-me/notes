# shell 字符串

### 1. 字符串截取

**#** 表示 匹配第一个，# 从左往右开始匹配

**%**  也是匹配第一个，从右往左开始匹配

**##**表示  匹配最后一个

**%%** 表示匹配最后一个

***** 表示通配符

```shell
var=http://www.aaa.com/123.htm.
```

### 1.1   # 截取

**#** 截取 从左往右，从匹配的第一个字符（不包括） 到最后

```shell
echo ${var#http}  #://www.aaa.com/123.htm.   相当于java的 var.split("http")[1]
echo ${var#*//}  #www.aaa.com/123.htm.  
```



### 1.2 ## 号截取，保留右边，匹配最后一个字符

```shell
echo ${var##*/}  #123.htm.
```

### 1.3  %号截取，从右边到左边

```shell
echo ${var%htm.}  #http://www.aaa.com/123.
echo ${var%com*}   # http://www.aaa.    * 需要加在右边，加在左边无效
```

### 1.4 %% 截取，匹配最后一个

```shell
echo ${var%%w*} #http://                                                             
echo ${var%w*}  #http://ww
```

### 1.5 指定位置开始截取

```shell
echo ${var:0:2} #ht    从0开始，截取2个字符
echo ${var:5}  #//www.aaa.com/123.htm.  从5开始到最后
echo ${var:-3} #http://www.aaa.com/123.htm.  负数时，无效
echo ${var:0-3}  #tm.   0-3 =-3 小于0  从右边忘左边开始截取
echo ${var:1-3:1} #m   从右边2个开始  m. ，截取1个（从左往右）。  m
```

