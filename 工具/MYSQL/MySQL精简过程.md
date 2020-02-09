# MYSQL 精简过程

MYSQL版本： 5.7.20 

参考自 https://blog.csdn.net/qq_40615403/article/details/100577395

**不对精简后的结果负责！！！**



只留下	bin 、 share 、COPYING、README 

 bin 下面保留  mysql.exe 、mysqladmin.exe、mysqld.exe

share 下面 保留  charsets 、english



shell脚本(使用git-bash 执行，实在不会cmd脚本)：

```shell
#!/bin/bash
# MYSQL 精简脚本
# 把这个脚本放在MYSQL的目录下执行(bin、lib.. 那一层)
# by zhongzj 
# 2020-1-27 17:48:56

# 删除 bin 、 share 外的文件夹
rm -rf  docs  include lib  data

#删除 bin 下面多余的文件
mkdir bin-new
mv bin/mysql.exe  bin-new/
mv bin/mysqladmin.exe  bin-new/
mv bin/mysqld.exe  bin-new/
rm -rf bin
mv bin-new  bin

#删除 share下面的多余的文件
mkdir share-new
mv share/charsets  share-new
mv share/english  share-new
rm -rf share
mv share-new share
```

