/**
 * Created by MikeRiy on 16/12/31.
 */

//套接字
if(true){
    var sock = new TcpSocket();
    sock.connect("127.0.0.1",9081,function()
    {
        var byte = new ByteArray(1024);
        byte.setWPos(4);
        byte.writeInt(301);
        byte.writeInt(123);
        byte.writeInt(123);
        byte.writeInt(123);
        byte.writeInt(123);
        //
        byte.writeByte(1);
        byte.writeByte(0);
        byte.writeInt(10001);
        byte.writeString("我是谁");
        var str = "sdfds";
        str+="我只是个测试123213123123123123123123123213";
        byte.writeString(str);
        //
        var size = byte.length();
        byte.setWPos(0);
        byte.writeInt(size - 4);
        sock.sendPacket(byte);
    });
}

appNotice.add(301, function(packet){
    var type = packet.readByte();
    var waytype = packet.readByte();
    var uid = packet.readUInt();
    var name = packet.readString();
    var content = packet.readString();
    LOG_DEBUG(type, waytype, uid, name, content);
});

function main() {
    //引擎
    if (true) {
        //直接启动
        //var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'mygame', { preload: preload, create: create, update: update });
        // 创建一个新对象实例 640px 宽 480px 高:(未启动实例)
        var game = Soy.world(900);
        //可以状态跳转，跳转会卸载当前所有对象
        game.state.add('Main', GameScene);
        game.state.add('Gate', GateScene);
        game.state.add('Boot', Soy.Boot);
        game.state.add('Preloader', Soy.Preloader);
        //
        game.state.start("Boot");
    }
}
