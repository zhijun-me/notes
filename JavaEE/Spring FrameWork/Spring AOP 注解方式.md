# Spring AOP 注解方式

先参考  [Spring AOP.md](Spring AOP.md)   导入jar包，同时， 修改 applicationContext.xml 加入相关约束。

以下是详细过程: 

 jar包: 

    aopalliance-1.0.jar
    aspectjweaver-1.8.9.jar
    commons-logging-1.2.jar
    hamcrest-core-1.3.jar
    junit-4.12.jar
    spring-aop-5.1.2.RELEASE.jar
    spring-aspects-5.1.2.RELEASE.jar
    spring-beans-5.1.2.RELEASE.jar
    spring-context-5.1.2.RELEASE.jar
    spring-core-5.1.2.RELEASE.jar
    spring-expression-5.1.2.RELEASE.jar

xml :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <context:component-scan base-package="xyz.zhongzj"/>
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
```

java代码

```java
//Service 类
@Service
public class MyService {
    public void add(){
        System.out.println("add()");
    }
    public  void update(){
        System.out.println("update()");
    }
}
//Advice 类

@Aspect
@Component
public class MyAdvice {
    @Before("execution (  * xyz.zhongzj.service.MyService.*(..)  )")
    public void before(){
        System.out.println("before...");
    }
    @After("execution (  * xyz.zhongzj.service.MyService.*(..)  )")
    public  void after(){
        System.out.println("after...");
    }
}
//test类
@Test
public  void test(){
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    MyService myService = context.getBean(MyService.class);
    myService.add();
    System.out.println("------------");
    myService.update();
}
//运行结果:
/*
before...
add()
after...
------------
before...
update()
after...
*/
```

