# NodeJS 安装

## 1. 下载

https://nodejs.org/zh-cn/download/

## 2. 安装

1. 解压到 C:\soft\nodejs

2. 在 nodejs的根目录下 新建目录 

   node-global :npm全局安装位置

   node-cache：npm 缓存路径

3. 添加环境变量

   添加 C:\soft\nodejs\ 到 path

   添加 C:\soft\nodejs\node-global\ 到 path

   > 2020-1-22 17:20:17 node-global\ 最后少加了\ 一直找不到cnpm

4. 将上面新建的目录配置到nodejs

   npm config set prefix “C:\soft\nodejs\node-global”

   npm config set cache “C:\soft\nodejs\node-cache”

5. 设置国内源

    npm install -g cnpm --registry=https://registry.npm.taobao.org

   安装之后，可以用 cnpm 代替 npm ,测试cnpm:
   	cnpm install webpack -g

