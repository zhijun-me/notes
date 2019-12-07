# BigDecimal

 ###  `BigDecimal`用`scale()`表示小数位数 

```java
BigDecimal d1 = new BigDecimal("123.45");
BigDecimal d2 = new BigDecimal("123.4500");
BigDecimal d3 = new BigDecimal("1234500");
System.out.println(d1.scale()); // 2,两位小数
System.out.println(d2.scale()); // 4
System.out.println(d3.scale()); // 0
```

### `stripTrailingZeros`方法:  去掉小数后面可以去掉的`0`

```java
BigDecimal d1 = new BigDecimal("123.4500");
BigDecimal d2 = d1.stripTrailingZeros();
System.out.println(d1.scale()); // 4
System.out.println(d2.scale()); // 2,因为去掉了00
```

对整数使用:

```java
BigDecimal d3 = new BigDecimal("1234500");
BigDecimal d4 = d3.stripTrailingZeros();
System.out.println(d4);//1.2345E+6   变成了科学计数法
System.out.println(d4.intValue());//1234500
System.out.println(d4.scale());//-2   表示这个数是个整数，并且末尾有2个0。
```

###  精度问题

 `setScale` 可以设置精度，如果精度比原始值低，那么按照指定的方法进行四舍五入或者直接截断： 

```java
BigDecimal d1 = new BigDecimal("123.456789");
BigDecimal d2 = d1.setScale(4, RoundingMode.HALF_UP); // 四舍五入，123.4568
BigDecimal d3 = d1.setScale(4, RoundingMode.DOWN); // 直接截断，123.4567
```

 做除法时，存在无法除尽的情况，这时，就必须指定精度以及如何进行截断： 

```java
BigDecimal d1 = new BigDecimal("123.456");
BigDecimal d2 = new BigDecimal("23.456789");
BigDecimal d3 = d1.divide(d2, 10, RoundingMode.HALF_UP); // 保留10位小数并四舍五入
BigDecimal d4 = d1.divide(d2); // 报错：ArithmeticException，因为除不尽
```



### 求余数

没遇到过

```java
BigDecimal n = new BigDecimal("12.345");
BigDecimal m = new BigDecimal("0.12");
BigDecimal[] dr = n.divideAndRemainder(m);
System.out.println(dr[0]); // 102  商  
System.out.println(dr[1]); // 0.105 余数
```

 调用`divideAndRemainder()`方法时，返回的数组包含两个`BigDecimal`，分别是商和余数，其中商总是整数，余数不会大于除数。我们可以利用这个方法判断两个`BigDecimal`是否是整数倍数： 

```java
BigDecimal n = new BigDecimal("12.75");
BigDecimal m = new BigDecimal("0.15");
BigDecimal[] dr = n.divideAndRemainder(m);
if (dr[1].signum() == 0) {
    // n是m的整数倍
}
```



### 比较

 `equals()`方法不但要求两个`BigDecimal`的值相等，还要求它们的`scale()`相等 ,所以使用`compareTo`