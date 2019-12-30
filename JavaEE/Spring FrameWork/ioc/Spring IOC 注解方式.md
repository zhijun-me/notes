# Spring IOC 注解方式

## 1. Spring IOC 简易使用

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

## 2. Sping IOC  注解

###  2.1 **@Component** 

相当于 bean标签，还有几个衍生的注解，功能完全相同：

- **@Controller**  作用在WEB层
- **@Service**   作用在业务层
- **@Repository** 作用在持久层

### 2.2 **@Scope**   

相当于 bean标签中的 **scope** 属性，可以定义从Spring容器中获取对象时是单例还是多例。

Scope 注解有3个属性，但是常用的是两个  value 和 scopeName，实际上 两个是同一个东西，使用了AliasFor，另一个属性是proxyMode，这个没见过。

 @Scope("singleton") 即默认设置，单例模式，  @Scope("prototype")   即多实例模式。

多实例简单实现：

```java
// Service

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
@Service
@Scope("prototype")
public class MyService {
    void fun(){}
}

//factory
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
@Component
public class MyServiceFactory {
    @Resource
    private ApplicationContext context;
    public MyService getMyService() {
        return context.getBean(MyService.class);
    }
}

//test
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class Test2 {
    private ApplicationContext context;
    @Before
    public void init() {
        context = new ClassPathXmlApplicationContext("applicationContext.xml");
    }
    @Test
    public  void test(){
        MyServiceFactory factory=  context.getBean(MyServiceFactory.class);
        System.out.println(factory.getMyService()==factory.getMyService());
    }
}
```

### 2.3 @Value

value注解可以对对象属性进行赋值，不需要set方法。**使用方法**： 1.  @Value("value")   会将对象属性赋值为value，注意值需要可以自动类型转换  。2. @Value("${xxxx}") 表示从配置文件读取值得用法。 3. @Value("#{xxx}")  表示SpEL表达式取值的用法。

value注解，可以加在field上面，也可以加在set方法上面。比如下面这样（不知道有没有人这么写）:

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
public class ProFileConstance {
    public static String  JDBC_USERNAME;
    @Component
    public  static class ProFileConstanceHolder{
        @Value("${jdbc.username}")
        public void setJdbcUsername(String jdbcUsername){
            JDBC_USERNAME=jdbcUsername;
        }
    }
}
// test
public void test2(){
     ApplicationContext  context = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println(ProFileConstance.JDBC_USERNAME);
}
```
### 2.4 @Autowired

 [@Autowired.md](@Autowired.md)   根据类型自动注入，如果类型相同，则根据name注入，如果 存在类型相同，name都不同的两个bean，则报错。可以配合  Qualifier  指定name ,不加 Qualifier 注解，则取field 的name。



### 2.5 @Resource  

@Resource 是JDK 提供的一个注解，Spring 支持，这个注解，可以代替 Autowired使用，而且， 可以指定name，无需配合 Qualifier   注解。即使加上，也不会生效的。

