# Spring JDBC

jar包 依赖:

第一部分是Spring 核心包 :

```
spring-beans-5.1.2.RELEASE.jar
spring-context-5.1.2.RELEASE.jar
spring-core-5.1.2.RELEASE.jar
spring-expression-5.1.2.RELEASE.jar
```

第二部分是 日志相关的包:

```
commons-logging-1.2.jar
log4j-1.2.14.jar
```

第三部分是Aop的包:

```
spring-aop-5.1.2.RELEASE.jar
```

第四部分是Spring-JDBC相关的表:

```
spring-jdbc-5.1.2.RELEASE.jar
spring-test-5.1.2.RELEASE.jar
spring-tx-5.1.2.RELEASE.jar
```

第五部分 数据库连接相关的包 :

```
c3p0-0.9.5.2.jar
mchange-commons-java-0.2.15.jar
mysql-connector-java-5.1.45.jar
```

最后是Junit的包:(可选)

```
hamcrest-core-1.3.jar
junit-4.12.jar
```





##  jdbcTemplate

Spring jdbc 通过 jdbcTemplate 来实现jdbc操作。

```java
//JdbcTemplate的创建

@Component
@PropertySource("db.properties")
public class DataSouceConfig {
    @Value("${jdbc.driver}")
    private String jdbcDriver;
    @Value("${jdbc.url}")
    private String jdbcUrl;
    @Value("${jdbc.user}")
    private String jdbcUser;
    @Value("${jdbc.password}")
    private String jdbcPassword;

    @Bean
    DataSource dataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(jdbcDriver);
        dataSource.setJdbcUrl(jdbcUrl);
        dataSource.setUser(jdbcUser);
        dataSource.setPassword(jdbcPassword);
        return dataSource;
    }
    @Bean
    JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

jdbcTemplate  的主要使用方法：

​     int **update**(String sql, Object... args)     执行新装、修改、删除等更新语句

​     T **queryForObject**(String sql, Class<T> requiredType,Object ...args)    执行SQL，并返回指定类型的值

 	初步测试，可以返回简单类型（8大包装类和String），个人认为是只能返回一列，比如 返回count(1)的记过，但是需要类型匹配，似乎不支持映射到Map里面。

​    T **queryForObject**(String sql, Object[] args, Class<T> requiredType) 同上

​    T **queryForObject**(String sql, RowMapper<T> rowMapper, Object... args) 执行查询语句，并使用传递过去的内部类处理返回结果:

```java
User user= jdbcTemplate.queryForObject(sql, new RowMapper<User>() {
    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        return rsToUser(resultSet,index);
    }
});

//还可以写成下面这样
User user= jdbcTemplate.queryForObject(sql, new UserMapper());
private static final class UserMapper implements RowMapper<User> {
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        return user;
    }
}
```

T **queryForObject**(String sql, Object[] args, RowMapper<T> rowMapper) 是上面的重载

int **update**(String sql,Object... args)  执行update语句

 void **execute**(final String sql)； //可以执行任意SQL(比如DDL语句)，不过**没有返回值**



下面两个没看出来怎么用，后面的参数是回调函数。

jdbcTemplate.execute(sql, (PreparedStatementCallback<Object>) preparedStatement -> null);

jdbcTemplate.execute(sql, (CallableStatementCallback<Object>) callableStatement -> null);





**详细使用实例如下：**

```java
//Dao
public interface UserDao {
    boolean add(User user);
    boolean deleteById(Integer id);
    boolean update(User user);
    User selectById(Integer id);
    List<User> selectAll();
    List<User> selectAll2();
    List<User> selectByParam(User user);
}
//DaoImpl
@Repository
public class UserDaoImpl implements UserDao {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @Override
    public boolean add(User user) {
        String sql = "INSERT INTO tb_user(id, name) VALUES (?, ?) ";
        return jdbcTemplate.update(sql, user.getId(), user.getName()) == 1;
    }

    @Override
    public boolean deleteById(Integer id) {
        String sql = "delete from tb_user where id = ?";
        return jdbcTemplate.update(sql, id) == 1;
    }

    @Override
    public boolean update(User user) {
        String sql = "update tb_user set id= ? ,name = ? where id = ?";
        return jdbcTemplate.update(sql, user.getId(), user.getName(), user.getId()) == 1;
    }

    @Override
    public User selectById(Integer id) {
        String sql = "select * from tb_user where id = ? ";
        return jdbcTemplate.queryForObject(sql, this::rsToUser, id);
    }

    @Override
    public List<User> selectAll() {
        String sql = "select * from tb_user ";
        List<Map<String, Object>> mapList = jdbcTemplate.queryForList(sql);
        return mapList.stream().map(this::mapToUser).collect(Collectors.toList());
    }

    @Override
    public List<User> selectAll2() {
        String sql = "select * from tb_user ";
        return jdbcTemplate.query(sql, this::rsToUser);
    }

    @Override
    public List<User> selectByParam(User user) {
        String sql="select *from tb_user where 1 = 1";
        Integer id = user.getId();
        String name = user.getName();
        List<Object> paramList = new ArrayList<>(2);
        if(id!=null){
            sql+=" and  id = ?";
            paramList.add(id);
        }
        if(name!=null){
            sql+=" and name = ? ";
            paramList.add(name);
        }
        List<Map<String, Object>> mapList = jdbcTemplate.queryForList(sql, paramList.toArray());
        return mapList.stream().map(this::mapToUser).collect(Collectors.toList());
    }

    private User mapToUser(Map<String,Object> m){
        User user = new User();
        user.setId((Integer) m.get("id"));
        user.setName((String) m.get("name"));
        return user;
    }
    private User rsToUser(ResultSet rs, int index) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        return user;
    }
}
```

