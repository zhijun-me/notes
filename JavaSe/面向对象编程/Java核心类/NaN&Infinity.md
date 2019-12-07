# NaN & Infinity

好像没什么用... 没用过

Double：

```java
public static final double POSITIVE_INFINITY = 1.0 / 0.0;

public static final double NEGATIVE_INFINITY = -1.0 / 0.0;
```

Float：

```java
public static final float POSITIVE_INFINITY = 1.0f / 0.0f;

public static final float NEGATIVE_INFINITY = -1.0f / 0.0f;
```

1. 无限乘以0，结果为NAN

```java
System.out.println(Float.POSITIVE_INFINITY * 0); // output: NAN
System.out.println(Float.NEGATIVE_INFINITY * 0); // output: NAN
```

 2.无限除以0，结果不变，还是无限

```java
System.out.println((Float.POSITIVE_INFINITY / 0) == Float.POSITIVE_INFINITY); // output: true
System.out.println((Float.NEGATIVE_INFINITY / 0) == Float.NEGATIVE_INFINITY); // output: true
```

  3.无限做除了乘以0意外的运算，结果还是无限 

```java
System.out.println(Float.POSITIVE_INFINITY == (Float.POSITIVE_INFINITY + 10000)); // output: true
System.out.println(Float.POSITIVE_INFINITY == (Float.POSITIVE_INFINITY - 10000)); // output: true
System.out.println(Float.POSITIVE_INFINITY == (Float.POSITIVE_INFINITY * 10000)); // output: true
System.out.println(Float.POSITIVE_INFINITY == (Float.POSITIVE_INFINITY / 10000)); // output: true
```

要判断一个浮点数是否为INFINITY，可用isInfinite方法

```java
System.out.println(Double.isInfinite(Float.POSITIVE_INFINITY)); // output: true
```

2、NAN

java中的NAN是这么定义的：

```java
public static final double NaN = 0.0d / 0.0;
```

NAN表示非数字，它与任何值都不相等，甚至不等于它自己，所以要判断一个数是否为NAN要用isNAN方法：

```java
System.out.println(Float.NaN == Float.NaN); // output: false
System.out.println(Double.isNaN(Float.NaN)); // output: true
```

