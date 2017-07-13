/**
 * Created by MikeRiy on 16/12/30.
 */

function TcpSocket()
{
    this.socket = null;
    this.packet = new SocketPacket();
}

TcpSocket.prototype =
{
    construct:TcpSocket,

    connect:function(ip, port, complete)
    {
        this.packet.reset();
        var packet = this.packet;
        var host = "ws://" + ip + ":" + port;
        try {
            this.socket = new WebSocket(host, "echo-protocol");
            this.socket.binaryType = 'arraybuffer';
            LOG_DEBUG("new socket status " + this.socket.readyState);
            this.socket.onopen = function (msg)
            {
                LOG_DEBUG("connect status " + this.readyState);
                //LOG_ALERT("成功连接服务器");
                if(complete) complete(this.readyState);
            };
            this.socket.onmessage = function(msg)
            {
                LOG_DEBUG("read: %o size=%d" , msg.data, msg.data.byteLength);
                packet.loadBytes(msg.data, msg.data.byteLength);
                packet.packet();
            };
            //
            this.socket.onclose = function (msg)
            {
                LOG_DEBUG("close status " + this.readyState);
            };
            this.socket.onerror = function(evt)
            {
                LOG_DEBUG("onerror status " + evt);
            }
        } catch (ex) {
            LOG_DEBUG("socket connect error:",ex);
        }
    },

    packetMessage:function(msg)
    {
        LOG_ALERT(msg.length());
    },

    close:function()
    {
        this.socket.close();
    },

    send:function(bytes)
    {
        try {
            LOG_DEBUG("send:%o size=%d", bytes, bytes.length);
            this.socket.send(bytes);
        }catch (ex){
            LOG_DEBUG(ex);
        }
    },
    sendPacket:function(packet)
    {
        this.send(packet.getBytes());
    }
}