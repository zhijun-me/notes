# Spring IOC 注解方式

使用注解方式配置IOC时，需要 在  `applicationContext.xml` 加入  context schema

详细XML如下:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    
    <context:component-scan base-package="xyz.zhongzj.domain" />
    
</beans>
```

以及以下几个jar包:

- spring-expression-5.1.2.RELEASE.jar

- spring-context-5.1.2.RELEASE.jar
- spring-core-5.1.2.RELEASE.jar
- spring-beans-5.1.2.RELEASE.jar
- spring-aop-5.1.2.RELEASE.jar  (注意,从Spring4开始要AOP的这个包)
- commons-logging-1.2.jar

将  `@Component` 加在 `User` 类上:

```java
@Component
public class User {
    String userName;
    Integer age;
    String sex;
    //省略get、set方法
}
```

获取这个 bean:

```java
public class TestAop {

    private ApplicationContext context;

    @Before
    public void init() {
        context = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    @Test
    public  void test(){
        User user= (User) context.getBean("user");
        System.out.println(user);
    }
}
```

