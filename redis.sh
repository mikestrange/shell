#!/bin/bash

#cd /usr/local/bin
#./redis-server /etc/redis.conf


#redis-cli

#redis-cli -o password


wget http://download.redis.io/releases/redis-4.0.2.tar.gz


tar xzf redis-4.0.2.tar.gz

cd ~/redis/redis-4.0.2

make

make install

cd redis-4.0.2

cp redis.conf /etc/

#vi /etc/redis.conf

# 修改daemonize配置项为yes，使Redis进程在后台运行：daemonize yes

#cd /usr/local/bin
#./redis-server /etc/redis.conf

# 为了能让Redis在服务器重启后自动启动，需要将启动命令写入开机启动项：
#echo "/usr/local/bin/redis-server /etc/redis.conf" >>/etc/rc.local
#chmod +x /etc/rc.d/rc.local    #该文件可执行才能启动服务

#远程访问修改
# bind 127.0.0.1改为 #bind 127.0.0.1
# protected-mode yes 改为 protected-mode no