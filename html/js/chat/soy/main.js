/**
 * Created by MikeRiy on 16/12/31.
 */


function read_packet(bits)
{
    bits.readInt();
    bits.readInt();
    bits.readInt();
    bits.readInt();
    bits.readInt();
    //
    bits.readByte();
    bits.readByte();
    bits.readInt();
    //
    var s1 = bits.readString();
    var s2 = bits.readString();

    LOG_DEBUG(s1, s2);
}

appNotice.add("socket_packet", read_packet);

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
