/**
 * Created by MikeRiy on 17/1/3.
 */
UINT_MAX = 0xffffffff;
var PACKET_HEADER_SIZE = 4;

function binayUtf8ToString(buf, begin){
    //var pos = 0;
    var str ="";
    var unicode = 0 ;
    var flag = 0;
    for (var pos = begin; pos < buf.length;){
        flag= buf[pos];
        if ((flag >>>7) === 0 ) {
            str+= String.fromCharCode(buf[pos]);
            pos += 1;
        }
        else if ((flag &0xFC) === 0xFC ){
            unicode = (buf[pos] & 0x3) << 30;
            unicode |= (buf[pos+1] & 0x3F) << 24;
            unicode |= (buf[pos+2] & 0x3F) << 18;
            unicode |= (buf[pos+3] & 0x3F) << 12;
            unicode |= (buf[pos+4] & 0x3F) << 6;
            unicode |= (buf[pos+5] & 0x3F);
            str+= String.fromCharCode(unicode) ;
            pos += 6;
        }else if ((flag &0xF8) === 0xF8 ){
            unicode = (buf[pos] & 0x7) << 24;
            unicode |= (buf[pos+1] & 0x3F) << 18;
            unicode |= (buf[pos+2] & 0x3F) << 12;
            unicode |= (buf[pos+3] & 0x3F) << 6;
            unicode |= (buf[pos+4] & 0x3F);
            str+= String.fromCharCode(unicode) ;
            pos += 5;
        }
        else if ((flag &0xF0) === 0xF0 ){
            unicode = (buf[pos] & 0xF) << 18;
            unicode |= (buf[pos+1] & 0x3F) << 12;
            unicode |= (buf[pos+2] & 0x3F) << 6;
            unicode |= (buf[pos+3] & 0x3F);
            str+= String.fromCharCode(unicode) ;
            pos += 4;
        }
        else if ((flag &0xE0) === 0xE0 ){
            unicode = (buf[pos] & 0x1F) << 12;;
            unicode |= (buf[pos+1] & 0x3F) << 6;
            unicode |= (buf[pos+2] & 0x3F);
            str+= String.fromCharCode(unicode) ;
            pos += 3;
        }
        else if ((flag &0xC0) === 0xC0 ){ //110
            unicode = (buf[pos] & 0x3F) << 6;
            unicode |= (buf[pos+1] & 0x3F);
            str+= String.fromCharCode(unicode) ;
            pos += 2;
        }
        else{
            str+= String.fromCharCode(buf[pos]);
            pos += 1;
        }
    }
    return str;
}

function unicodeToUtf8(str) {
    var i, len, ch;
    //var utf8Str = "";
    len = str.length;
    var byteArray = [];
    for (i = 0; i < len; i++) {
        ch = str.charCodeAt(i);
        if ((ch >= 0x0) && (ch <= 0x7F)) {
            // utf8Str += str.charAt(i);
            byteArray.push(str.charCodeAt(i));
        } else if ((ch >= 0x80) && (ch <= 0x7FF)){
            // utf8Str += String.fromCharCode(0xc0 | ((ch >> 6) & 0x1F));
            // utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));
            byteArray.push(0xc0 | ((ch >> 6) & 0x1F));
            byteArray.push(0x80 | (ch & 0x3F));
        } else if ((ch >= 0x800) && (ch <= 0xFFFF)){
            // utf8Str += String.fromCharCode(0xe0 | ((ch >> 12) & 0xF));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));
            byteArray.push(0xe0 | ((ch >> 12) & 0xF));
            byteArray.push(0x80 | ((ch >> 6) & 0x3F));
            byteArray.push(0x80 | (ch & 0x3F));
        } else if ((ch >= 0x10000) && (ch <= 0x1FFFFF)){
            // utf8Str += String.fromCharCode(0xF0 | ((ch >> 18) & 0x7));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));
            byteArray.push(0xF0 | ((ch >> 18) & 0x7));
            byteArray.push(0x80 | ((ch >> 12) & 0x3F));
            byteArray.push(0x80 | ((ch >> 6) & 0x3F));
            byteArray.push(0x80 | (ch & 0x3F));
        } else if ((ch >= 0x200000) && (ch <= 0x3FFFFFF)){
            // utf8Str += String.fromCharCode(0xF8 | ((ch >> 24) & 0x3));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));
            byteArray.push(0xF8 | ((ch >> 24) & 0x3));
            byteArray.push(0x80 | ((ch >> 18) & 0x3F));
            byteArray.push(0x80 | ((ch >> 12) & 0x3F));
            byteArray.push(0x80 | ((ch >> 6) & 0x3F));
            byteArray.push(0x80 | (ch & 0x3F));
        } else if ((ch >= 0x4000000) && (ch <= 0x7FFFFFFF)){
            // utf8Str += String.fromCharCode(0xFC | ((ch >> 30) & 0x1));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 24) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | ((ch >> 6 ) & 0x3F));
            // utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));
            byteArray.push(0xFC | ((ch >> 30) & 0x1));
            byteArray.push(0x80 | ((ch >> 24) & 0x3F));
            byteArray.push(0x80 | ((ch >> 18) & 0x3F));
            byteArray.push(0x80 | ((ch >> 12) & 0x3F));
            byteArray.push(0x80 | ((ch >> 6 ) & 0x3F));
            byteArray.push(0x80 | (ch & 0x3F));
        }
    }
    return new Uint8Array(byteArray);
};



