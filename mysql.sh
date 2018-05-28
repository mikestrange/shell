cd ~/downloads
#php
yum install php php-devel
#php扩展
yum install php-mysql php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc

yum list installed | grep mysql
yum install mysql
yum install mysql-devel
#yum install mysql-server (无法安装)
#方法1
#MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可。开发这个分支的原因之一是：甲骨文公司收购了MySQL后，有将MySQL闭源的潜在风险，因此社区采用分支的方式来避开这个风险。MariaDB的目的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。
#yum install mariadb-server mariadb
#方法2 (可行)
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install mysql-community-server

#systemctl restart mysqld

#登录mysql: mysql -uroot -p
#设置mysql密码: mysadmin -u root -p password 123456
#(或者)刷新密码:update user set password=password('123456') where user='root';
#设置远程访问:GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "123456";


cd /usr/share/mysql
mysql -u root -p
update user set password=password('123456') where user='root';
update user set host="%" where user='root' and host='localhost';
#刷新才会生效:flush privileges;


#reset mysql
vi /etc/my.cnf
# skip-grant-tables
mysql -u root -p