/**
 * Created by MikeRiy on 17/1/3.
 */

function handler(obj, method)
{
    return function()
    {
        return method.apply(obj, arguments);
    }
}

var appNotice = (function()
{
    var noticMap = {}
    var obj = {};
    obj.add = function(type, method)
    {
        if(!noticMap[type])
        {
            noticMap[type] = [];
        }
        noticMap[type].push(method);
    };

    obj.del = function(type, method)
    {
        var list = noticMap[type];
        if(list) {
            for (var i = 0; i  < list.length; i++)
            {
                if (list[i] == method)
                {
                    list.splice(i, 1);
                    break;
                }
            }
            //无消息删除
            if(list.length == 0) delete noticMap[type];
        }
    };

    obj.send = function(type, data)
    {
        var list = noticMap[type];
        if(list)
        {
            var m_list = [];
            for (var i = 0; i < list.length; i++)
            {
                m_list.push(list[i]);
            }
            //执行
            for (var i = 0; i < m_list.length; i++)
            {
                m_list[i](data);
            }
        }
    };

    //getNotices OnEventHandler必不可少的方法
    obj.bind = function(target)
    {
        var list = target.getNotices();
        if(list)
        {
            for (var i = list.length - 1; i >= 0; i--)
            {
                obj.add(list[i], target.OnEventHandler);
            }
        }
    }

    obj.unbind = function(target)
    {
        var list = target.getNotices();
        if(list)
        {
            for (var i = list.length - 1; i >= 0; i--)
            {
                obj.del(list[i], target.OnEventHandler);
            }
        }
    }

    return obj;
}());