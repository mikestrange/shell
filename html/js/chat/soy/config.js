/**
 * Created by MikeRiy on 17/1/3.
 */

//初始化
var jsList = [
    "soy/net/ByteArray.js",
    "soy/net/SocketPacket.js",
    "soy/net/TcpSocket.js",
    "soy/event/event.js"];

function LOG_DEBUG()
{
    console.log.apply(console, arguments);
}

function LOG_WARN()
{
    console.log.warn(console, arguments);
}

function LOG_ERROR()
{
    console.error.apply(console, arguments);
}

function LOG_ALERT()
{
    alert.apply(null, arguments);
}


//导入所有JS
include.apply(null, jsList);