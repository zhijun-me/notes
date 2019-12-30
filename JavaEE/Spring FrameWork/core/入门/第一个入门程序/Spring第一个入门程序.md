# Spring 第一个入门程序

## 1. 下载

https://repo.spring.io/release/org/springframework/spring/5.1.2.RELEASE/

## 2. 导包

- spring-beans-5.1.2.RELEASE.jar
- spring-context-5.1.2.RELEASE.jar
- spring-core-5.1.2.RELEASE.jar
- spring-expression-5.1.2.RELEASE.jar
- commons-logging-1.2.jar (另外找，Spring的lib里面没有)
- junit-4.12  (junit 4 依赖)
- hamcrest-core-1.3.jar (junit 4 依赖)

## 3. 加入配置文件

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean name="user" class="com.company.domain.User"/>
</beans>
```



## 4. 测试

```java
//com.company.domain.User
package com.company.domain;
public class User {
    private Integer id;
    private String name;
    //省略get、set
}
//TestSpring
package com.company.test;

import com.company.domain.User;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpring {
    private static final String CONFIG_FILE = "applicationContext.xml";

    @Test
    public void test1() {
        ApplicationContext context = new ClassPathXmlApplicationContext(CONFIG_FILE);
        User user = (User) context.getBean("user");
        System.out.println(user);
    }
}
```

01-Spring入门.zip

