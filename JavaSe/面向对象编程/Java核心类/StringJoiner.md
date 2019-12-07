# StringJoiner

> jdk1.8 开始加入的

## 使用分隔符来拼接数组

```java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());//Bob, Alice, Grace 
    }
}
```

 给`StringJoiner`指定“开头”和“结尾”： 

```java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ", "Hello ", "!");//依次是分隔符，头，尾
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());//Hello Bob, Alice, Grace! 
    }
}
```

不需要指定开头和结尾时，可以直接使用 `String.join()` 方法

