//防抖函数
export function debounce(func,delay){
    let timer = null;
    //var _this =this
    //下面的函数对timer进行引用，timer不会因为是临时变量而被销毁
    //...表示可以传多个参数
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{//这里不使用箭头函数里面的this则指向window
            func.apply(this,args);//使func函数内的this与原本的事件回调函数绑定的this保持一致,也就是debounce的this            
            
        },delay);
    }
}

//时间戳格式化
/*
reg.test()判断是否能匹配到
RegExp是js正则表达式对象
y+获取一个或多个y
*/
export function formatDate(date, fmt) {

    if (/(y+)/.test(fmt)) {
  
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  
    }
  
    let o = {
  
      'M+': date.getMonth() + 1,
  
      'd+': date.getDate(),
  
      'h+': date.getHours(),
  
      'm+': date.getMinutes(),
  
      's+': date.getSeconds()
  
    };
  
    for (let k in o) {
  
      if (new RegExp(`(${k})`).test(fmt)) {
        //window.console.log(new RegExp(`(${k})`));
        //window.console.log(RegExp.$1 );
        //RegExp.$1是当前正则表达式，如果长度为1，直接用字符串进行替换，不为1为使str表示为2位数
        let str = o[k] + '';
        //window.console.log(str);
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
  
      }
  
    }
  
    return fmt;
  
  }
//如果str是一位，在前面补0使其变成2位
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  
  }