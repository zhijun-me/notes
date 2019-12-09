# 使用Commons Logging

 Commons Logging是一个第三方日志库，它是由Apache创建的日志模块。 

Commons Logging的特色是，它可以挂接不同的日志系统，并通过配置文件指定挂接的日志系统。默认情况下，Commons Loggin自动搜索并使用Log4j（Log4j是另一个流行的日志系统），如果没有找到Log4j，再使用JDK Logging。

使用Commons Logging只需要和两个类打交道，并且只有两步：

第一步，通过`LogFactory`获取`Log`类的实例； 第二步，使用`Log`实例的方法打日志。

示例代码如下：

```java
Log log = LogFactory.getLog(Main.class);
log.info("start...");
log.warn("end.");
```

使用时，需要引入jar包:  `commons-logging-1.2.jar`

<pre style="color: red;">
十二月 08, 2019 5:38:01 下午 com.company.Main main
信息: start...
十二月 08, 2019 5:38:01 下午 com.company.Main main
警告: end.
</pre>

