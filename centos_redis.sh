#http://www.linuxidc.com/Linux/2016-09/135557.htm

方法1 (可行)
cd downloads

wget http://download.redis.io/releases/redis-3.0.4.tar.gz

tar -xzvf redis-3.0.4.tar.gz

cd redis-3.0.4

make

yum install tcl

cp redis.conf /etc/

#vi /etc/redis.conf
#daemonize yes

#启动
cd /usr/local/bin
./redis-server /etc/redis.conf

#查看
ps -ef | grep redis

#为了能让Redis在服务器重启后自动启动，需要将启动命令写入开机启动项：
echo "/usr/local/bin/redis-server /etc/redis.conf" >>/etc/rc.local

#停止redis (直接kill 进程)
redis-cli shutdown
#进入客户端
redis-cli
redis-cli -a 9527123


#daemonize：是否以后台daemon方式运行
#pidfile：pid文件位置
#port：监听的端口号
#timeout：请求超时时间
#loglevel：log信息级别
#logfile：log文件位置
#databases：开启数据库的数量
#save * *：保存快照的频率，第一个*表示多长时间，第三个*表示执行多少次写操作。在一定时间内执行一定数量的写操作时，自动保存快照。可设置多个条件。
#rdbcompression：是否使用压缩
#dbfilename：数据快照文件名（只是文件名）
#dir：数据快照的保存目录（仅目录）
#appendonly：是否开启appendonlylog，开启的话每次写操作会记一条log，这会提高数据抗风险能力，但影响效率。
#appendfsync：appendonlylog如何同步到磁盘。三个选项，分别是每次写都强制调用fsync、每秒启用一次fsync、不调用fsync等待系统自己同步




方法2(不建议)
yum -y install redis
启动服务：
systemctl start redis.service
停止服务：
systemctl stop redis.service
重启服务：
systemctl restart redis.service
检查状态：
systemctl status redis.service