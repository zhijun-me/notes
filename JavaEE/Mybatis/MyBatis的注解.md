# Mybatis 注解

## 1. 简单的使用

**注册mapper.xml**

```xml
<mapper resource="mapper/UserMapper.xml" />
```

xml内容

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTO Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="mapper.UserMapper">
</mapper>
```

**定义接口**

```java
package mapper;

import domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {
    /**
     * 查询所有
     */
    @Select("select * from tb_user")
    List<User> selectAll();

    /**
     * 通过id查询
     */
    @Select("select * from tb_user where id=#{id}")
    User selectById(Integer id);

    /**
     * 通过id查询的另一种写法
     */
    @Select("select * from tb_user where id=#{id}")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "age",column = "age")
    })
    User selectById2(Integer id);

    /**
     * 更新name
     */
    @Update("update tb_user set name = #{name} where id = #{id}")
    int updateNameById(@Param("id") Integer id,@Param("name")  String name);

    /**
     * 插入
     */
    @Insert("insert into tb_user(name,sex,age ) values (#{name},#{sex},#{age} )")
    @Options(
            useGeneratedKeys = true,
            keyProperty = "id"
    )
    int insert(User user);
}

```

注意，update这里如果 没有使用 Param 注解，则会报错，我看的书上说会以参数顺序来匹配，但是我调的时候直接报错了。

**调用**

```java
List<User> userList = userMapper.selectAll();
```

## 2. 一对一

关键代码

```java
//clazzMapper

@Select("select * from tb_clazz where id = #{id}")
Clazz selectById(Integer id);

//StudentMapper
@Select("select * from tb_student where id = #{id}")
@Results({
	@Result(id = true,property = "id",column = "id"),
    @Result(property = "name",column = "name"),
    @Result(property = "sex",column = "sex"),
    @Result(property = "age",column = "age"),
    @Result(property = "clazz_id",column = "clazz_id"),
    @Result(property = "clazz",column = "clazz_id",one = @One(
    		select = "mapper.ClazzMapper.selectById",
            fetchType = FetchType.EAGER
		))
    })
    Student selectById(Integer id);
}
```

## 3. 一对多

关键代码

```java
//StudentMapper  
@Select("select * from tb_student where clazz_id=#{clazzId}")
List<Student> selectByClazzId(Integer clazzId);

//ClazzMapper
@Select("select * from tb_clazz where id = #{id}")
@Results({
	@Result(id = true, property = "id", column = "id"),
    @Result(property = "code", column = "code"),
    @Result(property = "studentList", column = "id",
    		many = @Many(select = "mapper.StudentMapper.selectByClazzId",fetchType = FetchType.LAZY)
		)
})
Clazz selectById(Integer id);
```

## 4. 动态SQL

关键代码:

```java
//StudentMapper
@SelectProvider(type = StudentDynaSqlProvider.class,method = "selectWithParam")
List<Student> selectByParam(Map<String,Object> paramMap);

//StudentDynaSqlProvider
/**
 * 动态SQL
 */
public class StudentDynaSqlProvider {

    public String selectWithParam(Map<String, Object> paramMap) {
        //写法1：
        SQL sql = new SQL();
        sql.SELECT("*").FROM("tb_student");
        if (paramMap.containsKey("name")) {
            sql.WHERE("name = #{name}");
        }

        //写法2：
        sql = new SQL() {
            {
                SELECT("*");
                FROM("tb_student");
                if (paramMap.containsKey("name")) {
                    WHERE("name = #{name}");
                }
                if(paramMap.containsKey("age")){
                    WHERE("age=#{age}");
                }
            }
        };
        return sql.toString();
    }
}

```

