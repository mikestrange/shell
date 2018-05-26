系统环境：CentOS 6.5 Desktop



在新装的系统中，重启网卡的时候出现如下报错：



# service network restart
正在关闭接口 eth0： 设备状态：3 (断开连接) [确定]
关闭环回接口： [确定]
弹出环回接口： [确定]
弹出界面 eth0： 活跃连接状态：激活的
活跃连接路径：/org/freedesktop/NetworkManager/ActiveConnection/1  [确定]



经查询，发现这是因为RedHat自己开发的NetworkManager管理工具和/etc/sysconfig/network-scripts/ifcfg-ethx配置不同步造成的。同时，这个问题只会在安装了图形界面的centos\rendhat系统里面出现，是图形界面NetworkManager服务调用的提示如果要消除这个提示，请关闭NetworkManager服务即可



# chkconfig |grep NetworkManager
# chkconfig NetworkManager off
# service NetworkManager stop
# service network restart



在重启网卡，就会发现这个问题已经不存在
# service network restart
正在关闭接口 eth0： [确定]
关闭环回接口： [确定]
弹出环回接口： [确定]

