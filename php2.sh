#php
#yum install php php-devel
#php扩展
#yum install php-mysql php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc

#yum list installed | grep mysql
#yum install mysql
#yum install mysql-devel
#yum install mysql-server (无法安装)
#方法1
#MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可。开发这个分支的原因之一是：甲骨文公司收购了MySQL后，有将MySQL闭源的潜在风险，因此社区采用分支的方式来避开这个风险。MariaDB的目的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。
#yum install mariadb-server mariadb
#方法2 (可行)
# wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
# rpm -ivh mysql-community-release-el7-5.noarch.rpm
# yum install mysql-community-server

#systemctl restart mysqld

yum install epel-release
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
#数据库的php客户端
yum install phpmyadmin
yum install phpmyadmin php-mcrypt
#映射文件
ln -s /usr/share/phpMyAdmin phpmyadmin
#配置
cp /var/www/html/phpmyadmin/libraries/config.default.php /var/www/html/phpmyadmin/config.inc.php
#修改
#vi /var/www/html/phpmyadmin/config.inc.php
#设置数据库密码(搜索): /password'
#权限
#vi /etc/httpd/conf.d/phpMyAdmin.conf
#注释 Require ip 增加 Require all granted