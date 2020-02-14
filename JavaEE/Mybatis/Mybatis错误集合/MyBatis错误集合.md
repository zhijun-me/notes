# Mybatis错误集合

[toc]

## 启动报错

### org/apache/log4j/Priority

错误详情: java.lang.NoClassDefFoundError: org/apache/log4j/Priority

原因: mybatis 指定了 使用log4j-1.x ，但是没有引入。

## 运行时bug

### update_time 无法更新

```java
@TableField(fill = FieldFill.INSERT_UPDATE,update = "now()")
private LocalDateTime updateTime;
```

