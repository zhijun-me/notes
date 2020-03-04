# win10 安装MYSQL

## 环境

**操作系统:** Windows 10

**MySQL版本**: 5.7.20 解压版

**安装目录：** H:/soft/mysql



##  安装MYSQL

**my.ini 文件**

```ini
# 创建 my.ini 文件
cat > my.ini <<'EOF'
[client]
port=3306
default-character-set=utf8
[mysqld] 
# 设置为自己MYSQL的安装目录 
basedir=H:/soft/mysql
# 设置为MYSQL的数据目录 
datadir=H:/soft/mysql/data
port=3306
character_set_server=utf8
sql_mode=NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
#开启查询缓存
explicit_defaults_for_timestamp=true
#skip-grant-tables
max_connections=1000
EOF
```

安装服务

```bash
#安装服务: 
bin/mysqld.exe --install MySQL5.7 --defaults-file="H:/soft/mysql/my.ini"
#初始化数据（无密码）
bin/mysqld.exe --initialize-insecure  --user =mysql
# 启动服务
net start MySQL5.7
```

修改密码

```sql
#登录 MYSQL，注意，这里要用cmd
mysql -u root -p 
set password for root@localhost =password('123456'); 
```

