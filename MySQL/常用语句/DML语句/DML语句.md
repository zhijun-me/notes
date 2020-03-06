# DML语句

[toc]

## 环境

**MYSQL：**  5.6

## 插入语句(insert)

### 插入指定列

```mysql
insert into 表 (列名1,列名2,列名3..) values (值1,值2,值3..);
```

### 插入所有列

```mysql
insert into 表 values (值1,值2,值3..);
```

### 插入查询结果(指定列)

```mysql
insert into 表 (列名1,列名2,列名3..) values select (列名1,列名2,列名3..) from 表
```

### 插入查询结果(所有列)

```mysql
insert into 表 values select * from 表
```

**注意:**

1. 列名数与values后面的值的个数相等
2. 列的顺序与插入的值得顺序一致
3. 列名的类型与插入的值要一致.
4. 插入值得时候不能超过最大长度.
5. 值如果是字符串或者日期需要加引号’’ （一般是单引号）

## 更新语句(update)

### 不带条件更新

```mysql
update 表名 set 字段名=值,字段名=值;
```

### 带条件更新

```mysql
update 表名 set 字段名=值,字段名=值 where 条件;
```

**注意：**

1. 列名的类型与修改的值要一致.
2. 修改值得时候不能超过最大长度.
3. 值如果是字符串或者日期需要加’’.

## 删除语句(delete)

### 不带条件删除

```mysql
delete from 表名;
```

### 带条件删除

```mysql
delete from 表名 where 条件;
```

### 清空表(truncate)

```mysql
truncate table 表名
```

### delete 和 truncate 区别

- delete ：一条一条删除，不清空auto_increment记录数。
- truncate ：直接将表删除，重新建表，auto_increment将置为零，从新开始。

