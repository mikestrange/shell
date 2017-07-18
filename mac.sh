Mac
使用pbcopy命令。 对应有个pbpaste命令。

pbcopy < file
pbpaste > file.name

多服务访问
生成密钥对:
ssh-keygen -t rsa

1、在每台服务器上都执行ssh-keygen -t rsa生成密钥对:
#ssh-keygen -t rsa

2、在每台服务器上生成密钥对后，将公钥复制到需要无密码登陆的服务器上：
举例如192.168.15.240，192.168.15.241，192.168.15.242这三台服务器需要做相互免密码登陆，在每台服务器生成密钥对后，在每台服务器上执行ssh-copy-id命令（具体说明及用法见最后附录），将公钥复制到其它两台服务器上(此处以192.168.15.240为例，用户为root,其它两台步骤相同）
#ssh-copy-id -i  ~/.ssh/id_rsa.pub root@192.168.15.241
#ssh-copy-id -i  ~/.ssh/id_rsa.pub root@192.168.15.242
以上命令，可以自动将公钥添加到名为authorized_keys的文件中，在每台服务器都执行完以上步骤后就可以实现多台服务器相互无密码登陆了

Linux系统里缺省都包含一个名为ssh-copy-id的工具：

# type ssh-copy-id
ssh-copy-id is /usr/bin/ssh-copy-id

你用cat或者more命令看一下就知道ssh-copy-id本身其实就是一个shell脚本，用法很简单：

# ssh-copy-id -i ~/.ssh/id_rsa.pub user@server

再也不用记如何拼写authorized_keys这个文件名了，是不是很爽，可惜别高兴太早了，ssh-copy-id有一个很要命的问题，那就是缺省它仅仅支持SSH运行在22端口的情况，不过实际上出于安全的需要，我们往往都会更改服务器的SSH端口，比如说改成10022端口，这时候你运行ssh-copy-id就会报错了，直接修改ssh-copy-id脚本当然可以修正这个问题，但是那样显得太生硬了，实际上还有更好的办法：

# vi ~/.ssh/config

加上内容：

Host server
Hostname ip
Port 10022

你也可以单独只加入Port一行配置，那样就是一个全局配置，保存后再运行ssh-copy-id命令就不会报错了。

补充：经网友提示，如果端口不是22，不修改config文件，按如下方式也可以：

ssh-copy-id -i ~/.ssh/id_rsa.pub “-p 10022 user@server”



//修改http访问路径
1.打开/etc/apache2/httpd.conf文件
sudo vim /etc/apache2/httpd.conf
2.找到并修改
/Library/WebServer/Documents