# 使用Log4j

Log4j是一种非常流行的日志框架，最新版本是2.x。

Log4j是一个组件化设计的日志系统，它的架构大致如下：

```ascii
log.info("User signed in.");
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 ├──>│ Appender │───>│  Filter  │───>│  Layout  │───>│ Console  │
 │   └──────────┘    └──────────┘    └──────────┘    └──────────┘
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 ├──>│ Appender │───>│  Filter  │───>│  Layout  │───>│   File   │
 │   └──────────┘    └──────────┘    └──────────┘    └──────────┘
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 └──>│ Appender │───>│  Filter  │───>│  Layout  │───>│  Socket  │
     └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

当我们使用Log4j输出一条日志时，Log4j自动通过不同的Appender把同一条日志输出到不同的目的地。例如：

- console：输出到屏幕；
- file：输出到文件；
- socket：通过网络输出到远程计算机；
- jdbc：输出到数据库

在输出日志的过程中，通过Filter来过滤哪些log需要被输出，哪些log不需要被输出。例如，仅输出`ERROR`级别的日志。

最后，通过Layout来格式化日志信息，例如，自动添加日期、时间、方法名称等信息。



## log4j 1.x 使用

### 单独使用

听说1.x 应该不更新了，推荐使用2.x

引入 `log4j-1.2.17.jar` ，加入配置文件  `log4j.properties`

```xml
<dependency>
 <groupId>log4j</groupId>
 <artifactId>log4j</artifactId>
 <version>1.2.17</version>
</dependency>
```



```properties
### 设置###
log4j.rootLogger = debug,stdout,D,E

### 输出信息到控制抬 ###
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

### 输出DEBUG 级别以上的日志到=E://logs/error.log ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = E://logs/log.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n

### 输出ERROR 级别以上的日志到=E://logs/error.log ###
log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File =E://logs/error.log
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

使用:

```java
Logger log = LogManager.getLogger(Main.class);
log.info("start...");
log.error("end...");
/*
[INFO ] 2019-12-08 21:10:32,782 method:com.company.Main.main(Main.java:11)
start...
[ERROR] 2019-12-08 21:10:32,784 method:com.company.Main.main(Main.java:12)
end...
*/
```

### 整合Commons-Logging

加入`commons-logging-1.2.jar`,然后使用即可

```java
Log log = LogFactory.getLog(Main.class);
log.info("start...");
log.warn	("end.");
/*
[INFO ] 2019-12-08 21:12:21,880 method:com.company.Main.main(Main.java:13)
start...
[ERROR] 2019-12-08 21:12:21,883 method:com.company.Main.main(Main.java:14)
end...
*/
```



## log4j 2.x 使用

下载地址: https://logging.apache.org/log4j/2.x/download.html

### 单独使用

 `log4j2.xml`的文件放到`classpath`下 :

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
    status : 这个用于设置log4j2自身内部的信息输出,可以不设置,当设置成trace时,会看到log4j2内部各种详细输出
    monitorInterval : Log4j能够自动检测修改配置文件和重新配置本身, 设置间隔秒数。此处表示每隔600秒重读一次配置文件
