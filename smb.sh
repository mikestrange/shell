3)SELinux作怪
1:修改/etc/sysconfig/selinux 把enforcing改成disabled；然后命令行setenforce 0；
2:使用selinux强制策略：chcon -R -t samba_share_t /home/mike/share

4)修改目录权限 #chmod 777 /home/wind ; #chmod 777 /home/wind/smbShare; 特别是前面一个做为上层目录权限也需要修改！！！！