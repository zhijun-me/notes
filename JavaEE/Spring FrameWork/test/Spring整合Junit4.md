# Spring 整合 Junit 4

先加入Spring核心包

```
commons-logging-1.2.jar
spring-aop-5.1.2.RELEASE.jar
spring-beans-5.1.2.RELEASE.jar
spring-context-5.1.2.RELEASE.jar
spring-core-5.1.2.RELEASE.jar
spring-expression-5.1.2.RELEASE.jar
```

再加入测试相关的包:

```
hamcrest-core-1.3.jar
junit-4.12.jar
spring-test-5.1.2.RELEASE.jar
```

xml配置:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="xyz.zhongzj" />

</beans>
```



定义service:

```java
import org.springframework.stereotype.Service;

@Service
public class MyService {
    public void func(){
        System.out.println("func()");
    }
}
```

测试:

```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import xyz.zhongzj.service.MyService;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:ApplicationContext.xml"}) //注意这里少classpath的话，可能会报错。
public class SpringTest {

    @Resource
    MyService myService;

    @Test
    public void test(){
        myService.func();
    }

}
```

