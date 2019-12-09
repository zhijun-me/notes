# 使用JDK Logging

 Java标准库内置了日志包`java.util.logging` ，可以直接使用。

```java
public class Hello {
    public static void main(String[] args) {
        Logger logger = Logger.getGlobal();
        logger.info("start process...");
        logger.warning("memory is running out...");
        logger.fine("ignored.");
        logger.severe("process will be terminated...");
    }
}
```

Logging系统在JVM启动时读取配置文件并完成初始化，一旦开始运行`main()`方法，就无法修改配置；

配置不太方便，需要在JVM启动时传递参数`-Djava.util.logging.config.file=`。



JDK的Logging定义了7个日志级别，从严重到普通：

- SEVERE
- WARNING
- INFO
- CONFIG
- FINE
- FINER
- FINEST

效果是这个样子：

<pre style="color: red;">
十二月 08, 2019 5:10:11 下午 com.company.TestJDKLog main
信息: start process...
十二月 08, 2019 5:10:11 下午 com.company.TestJDKLog main
警告: memory is running out...
十二月 08, 2019 5:10:11 下午 com.company.TestJDKLog main
严重: process will be terminated...
</pre>

