# CentOS 7 安装 MYSQL 

[toc]

## 环境

**操作系统:** CentOS 7

**MySQL**: 5.6.47

## 安装mysql

```shell
#下载rpm文件
wget http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm
#执行rpm源文件
rpm -ivh mysql-community-release-el6-5.noarch.rpm
#执行安装文件
yum install mysql-community-server
```

## 启动mysql

```shell
systemctl start mysqld
```



## 修改配置

### 设置密码

```shell
/usr/bin/mysqladmin -u root password '123456' 
#没有密码 有原来的密码则加
/usr/bin/mysqladmin -u root -p123456 password '123456'
```

###  修改my.cnf

`vim /etc/my.cnf`

```properties
[mysqld]
# MySQL设置大小写不敏感：默认：区分表名的大小写，不区分列名的大小写
# 0：大小写敏感 1：大小写不敏感
lower_case_table_names=1
# 默认字符集
character-set-server=utf8
```

### 授权远程登录

```mysql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
FLUSH PRIVILEGES;--刷新权限
show grants for root; -- 查看赋予的权限
```

**命令说明**：

- ALL PRIVILEGES :表示授予所有的权限，此处可以指定具体的授权权限。
- \*.\* :表示所有库中的所有表
- 'root'@'%' ： myuser是数据库的用户名，%表示是任意ip地址，可以指定具体ip地址。
- IDENTIFIED BY 'mypassword' ：mypassword是数据库的密码。

## 防火墙开放端口

```shell
# 检查防火墙状态
systemctl status firewalld
#检查端口状态 no 表示未开放
firewall-cmd --query-port=3306/tcp 
#开放端口
firewall-cmd --add-port=3306/tcp --permanent 
#重新载入配置
firewall-cmd --reload 
#移除端口
#firewall-cmd --permanent --remove-port=3306/tcp
```



##  卸载mysql

```shell
rpm -qa|grep mysql # 查看安装的mysql
yum repolist all | grep mysql
yum remove -y mysql mysql-libs mysql-common #卸载mysql
rm -rf /var/lib/mysql #删除mysql下的数据文件
rm /etc/my.cnf #删除mysql配置文件
yum remove -y mysql-community-release-el6-5.noarch #删除组件
```

