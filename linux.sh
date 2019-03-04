#!/bin/bash
#yum -y remove #移除插件命令

#yum install ssh
#yum install openssh-server
## 解决-bash: scp: command not found
#yum install openssh-clients

cd ~
#mkdir .ssh
#重启ssh
#systemctl restart sshd

#安装服务器
yum install httpd httpd-devel
#开机启动http
systemctl enable httpd

# (CentOS6)
#service httpd restart
# (CentOS7)
#systemctl restart httpd

#git
#yum install git
#后台运行(已经无用了)
#yum install screen

###================默认php安装(5.4)不够用啊，兄弟
yum install php php-devel
#php扩展(和php版本无关)
yum install php-mysql php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc
###=================php升级到5.6 默认5.4(centos 7.0+)=================
rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm  
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
#删除php的基础库
yum remove php-common
#安装新版本php5.6
yum install -y php56w php56w-opcache php56w-xml php56w-mcrypt php56w-gd php56w-mysql php56w-intl php56w-mbstring 
#查看新的php版本
php -v
#最后记得重启httpd
systemctl restart httpd
###=================php升级到5.6 默认5.4=================

###================phpMyAdmin安装===================
yum install phpmyadmin
yum install phpmyadmin php-mcrypt
#移动到httpd的路径下
cd /var/www/html
#映射文件
sudo ln -s /usr/share/phpMyAdmin phpmyadmin
#备份配置
cp /var/www/html/phpmyadmin/libraries/config.default.php /var/www/html/phpmyadmin/config.inc.php
#链接mysql的配置 可以不管
#vi /var/www/html/phpmyadmin/config.inc.php
#设置数据库密码(搜索): /password
#外网权限修改
#vi /etc/httpd/conf.d/phpMyAdmin.conf
#注释 Require ip * 增加 Require all granted
###================phpMyAdmin安装===================

###=================mysql安装====================
yum list installed | grep mysql
yum install mysql
yum install mysql-devel
#yum install mysql-server (无法安装)
#方法1 (目前没用过)
#PS1: MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可。
#PS2: 开发这个分支的原因之一是：甲骨文公司收购了MySQL后，有将MySQL闭源的潜在风险，因此社区采用分支的方式来避开这个风险。
#PS3: MariaDB的目的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。
#yum install mariadb-server mariadb
#方法2 (可行)
mkdir ~/downloads
cd ~/downloads
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install mysql-community-server
systemctl restart mysqld
#开机启动mysql
systemctl enable mysqld

#登录mysql: mysql -uroot -p
#use mysql;
#设置mysql密码: mysadmin -u root -p password 123456
#(或者)刷新密码:update user set password=password('123456') where user='root';
#设置远程访问:GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "123456";
#刷新才会生效:flush privileges;

#source /etc/profile source #重载
###====================go语言安装(服务器可以不用安装，直接生成可执行程序即可)==================
#方法1 (可行)
#yum install go
#方法2
#wget https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz
#tar zxvf go1.8.linux-amd64.tar.gz -C /usr/local
#设置变量 
#vi /etc/profile
#export GOROOT=/usr/local/go
#export PATH=$GOROOT/bin:$PATH
#export GOPATH=~/home/goser/
#注意:  编译linux64系统: GOOS=linux GOARCH=amd64 go build -o $NAME $dir/src/main.go


#查看进程
#top -p 进程号
#ps aux | grep 进程号/名称
#ps -ef | grep   进程名称
#cat /proc/进程号/status
#1、VmRSS是真实正在占用的内存，而VmData是虚拟内存，大小差异大并没有什么问题。
#2、VmData是指数据段的内存大小，存放初始化了的数据； (total_vm-shared_vm-stack_vm)
#3、不调动态库的时候是不计算的(dlopen方式)
#4、静态库会编译为程序本身的一部分，不在VmLib的统计之内。
#5、参考上面的说明
#6、除非有非常明显的内存泄露，如内存一直大幅度增长并长时间不释放，否则单纯以来这些值是很判断真正的内在泄露。

