## 1. HelloWord级Mybatis 使用

### 1.1 新建表

```sql
create DATABASE mybatis;
use mybatis;
create table tb_user(
	id int(11) PRIMARY key auto_increment,
	name varchar(18) DEFAULT null,
	sex char(2) DEFAULT null,
	age int(11) DEFAULT null
);
```

### 1.2 新建项目，并新建实体类 User

```java
package domain;

public class User {

	private Integer id;

	private String name;

	private String sex;

	private Integer age;

	public User() {
		super();
	}

	public User(String name, String sex, Integer age) {
		super();
		this.name = name;
		this.sex = sex;
		this.age = age;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

}

```



### 1.3 加入jar包

- mybatis-3.4.5.jar
- mysql-connector-java-5.1.47.jar  (mysql 驱动)
- log4j-1.2.17.jar  （日志，可以换成其它的）

### 1.4 加入配置文件

#### 1.4.1 全局配置文件

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTO Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- XML配置文件包含对 Mybatis 系统的核心设置 -->
<configuration>
    <!-- 指定 Mybatis 所用日志的具体实现 -->
    <settings>
        <setting name="logImpl" value="LOG4j" />
    </settings>
    <!-- 环境配置，即连接的数据库 -->
    <environments default="mysql">
        <environment id="mysql">
            <!-- 指定事务管理类型 -->
            <!-- 这里简单的使用JDBC的提交和回滚 -->
            <transactionManager type="JDBC" />
            <!-- POOLED 是 JDBC 的数据源连接池的实现 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://127.0.0.1:3306/mybatis" />
                <property name="username" value="root" />
                <property name="password" value="123456" />
            </dataSource>
        </environment>
    </environments>
    <!-- mappers 告诉Mybatis 去哪里 找持久化类的映射文件 -->
    <mappers>
        <mapper resource="mapper/UserMapper.xml" />
    </mappers>
</configuration>
```

#### 1.4.2 User的Mapper 映射文件

UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTO Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mapper.UserMapper">
    <insert id="save" parameterType="domain.User" useGeneratedKeys="true">
        insert into tb_user(name,sex,age ) values (#{name},#{sex},#{age} )
    </insert>
</mapper>
```

#### 1.4.3 log4j的配置文件

log4j.properties

```properties
# 全局的日志配置
log4j.rootLogger=ERROR,stdout
# MyBatis的日志配置
log4j.logger.mapper.UserMapper=DEBUG
# 控制台输出
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p {%t} - %m%n
```

### 1.5 编写测试类测试

MyBatisSimpleTest.java

```java
package test;
import java.io.InputStream;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import domain.User;
public class MyBatisSimpleTest {
	public static void main(String[] args) throws Exception {
		// 读取 mybatis-config.xml配置文件
		InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
		// 初始化Mybatis,创建 SqlSessionFactory类的实例
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession session = sqlSessionFactory.openSession();
		User user = new User("admin", "男", 26);
		// 插入数据
		session.insert("mapper.UserMapper.save", user);
		// 提交事务
		session.commit();
		// 关闭session
		session.close();
	}
}
```

### 1.6 项目打包

MyBatisDemo01.zip