function ByteArray(size)
{
    var arrayBuffer = new ArrayBuffer(size);
    this.bytesPack = new DataView(arrayBuffer);
    this.endian = false;//是否小端
    this.writePos = 0;
    this.readPos = 0;
    this.length_ = 0;
}

ByteArray.prototype =
{
    construct: ByteArray,

    updateSize:function()
    {
        if (this.length_< this.writePos)
        {
            this.length_ = this.writePos;
        }
    },

    length:function()
    {
        return this.length_;
    },

    setWPos:function(pos)
    {
        this.writePos = pos;
    },

    setRPos:function(pos)
    {
        this.readPos = pos;
    },

    readByte:function()
    {
        var value = this.bytesPack.getInt8(this.readPos);
        this.readPos += 1;
        return value;
    },

    readUByte:function()
    {
        return this.readByte() & 0xff;
    },

    readShort:function()
    {
        var v1 = this.readByte();
        var v2 = this.readByte();
        return (v1>>8)|v2;
    },

    readUShort:function()
    {
        var v1 = this.readUByte();
        var v2 = this.readUByte();
        return (v1>>8)|v2;
    },

    readInt:function()
    {
        var v1 = this.readByte();
        var v2 = this.readByte();
        var v3 = this.readByte();
        var v4 = this.readByte();
        return (v1<<0)|(v2<<8)|(v3<<16)|(v4<<24);
    },

    readUInt:function()
    {
        var v1 = this.readUByte();
        var v2 = this.readUByte();
        var v3 = this.readUByte();
        var v4 = this.readUByte();
        return (v1<<0)|(v2<<8)|(v3<<16)|(v4<<24);
    },

    readInt64:function()
    {
        var data = this.readUint();
        return data*UINT_MAX + this.readUint();
    },

    readString:function()
    {
        var size = this.readInt();
        var tempPos = this.readPos;
        var str = '';
        if(size > 0)
        {
            //LOG_DEBUG("读取字符:", size);
            str = binayUtf8ToString(this.readBytes(size), 0);
        }
        return str;
    },

    readBytes:function(size)
    {
        if(size <= 0)
        {
            LOG_WARN("read bytes size is error:", size);
            return null;
        }
        var bytes = new Uint8Array(this.bytesPack.buffer, this.readPos, size);
        this.readPos += size;
        return bytes;
    },

    //write
    writeByte:function(val)
    {
        this.bytesPack.setInt8(this.writePos, val);
        this.writePos += 1;
        this.updateSize();
    },

    writeUByte:function(val)
    {
        this.bytesPack.setUint8(this.writePos, val);
        this.writePos += 1;
        this.updateSize();
    },

    writeShort:function(val)
    {
        this.writeByte(val>>0);
        this.writeByte(val>>8);
    },

    writeInt:function(val)
    {
        this.writeByte(val>>0);
        this.writeByte(val>>8);
        this.writeByte(val>>16);
        this.writeByte(val>>24);
    },

    writeUint:function(val)
    {
        this.writeUByte(val>>0);
        this.writeUByte(val>>8);
        this.writeUByte(val>>16);
        this.writeUByte(val>>24);
    },

    writeInt64:function(val)
    {
        this.writeInt(int(v / UINT_MAX));
        this.writeInt(int(v));
    },

    writeString:function(str)
    {
        var size = str.length;
        if(size > 0)
        {
            var uint8Array = unicodeToUtf8(str);
            //LOG_DEBUG("写入字符:",uint8Array.length);
            this.writeInt(uint8Array.length);//头长度
            for (var i = 0; i < uint8Array.length; i++)
            {
                this.writeByte(uint8Array[i]);
            };
        }else {
            this.writeInt(0);
        }
        this.updateSize();
    },

    writeBytes:function(bytes)
    {
        for (var i = 0; i < bytes.length; i++)
        {
            this.writeByte(bytes[i]);
        };
    },

    getBytes:function()
    {
        return new Uint8Array(this.bytesPack.buffer, 0, this.length());
    }
};

function Packet(size)
{
    ByteArray.apply(this, arguments);
    //
    this.cmd = 0;
    this.msgType = 0;
    this.view_id = 0;
    this.server_id = 0;
    this.version = 0;
    //
    this.markPos = 0;
}

Packet.prototype = new ByteArray();

Packet.prototype.construct = Packet;

Packet.prototype.WriteBegin = function(cmd, msgtype, view_id, server_id, version)
{
    this.markPos = this.writePos;
    this.setWPos(this.markPos + PACKET_HEADER_SIZE);
    this.writeInt(arguments[0]);
    this.writeInt(arguments[1]);
    this.writeInt(arguments[2]);
    this.writeInt(arguments[3]);
    this.writeInt(arguments[4]);
};

Packet.prototype.WriteEnd = function()
{
    var markpos = this.writePos;
    var size = this.writePos - (this.markPos + PACKET_HEADER_SIZE);
    this.setWPos(this.markPos);
    this.writeInt(size);
    this.setWPos(markpos);
};

Packet.prototype.ReadBegin = function()
{
    this.setRPos(0);
    this.cmd = this.readInt();
    this.msgType = this.readInt();
    this.view_id = this.readInt();
    this.server_id = this.readInt();
    this.version = this.readInt();
};

Packet.prototype.ReadEnd = function()
{

};

Packet.prototype.getCmd = function()
{
    return this.cmd;
};

Packet.prototype.getMsgType = function()
{
    return this.msgType;
};

Packet.prototype.getViewId = function()
{
    return this.view_id;
};

Packet.prototype.getServerId = function()
{
    return this.server_id;
};

Packet.prototype.getVersion = function()
{
    return this.version;
};


