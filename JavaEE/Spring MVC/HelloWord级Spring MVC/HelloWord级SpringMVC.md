# HelloWorld 级SpringMVC

## 1.新建JavaWeb项目并测试能否正常启动

## 2. 下载并集成SpringMVC

### 2.1 下载 https://repo.spring.io/release/org/springframework/spring/

### 2.2 加入Jar包

把所有的jar包都复制到lib下面，复制  commons-logging-1.2.jar 到lib下面

### 2.3 在web.xml中 激活

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         id="WebApp_ID" version="3.0">
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>
            org.springframework.web.servlet.DispatcherServlet
        </servlet-class>
	<!-- 当前Servlet的参数信息 -->
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>/WEB-INF/springmvc-config.xml</param-value>
		</init-param>
		<!-- Web应用启动时立即加载 -->
		<load-on-startup>1</load-on-startup>
    </servlet>
	<!-- Servlet 映射声明 -->
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
</web-app>
```

### 2.4 增加 Spring配置文件  

/WEB-INF/springmvc-config.xml

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans
                  http://www.springframework.org/schema/beans/spring-beans-4.2.xsd">
	<!-- 配置Handle，映射 /hello 请求 -->
	<bean name="/hello" class="org.fkit.controller.HelloController"/>
	<!-- 处理映射器将bean的name作为url进行查询， -->
	<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping" />
	<!-- SimpleControllerHandlerAdapter 是一个处理器适配器，所有的处理适配器都要实现 HandlerAdapter接口 -->
	<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter" />
	<!-- 视图解析器 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"/>
</beans>
```

### 2.5 新建类 HelloController

```java
package org.fkit.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloController implements Controller {
    private static final Log log= LogFactory.getLog(HelloController.class);
    @Override
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        log.info("handleRequest被调用");
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","helloWorld");
        mv.setViewName("/WEB-INF/content/welcome.jsp");
        return mv;
    }
}
```

## 3. 启动项目

JavaWeb01.zip



如果出现 Property 'url' is required ， 错误的原因在于将视图解析器的类写错了。



