# classpath和jar

## classpath

`classpath`是JVM用到的一个环境变量，它用来指示JVM如何搜索`class`。如果JVM在某个路径下找到了对应的`class`文件，就不再往后继续搜索。如果所有路径下都没有找到，就报错 。

`classpath`的设定方法有两种：

- 在系统环境变量中设置`classpath`环境变量，不推荐；__不需要把 `rt.jar`放入`classpath` __

- 在启动JVM时设置`classpath`变量，推荐。 实际上就是给`java`命令传入`-classpath`或`-cp`参数： 

    ```shell
    java -classpath .;C:\work\project1\bin;C:\shared abc.xyz.Hello
    
    # 或者使用-cp的简写：
    java -cp .;C:\work\project1\bin;C:\shared abc.xyz.Hello
    
    #没有设置系统环境变量，也没有传入-cp参数，那么JVM默认的classpath为.，即当前目录：
    java abc.xyz.Hello
    ```

##jar包

 jar包实际上就是一个zip格式的压缩文件，而jar包相当于目录 。如果我们要执行一个jar包的`class`，就可以把jar包放到`classpath`中： 

```shell
java -cp ./hello.jar abc.xyz.Hello
```

### MANIFEST.MF

jar包还可以包含一个特殊的`/META-INF/MANIFEST.MF`文件，`MANIFEST.MF`是纯文本，可以指定`Main-Class`和其它信息。JVM会自动读取这个`MANIFEST.MF`文件，如果存在`Main-Class`，我们就不必在命令行指定启动的类名，而是用更方便的命令：

```
java -jar hello.jar
```

jar包还可以包含其它jar包，这个时候，就需要在`MANIFEST.MF`文件里配置`classpath`了。

 在大型项目中，不可能手动编写`MANIFEST.MF`文件，再手动创建zip包。Java社区提供了大量的开源构建工具，例如[Maven](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945359327200)，可以非常方便地创建jar包。 所以知道个大概就好了。

