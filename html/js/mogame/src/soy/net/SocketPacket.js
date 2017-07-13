/**
 * Created by MikeRiy on 17/1/3.
 */

var PACKET_HEADER_SIZE = 4;

function SocketPacket()
{
    this.buffer = [];
    //this.buffSize = 0;
    this.readPos = 0;
    this.packetSize = 0;
}

SocketPacket.prototype =
{
    construct: SocketPacket,

    reset:function()
    {
        this.buffer = [];
        this.readPos = 0;
        this.packetSize = 0;
    },

    loadBytes:function(data, size, complete)
    {
        var bytes = new DataView(data);
        for(var i = 0; i < size; i++)
        {
            this.writeByte(bytes.getUint8(i));
        }
        //--
        this.packet(complete);
    },

    subLength:function()
    {
        return this.buffer.length - this.readPos;
    },

    empty:function()
    {
        return this.subLength() == 0;
    },

    setHeader:function()
    {
        var v1 = this.buffer[this.readPos] & 0xff;
        var v2 = this.buffer[this.readPos + 1] & 0xff;
        var v3 = this.buffer[this.readPos + 2] & 0xff;
        var v4 = this.buffer[this.readPos + 3] & 0xff;
        this.readPos += 4;
        //获取长度
        this.packetSize = (v1<<0)|(v2<<8)|(v3<<16)|(v4<<24);
    },

    writeByte:function(val)
    {
        this.buffer.push(val);
    },

    readByte:function()
    {
        var val = this.buffer[this.readPos];
        this.readPos++;
        return val;
    },

    packet:function(result)
    {
        if(this.packetSize == 0){
            if(this.subLength() >= PACKET_HEADER_SIZE)
            {
                this.setHeader();
                //--
                if(this.subLength() >= this.packetSize)
                {
                    this.packet(result);
                }
            }
        }else{
            if(this.subLength() >= this.packetSize)
            {
                //读取一个包
                var bytes = new Packet(this.packetSize);
                for(var i = 0; i < this.packetSize; i++)
                {
                    bytes.writeByte(this.readByte());
                }
                this.flush();
                LOG_DEBUG("收到包：size=", bytes.length());
                if(result)
                {
                    result(bytes);
                }
                //---发送消息
                //appNotice.send("SOCKET_PACKET", bytes);
                //发送消息后是否还有消息
                this.packet(result);
            }
        }
    },

    flush:function()
    {
        this.packetSize = 0;
        if(this.empty()) this.reset();
    }
}