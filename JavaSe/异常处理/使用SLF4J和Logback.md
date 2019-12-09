# 使用SLF4J和Logback

 SLF4J类似于Commons Logging，是一个日志接口，而Logback类似于Log4j，是一个日志的实现。 

 SLF4J对Commons Logging的接口有何改进:

在Commons Logging中，我们要打印日志，有时候得这么写：

```java
int score = 99;
p.setScore(score);
log.info("Set score " + score + " for Person " + p.getName() + " ok.");
```

拼字符串是一个非常麻烦的事情，所以SLF4J的日志接口改进成这样了：

```java
int score = 99;
p.setScore(score);
logger.info("Set score {} for Person {} ok.", score, p.getName());
```



## slf4j 使用

slf4j 需要引入 `slf4j-api-1.7.24.jar` 作为核心包

### 使用

```java
Logger log = LoggerFactory.getLogger(Main.class);
log.info("start...");
log.warn("end.");
```

但是这样是不能用的，需要有实现

### 配合jdk log

​	引入 `slf4j-jdk14-1.7.24.jar`,就可以使用jdk默认的日志了。

```xml
<dependency>
	<groupId>org.slf4j</groupId>
    <artifactId>slf4j-jdk14</artifactId>
    <version>1.7.24</version>
</dependency>
```

### 配合log4j 2.x

引入jar包:

- log4j-api-2.3.jar
- log4j-core-2.3.jar
- log4j-slf4j-impl-2.3.jar
- slf4j-api-1.7.24.jar
- com.lmax.disruptor   (log4j2的异步日志功能包 ,可不要)
- log4j-web  (解决web项目log4j可能出现警告的jar包 ，可不要)

使用:

```java
Logger log = LoggerFactory.getLogger(Main.class);
log.info("11111111");
/*
12-08 21:57:24.946 [main] INFO  com.company.Main
11111111
*/
```

## 配合log4j 1.x

引入jar包

- log4j-1.2.17.jar

- slf4j-api-1.7.25.jar

- slf4j-log4j12-1.7.25.jar

    然后加入配置文件`log4j.properties`

```xml
<dependency>
	<groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.25</version>
</dependency>
```



然后像上面一样使用即可。



## 配合  logback 

引入jar包

- slf4j-api-1.7.13.jar
- logback-classic-1.2.3.jar
- logback-core-1.2.3.jar

然后像上面一样使用即可。有点奇怪，我没加配置文件也可以跑。` logback.xml ` 加进去好像没变化。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
		</encoder>
	</appender>

	<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
			<charset>utf-8</charset>
		</encoder>
		<file>log/output.log</file>
		<rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
			<fileNamePattern>log/output.log.%i</fileNamePattern>
		</rollingPolicy>
		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
			<MaxFileSize>1MB</MaxFileSize>
		</triggeringPolicy>
	</appender>

	<root level="INFO">
		<appender-ref ref="CONSOLE" />
		<appender-ref ref="FILE" />
	</root>
</configuration>
```

