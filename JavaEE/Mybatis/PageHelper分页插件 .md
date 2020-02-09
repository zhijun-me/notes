# PageHelper分页插件 

## 使用步骤:

### pom.xml 加入依赖:

```xml
<dependency> 
    <groupId>com.github.pagehelper</groupId>  
    <artifactId>pagehelper</artifactId>  
    <version>5.1.6</version> 
</dependency>
```

### SqlMapConﬁg.xml  中配置插件

```xml
<!-- typeAliases -->
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="mysql"/>
    </plugin>
</plugins>
<!-- environments -->
```

### Spring 配置文件中加入

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!-- other configuration -->
    <property name="plugins">
        <array>
            <bean class="com.github.pagehelper.PageInterceptor">
                <property name="properties">
                    <!-- config params as the following -->
                    <value>            
                        helperDialect=mysql          
                    </value>
                </property>
            </bean>
        </array>
    </property>
</bean>
```

### 项目中使用分页

```java
//获取第1页，10条内容，默认查询总数count
PageHelper.startPage(1, 10); 
List<Country> list = countryMapper.selectAll();
//用PageInfo对结果进行包装
PageInfo page = new PageInfo(list); 
//测试PageInfo全部属性 
//PageInfo包含了非常全面的分页属性 
assertEquals(1, page.getPageNum()); 
assertEquals(10, page.getPageSize()); 
assertEquals(1, page.getStartRow()); 
assertEquals(10, page.getEndRow()); 
assertEquals(183, page.getTotal()); 
assertEquals(19, page.getPages()); 
assertEquals(1, page.getFirstPage());
assertEquals(8, page.getLastPage());
assertEquals(true, page.isFirstPage()); 
assertEquals(false, page.isLastPage());
assertEquals(false, page.isHasPreviousPage()); 
assertEquals(true, page.isHasNextPage());
```

### 注意事项
1. 需要分页的查询语句，必须是处于PageHelper.startPage(1, 10);后面的第一条语句。
2. 如果查询语句是使用resultMap进行的嵌套结果映射，则无法使用PageHelper进行分页。 

 

