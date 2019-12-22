#  Spring AOP

## 1. AOP

aop经典应用: 事务管理、性能监视、安全检查、缓存、日志等

### 1.1 AOP中专业术语

1. Target 目标类，需要被代理的类
2. joinPoint 连接点， 那些可能被Spring拦截的点（方法），其实就是目标类的所有非私有方法
3. pointCut 切入点， 已经被增强的连接点 ，已经被增强的方法
4. advice  增强  ，增强的代码
5. weaing  织入，把advice应用到target上面的过程
6. poxy 代理类
7. Aspectj 切面 切入点和增强的结合

### 1.2 AOP所需要的jar包

Spring基础包:

- spring-beans-5.1.2.RELEASE.jar
- spring-core-5.1.2.RELEASE.jar
- spring-context-5.1.2.RELEASE.jar
- spring-expression-5.1.2.RELEASE.jar

Aop 包:

- spring-aop-5.1.2.RELEASE.jar

- spring-aspects-5.1.2.RELEASE.jar

第三方jar

- aopalliance-1.0.jar
- org.aspectj.weaver_1.8.13.201803231521.jar （aspectjweaver-1.8.9.jar？）
- commons-logging-1.2.jar

### 1.3 AOP  所需要的xml约束

注意是追加下面的。

```xml
xmlns:aop="http://www.springframework.org/schema/aop" 
xsi:schemaLocation="
http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
```

### 1.4 AOP HelloWorld

1. 参考前面的，导入jar包

2.  目标类，target

	```java
	/**
	 * 目标类 target
	 */
	public class ProductService {
	    private Log log = LogFactory.getLog(ProductService.class);
	
	    /**
	     * 连接点 ： target里面的所有可以被增强的方法，可能都会被Spring拦截，也可能只有一个
	     *  add、update、delete
	     */
	
	    public void add() {
	        log.info("添加商品");
	    }
	}
	
	```

3. 增强类 

	```java
	
	/**
	 * 通知（增强）
	 */
	public class MyAdvice {
	    private Log log = LogFactory.getLog(MyAdvice.class);
	    public void before() {
	        log.info("before()");
	    }
	    public void after() {
	        log.info("after()");
	    }
	}
	```

4. xml 配置

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:aop="http://www.springframework.org/schema/aop"
	       xsi:schemaLocation="
	        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
	
	    <!--    创建目标类 target  的bean  -->
	    <bean name="productService" class="xyz.zhongzj.service.ProductService"/>
	    <!--    创建 增强类 的bean -->
	    <bean name="myAdvice" class="xyz.zhongzj.advice.MyAdvice"/>
	
	    <!--    正式织入 -->
	    <aop:config>
	        <!--      切点   -->
	        <aop:pointcut id="addPointcut" expression="execution(public void xyz.zhongzj.service.ProductService.add())"/>
	        
	        <!--    配置切面  -->
	        <!--      ref 指向 增强类   -->
	        <aop:aspect ref="myAdvice">
	            <!--   pointcut-ref 指向切点         -->
	            <aop:before method="before" pointcut-ref="addPointcut"/>
	            <aop:after method="after" pointcut-ref="addPointcut"/>
	        </aop:aspect>
	    </aop:config>
	</beans>
	```

5. 测试代码

	```java
	public class TestAop {
	    private ApplicationContext context;
	    @Before
	    public void init() {
	        context = new ClassPathXmlApplicationContext("applicationContext.xml");
	    }
	    @Test
	    public void test2(){
	        ProductService productService =context.getBean("productService",ProductService.class);
	        productService.add();
	    }
	}
	```

	运行结果:

	

	十二月 22, 2019 9:30:00 下午 xyz.zhongzj.advice.MyAdvice before
	信息: before()
	十二月 22, 2019 9:30:00 下午 xyz.zhongzj.service.ProductService add
	信息: 添加商品
	十二月 22, 2019 9:30:00 下午 xyz.zhongzj.advice.MyAdvice after
	信息: after()



代码: 05-SpringAOP.zip



### 1.5 xml 配置aop的过程

1. 配置目标类
2. 配置增强类
3. 配置织入过程
4. 配置增强

### 1.6  切点表达式

execution(public void xyz.zhongzj.service.ProductService.addProduct())

==> public void xyz.zhongzj.service.ProductService.addProduct()

public  修饰符可以不加，但是如果不是public，那要怎么访问???     可以用* 表示任意修饰符  



奇怪的是，Spring 5.1.2 ，我测试的时候，public 可以加，可以去掉，但是不能 用 * 来表示任意修饰符，加上就报错了。



==> \* void xyz.zhongzj.service.ProductService.addProduct()

返回值 类型 也可以用* 表示 任意返回值

==> \* \*  xyz.zhongzj.service.ProductService.addProduct()

用 .. 表示切入点的参数不固定  

==> \* \*  xyz.zhongzj.service.ProductService.addProduct(..)

可以使用 * 来匹配 多个方法

==> \* \*  xyz.zhongzj.service.ProductService.*Product(..)



不固定的都可以使用 * 来代替，参数使用 ..

