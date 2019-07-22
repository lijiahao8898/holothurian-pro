// 字典转换
const getColumnStatus = (
    status,                 // 页面当前的状态值
    item = [],              // 字典
    keyName = 'label',      // 获取字典显示的名称
    keyValue = 'value'      // 字典的值和页面当前的值相同时返回 `label`
) => {
    if (status || status === 0 || status === false) {
        status = (status).toString();

        for (let i = 0, length = item.length; i < length; i += 1) {
            const value = item[i][keyValue];
            const name = item[i][keyName];

            if (value.toString() === status) {
                return name;
            } else if (status === 'true' || status === 'false') {
                if (value.toString() === status) {
                    return name;
                }
            }
        }
    }
    return '-';
};

// 精度加法
const accAdd = (num1, num2) => {
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // return (num1*m+num2*m)/m;
    return Math.round(num1 * m + num2 * m) / m;
};

// 精度乘法
const accMul = (arg1, arg2) => {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        if (s1.indexOf('.') !== -1) {
            m += s1.split('.')[1].length;
        }
    } catch (e) {
        console.log(e);
    }
    try {
        if (s2.indexOf('.') !== -1) {
            m += s2.split('.')[1].length;
        }
    } catch (e) {
        console.log(e);
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

const accDiv = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    if(arg1 && arg2) {
        if(arg1.toString().split('.')[1]) {
            t1 = arg1.toString().split('.')[1].length;
        }
        if(arg2.toString().split('.')[1]) {
            t2 = arg2.toString().split('.')[1].length;
        }

        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
    return 0
};

/**
 * 金额显示
 * @param data
 * @param num
 * @returns {*}
 */
const toThousands = (data, num) => {
    var test = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g;
    if (data || data === 0) {
        if (typeof data === 'string' && data.length > 14) {
            // 字符串位数超长
            if (!num) {
                return data.replace(test, '$&,');
            } else {
                const n = data.replace(test, '$&,');
                var numArr = n.split('.');
                var decimal = (Number(numArr[1]) / 100).toFixed(num).toString(); // 0.56
                return numArr[0] + decimal.substring(decimal.indexOf('.'), decimal.length);
            }
        }
        if (!num) {
            var yuan = Number(data);
            var fixed0 = yuan.toFixed(0);
            var fixed1 = yuan.toFixed(1);
            var fixed2 = yuan.toFixed(2);

            if (Number(fixed0) === Number(fixed1) && Number(fixed1) === Number(fixed2)) {
                // 服务端数据感觉有问题会返回-0.003 => -0
                if(Number(fixed0) === 0) {
                    return Math.abs(fixed0.replace(test, '$&,'));
                } else {
                    return fixed0.replace(test, '$&,');
                }
            } else if (Number(fixed0) !== Number(fixed1) && Number(fixed1) === Number(fixed2)) {
                return fixed1.replace(test, '$&,');
            } else {
                return fixed2.replace(test, '$&,');
            }
        } else {
            return (parseFloat(data).toFixed(num) + '').replace(test, '$&,');
        }
    } else {
        return '-';
    }
};

const format = (time, format) => {
    let date = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S+': time.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
};

// 获取某个数组中，某个key对应的value的合
const getSomethingTotal = (
    key,
    list
) => {
    let value = 0;
    list.forEach(item => {
        if (item[key]) {
            value = accAdd(value, item[key]);
        }
    });
    return value;
};

export {
    getColumnStatus,
    getSomethingTotal,
    accAdd,
    accMul,
    accDiv,
    toThousands,
    format
}