-->
<Configuration status="OFF" monitorInterval="600">

    <!--日志级别：TRACE < DEBUG < INFO < WARN < ERROR < FATAL-->
    <!--如果设置为WARN，则低于WARN的信息都不会输出-->
    <Properties>
        <!-- 配置日志文件输出目录,此处为项目根目录下的logs文件夹 -->
        <Property name="LOG_HOME">logs</Property>
        <property name="FILE_NAME">cnblogs</property>
    </Properties>

    <Appenders>
        <!--这个输出控制台的配置-->
        <Console name="Console" target="SYSTEM_OUT">
            <!--控制台只输出level及其以上级别的信息（onMatch），其他的直接拒绝（onMismatch）-->
            <ThresholdFilter level="TRACE" onMatch="ACCEPT" onMismatch="DENY"/>
            <!--日志输出的格式-->
            <!--
                %d{yyyy-MM-dd HH:mm:ss, SSS} : 日志生产时间,输出到毫秒的时间
                %-5level : 输出日志级别，-5表示左对齐并且固定输出5个字符，如果不足在右边补0
                %c : logger的名称(%logger)
                %t : 输出当前线程名称
                %p : 日志输出格式
                %m : 日志内容，即 logger.info("message")
                %n : 换行符
                %C : Java类名(%F)
                %L : 行号
                %M : 方法名
                %l : 输出语句所在的行数, 包括类名、方法名、文件名、行数
                hostName : 本地机器名
                hostAddress : 本地ip地址
             -->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>

        <!--
            循环日志文件：日志文件大于阀值的时候，就开始写一个新的日志文件
            这个会打印出所有的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档

            fileName    : 指定当前日志文件的位置和文件名称
            filePattern : 指定当发生Rolling时，文件的转移和重命名规则
            SizeBasedTriggeringPolicy : 指定当文件体积大于size指定的值时，触发Rolling
            DefaultRolloverStrategy : 指定最多保存的文件个数
            TimeBasedTriggeringPolicy : 这个配置需要和filePattern结合使用
                注意filePattern中配置的文件重命名规则是${FILE_NAME}_%d{yyyy-MM-dd}_%i，最小的时间粒度是dd，即天，
                TimeBasedTriggeringPolicy指定的size是1，结合起来就是每1天生成一个新文件
        -->

        <RollingRandomAccessFile name="INFO" fileName="logs/${FILE_NAME}.log" filePattern="log/${FILE_NAME}_%d{yyyy-MM-dd}_%i.log.gz">
            <Filters>
                <ThresholdFilter level="WARN" onMatch="DENY" onMismatch="NEUTRAL"/>
                <ThresholdFilter level="TRACE" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="1MB"/>
            </Policies>
            <DefaultRolloverStrategy max="20"/>
        </RollingRandomAccessFile>

        <!--错误信息记录-->
        <RollingRandomAccessFile name="ERROR" fileName="logs/${FILE_NAME}-ERROR.log" filePattern="log/${FILE_NAME}-ERROR_%d{yyyy-MM-dd}_%i.log.gz">
            <Filters>
                <ThresholdFilter level="FATAL" onMatch="DENY" onMismatch="NEUTRAL"/>
                <ThresholdFilter level="WARN" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="1MB"/>
            </Policies>
            <DefaultRolloverStrategy max="20"/>
        </RollingRandomAccessFile>

        <!--系统级别的错误信息-->
        <RollingRandomAccessFile name="FATAL" fileName="logs/${FILE_NAME}-FATAL.log" filePattern="log/${FILE_NAME}-FATAL%d{yyyy-MM-dd}_%i.log.gz">
            <Filters>
                <ThresholdFilter level="FATAL" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="1MB"/>
            </Policies>
            <DefaultRolloverStrategy max="20"/>
        </RollingRandomAccessFile>

        <!--全部日志信息:DEBUG及以上级别-->
        <RollingRandomAccessFile name="ALL" fileName="logs/${FILE_NAME}-ALL.log" filePattern="log/${FILE_NAME}-ALL%d{yyyy-MM-dd}_%i.log.gz">
            <Filters>
                <ThresholdFilter level="DEBUG" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="10MB"/>
            </Policies>
            <DefaultRolloverStrategy max="20"/>
        </RollingRandomAccessFile>

        <!--配置异步写日志-->
        <Async name="Async">
            <AppenderRef ref="ALL"/>
        </Async>

        <!--输出到MongoDB中-->
        <NoSql name="databaseAppender">
            <MongoDb databaseName="test" collectionName="errorlog" server="localhost" port="27017" />
        </NoSql>
    </Appenders>

    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <Loggers>
        <!--监控系统信息-->
        <Logger name="org.springframework" level="info" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>

        <!--输出到NoSQL中-->
        <Logger name="mongoLog" level="trace" additivity="false">
            <AppenderRef ref="databaseAppender" />
        </Logger>

        <Root level="debug">
            <!-- 这儿为trace表示什么都可以打印出来了,其他几个级别分别为：TRACE、DEBUG、INFO、WARN、ERROR和FATAL -->
            <Appender-Ref ref="Console"/>
            <Appender-Ref ref="INFO"/>
            <Appender-Ref ref="ERROR"/>
            <Appender-Ref ref="FATAL"/>
        </Root>
    </Loggers>

</Configuration>
```

log4j是3个jar包:   

- log4j-api-2.3.jar        
- log4j-core-2.3.jar

引入上面两个jar包，然后:

```xml
<dependency>
 <groupId>org.apache.logging.log4j</groupId>
 <artifactId>log4j-core</artifactId>
 <version>2.3</version>
</dependency>
<dependency>
 <groupId>org.apache.logging.log4j</groupId>
 <artifactId>log4j-api</artifactId>
 <version>2.3</version>
</dependency>
```



```java
Logger log = LogManager.getLogger(TestCommonsLogging.class);
log.info("start...");
/*
12-08 21:03:43.888 [main] INFO  com.company.Main
start...
*/
```

### log4j 2.x 配合Commons Logging使用

引入 `log4j-jcl-2.3.jar` 和 `commons-logging-1.2.jar` 

```xml
<dependency>    
    <groupId>org.apache.logging.log4j</groupId>    
    <artifactId>log4j-jcl</artifactId>    
    <version>2.3</version>
</dependency>
<dependency>
	<groupId>commons-logging</groupId>
	<artifactId>commons-logging</artifactId>
	<version>1.2</version>
</dependency>
```

使用:

```java
Log log = LogFactory.getLog(Main.class);
log.info("start...");
/*
12-08 21:30:08.799 [main] INFO  com.company.Main
start...
*/
```

