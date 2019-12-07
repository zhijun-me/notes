# JavaBean

##  Introspector

Introspector类提供了 `getBeanInfo`方法来获取JavaBean的属性、方法和事件。有多个重载，可以根据访问权限过滤。貌似没怎么用过。

```java
public class Main {
    public static void main(String[] args) throws Exception {
        BeanInfo info = Introspector.getBeanInfo(Person.class);
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            System.out.println(pd.getName());
            System.out.println("  " + pd.getReadMethod());
            System.out.println("  " + pd.getWriteMethod());
        }
    }
}

class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
/*
age 
  public int Person.getAge() 
  public void Person.setAge(int) 
class 
  public final native java.lang.Class java.lang.Object.getClass() 
  null 
name 
  public java.lang.String Person.getName() 
  public void Person.setName(java.lang.String) 
*/
```





