#  **Autowired** 注解

## **Autowired**   注入时，先根据类型，再根据 name

具体测试过程如下:

```java
public class Car {
    private String name;
    private String color;
    //省略get、set、构造方法、toString
}

@Component
public class User {
    @Autowired
    private Car car1;
    // 同样省略get、set、toString 
}
//test
User bean = context.getBean(User.class);
System.out.println(bean);
```

```xml
<bean name="car" class="xyz.zhongzj.domain.Car" >
    <constructor-arg name="name" value="奥迪" />
    <constructor-arg name="color" value="黑色" />
</bean>
<bean name="car1" class="java.lang.String" />
```

此时 car1 明显不上 Car类型的，如果按照name注入，那应该报错，实际上没有，而是成功注入了  前面那个类型相同的car对象。

>  User{car1=Car{name='奥迪', color='黑色'}}



如果存在两个相同类型的bean，其中一个的name 是 car1 时:

```xml
<bean name="car" class="xyz.zhongzj.domain.Car" >
    <constructor-arg name="name" value="奥迪" />
    <constructor-arg name="color" value="黑色" />
</bean>
<bean name="car1" class="xyz.zhongzj.domain.Car" >
    <constructor-arg name="name" value="本次" />
    <constructor-arg name="color" value="白色" />
</bean>
```

此时，结果为:

> User{car1=Car{name='本次', color='白色'}}

说明注入的时候，如果有多个类型相同的bean时，则根据属性的name来注入。



## Autowired和 Qualifier 

当存在两个类型为Car但是name都不是car1时：

```xml
<bean name="car" class="xyz.zhongzj.domain.Car" >
    <constructor-arg name="name" value="奥迪" />
    <constructor-arg name="color" value="黑色" />
</bean>
<bean name="car3" class="xyz.zhongzj.domain.Car" >
    <constructor-arg name="name" value="本次" />
    <constructor-arg name="color" value="白色" />
</bean>
```

> available: expected single matching bean but found 2: car,car3

Spring 无法分辨该注入哪个对象，于是报错了。

这时候需要配合 @Qualifier 使用:

```java
@Autowired
@Qualifier("car2")
private Car car1;
```

这样可以注入 指定name的bean。

但是，直接用   @Resource(name = "car2")  不是更简单？



## Autowired 注入 list :

```java
@Component
public class User {
    @Autowired
    private List<Car> carList;
}
```

```xml
<bean name="car1" class="xyz.zhongzj.domain.Car">
    <property name="name" value="car1"/>
</bean>
<bean name="car2" class="xyz.zhongzj.domain.Car">
    <property name="name" value="car2"/>
</bean>
```

此时，结果为:

> User{carList=[Car{name='car1'}, Car{name='car2'}]}

Spring把所有的 car类型的对象都注入到这个list里面去了。即使在前面，把car1注入到另一个属性里面，也没用，这个list里面还是会有car1

```java
    @Autowired
    @Qualifier("car1")
    private Car car;
    
    @Autowired
    private List<Car> carList;
```

> User{car=Car{name='car1'}, carList=[Car{name='car1'}, Car{name='car2'}]}





我想在xml里面直接定义 list的，然后。。发现不会写。好像不支持。遇到再说吧。

