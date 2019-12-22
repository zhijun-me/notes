# Spring Expression Language

https://www.cnblogs.com/best/p/5748105.html

 Spring表达式语言（简称SpEL）是一个支持查询并在运行时操纵一个对象图的功能强大的表达式语言。SpEL语言的语法类似于统一EL，但提供了更多的功能，最主要的是显式方法调用和基本字符串模板函数。 

## 1. 环境搭建

基于**maven**搭建  `pom.xml` 如下:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>xyz.zhongzj</groupId>
    <artifactId>04-SpringEL</artifactId>
    <version>1.0-SNAPSHOT</version>


    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.version>4.3.0.RELEASE</spring.version>
    </properties>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <excludes>
                    <exclude>**/*.java</exclude>
                </excludes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
    </build>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
            <version>4.10</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.8.9</version>
        </dependency>
        <dependency>
            <groupId>cglib</groupId>
            <artifactId>cglib</artifactId>
            <version>3.2.4</version>
        </dependency>
    </dependencies>

</project>
```

ApplicationContext.xml如下:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.3.xsd">

    <bean id="gyl" class="xyz.zhongzj.domain.User" p:id="9527">
        <property name="name" value="郭永乐">
        </property>
    </bean>

    <bean id="order001" class="xyz.zhongzj.domain.Order">
        <property name="customer" ref="gyl"/>
        <property name="name" value="#{gyl.name}"/>
        <property name="orderName" value='#{"Apples".toUpperCase()}'/>
    </bean>

</beans>
```

 在配置文件中，出现了#｛｝形式的表达式，我们就称为Spel表达式。#{gyl.name}作用是找到名称为gyl的bean取出中间的name值；#{"Apples".toUpperCase()}把字符串Apples转换成大写并输出。 
 测试代码:
 ```java
 package xyz.zhongzj;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import xyz.zhongzj.domain.User;

public class TestSpring {
    ApplicationContext context =null;

    @Before
    public  void init(){
        context=new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    @Test
    public  void test(){
         User user= (User) context.getBean("gyl");
        System.out.println(user);
    }
}

 ```

## 2.SpEL 表达式 Hello World

Spring表达式语言(SpEL)从3.X开始支持，它是一种能够支持运行时查询和操作对象图的强大的表达式，其表达式语法类似于统一表达式语言。

SpEL支持如下表达式：

基本表达式：字面量表达式、关系，逻辑与算数运算表达式、字符串连接及截取表达式、三目运算、正则表达式、括号优先级表达式；

类相关表达式：类类型表达式、类实例化、instanceof表达式、变量定义及引用、赋值表达式、自定义函数、对象属性存取及安全导航表达式、对象方法调用、Bean引用；

集合相关表达式：内联List、内联数组、集合，字典访问、列表，字典，数组修改、集合投影、集合选择；不支持多维内联数组初始化；不支持内联字典定义；

其他表达式：模板表达式。 

### 2.1 HelloWorld

```java
//创建SpELl表达式的解析器
private ExpressionParser parser;
//解析表达式需要的上下文
private EvaluationContext ctx;
@Before
public  void init(){
	parser=new SpelExpressionParser();
    ctx=new StandardEvaluationContext();
}
```

```java
//解析表达式
    Expression exp=parser.parseExpression("'Hello '+'World!'");
    //取出解析结果
    String result = exp.getValue().toString();// Hello World
}
```

## 3. SpEL表达式详细介绍

### 3.1 文字表达式

 支持的文字表达的类型是字符串，日期，数值（整型，实型，和十六进制），布尔和空。字符串是由单引号分隔。使用反斜杠字符转移把一个单引号字符本身放在字符串中。 

```java
@Test
public  void test1(){
    Object value = parser.parseExpression("'HelloWorld'").getValue();//HelloWorld
    value=parser.parseExpression("0xffff").getValue();//65535
    value=parser.parseExpression("1.234345e+3").getValue();//1234.345
    value=parser.parseExpression("new java.util.Date()").getValue();//Sat Dec 21 21:14:19 CST 2019
}
```

### 3.2 语言特性

#### 3.2.1 属性

```java
User user = new User(9527,"周星驰");
//把变量放入上下文中
ctx.setVariable("user",user);
//表达式
expStr=" #user.getId() + 1900 ";
Expression expression = parser.parseExpression(expStr);
//解析
Object value = expression.getValue(ctx);
System.out.println(value);
```

#### 3.2.2数组

```java
String[] arr={"aaa","bbb","ccc"};
ctx.setVariable("arr",arr);
String value = parser.parseExpression("#arr[0]").getValue(ctx, String.class);//aaa
```

如果传进去的是list，可以通过 `.get(0)` 这种方式，也可以通过 `[0]` 这样取值.

#### 3.2.3列表

```java
expStr="{1,2,3,4,5}";
List list = (List) parser.parseExpression(expStr).getValue();//[1, 2, 3, 4, 5]
List listOfLists = (List) parser.parseExpression("{{'a','b'},{'x','y'}}").getValue();
System.out.println(((List)listOfLists.get(1)).get(1));
```

这里返回的是一个不可修改的list，不可以 add 、remove，set、clear等操作。

#### 3.2.4 map

```java
expStr="#map['key1']";
Map map = new HashMap();
map.put("key1","value1");
ctx.setVariable("map",map);
Object value = parser.parseExpression(expStr).getValue(ctx);//value1
```

#### 3.2.5 方法

 方法调用使用典型的Java编程语法 ,支持可变参数

```java
String c = parser.parseExpression("'abcdef'.substring(2, 3)").getValue(String.class);
```

#### 3.2.6操作符

**太多了，没看了，随便复制了下，主要是到目前(2019-12-21)为止都没用过这东西，真要用的时候再说吧...**

 关系操作符：使用标准的操作符号支持关系操作符：等于，不等于，小于，小于等于，大于，大于等于。

逻辑操作符：支持的逻辑操作符包括and，or和not(!)，不支持&&和||。

算术操作符：加法运算符可以用于数字，字符串和日期。减法可用于数字和日期。其他支持的数学运算包括取模（％）和指数幂（^）。使用标准的运算符优先级。 

 **关系运算符**： 

```java
//true
boolean trueValue1 = parser.parseExpression("2 == 2").getValue(Boolean.class);
//false
boolean falseValue1 = parser.parseExpression("2 < -5.0").getValue(Boolean.class);
//true
boolean trueValue2 = parser.parseExpression("'black' < 'block'").getValue(Boolean.class);
//false，字符xyz是否为int类型
boolean falseValue2 = parser.parseExpression("'xyz' instanceof T(int)").getValue(Boolean.class);
//true，正则是否匹配
boolean trueValue3 =parser.parseExpression("'5.00' matches '^-?\\d+(\\.\\d{2})?$'").getValue(Boolean.class);
//false
boolean falseValue3=parser.parseExpression("'5.0067' matches '^-?\\d+(\\.\\d{2})?$'").getValue(Boolean.class);
```

 **逻辑运算**： 

```java
// -- AND 与运算 --
//false 
boolean falseValue4 = parser.parseExpression("true and false").getValue(Boolean.class);
//true，isMember方法用于测试是否为某个对象的成员
String expression = "isMember('Nikola Tesla') and isMember('Mihajlo Pupin')";
boolean trueValue4 = parser.parseExpression(expression).getValue(Boolean.class);
// -- OR 或运算--
//true
boolean trueValue5 = parser.parseExpression("true or false").getValue(Boolean.class);
//true
String expression1 = "isMember('Nikola Tesla') or isMember('Albert Einstein')";
boolean trueValue6 = parser.parseExpression(expression).getValue( Boolean.class);
//false
boolean falseValue5 = parser.parseExpression("!true").getValue(Boolean.class);
//false
String expression2 = "isMember('Nikola Tesla') and !isMember('Mihajlo Pupin')";
boolean falseValue6 = parser.parseExpression(expression).getValue(Boolean.class);
```

 **算术运算：** 

```java
// Addition
int two = parser.parseExpression("1 + 1").getValue(Integer.class); // 2
String testString =
parser.parseExpression("'test' + ' ' + 'string'").getValue(String.class); // 'test string'
// Subtraction
int four = parser.parseExpression("1 - -3").getValue(Integer.class); // 4
double d = parser.parseExpression("1000.00 - 1e4").getValue(Double.class); // -9000
// Multiplication
int six = parser.parseExpression("-2 * -3").getValue(Integer.class); // 6
double twentyFour = parser.parseExpression("2.0 * 3e0 * 4").getValue(Double.class); // 24.0
// Division
int minusTwo = parser.parseExpression("6 / -3").getValue(Integer.class); // -2
double one = parser.parseExpression("8.0 / 4e0 / 2").getValue(Double.class); // 1.0
// Modulus
int three = parser.parseExpression("7 % 4").getValue(Integer.class); // 3
int one = parser.parseExpression("8 / 5 % 2").getValue(Integer.class); // 1
// Operator precedence
int minusTwentyOne = parser.parseExpression("1+2-3*8").getValue(Integer.class); // -21
```

## 4. Spring 中使用SpEL

### 4.1 Spring xml中使用

在xml配置中，使用 #{} 将 表达式包起来即可

```xml
<bean id="gyl" class="xyz.zhongzj.domain.User" p:id="9527">
    <property name="name" value="郭永乐">
    </property>
</bean>

<bean id="order001" class="xyz.zhongzj.domain.Order">
    <property name="customer" ref="gyl"/>
    <property name="name" value="#{gyl.name}"/>
    <property name="orderName" value='#{"Apples".toUpperCase()}'/>
</bean>
```

根据如上代码推测，只需写表达式，整个spring context 作为 context传进去，然后取值。

### 4.2 配置注解使用

```java
 @Value("#{'Hello'.toUpperCase()}")
 @Value("#{user1}")
```

