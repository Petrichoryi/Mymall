import axios from 'axios'

//方式1
// export function request(config,success,failure){
// //创建axios的实例
// const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
// })
// //发送网络请求并进行回调
// instance(config).then(res=>success(res)).catch(err=>failure(err))
// }

//方式2
// export function request(config){
//     //创建axios的实例
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout:5000
//     })
//     //发送网络请求并进行回调
//     instance(config.baseConfig).then(res=>config.success(res)).catch(err=>config.failure(err))
// }

//方式3，promise方式
// export function request(config){
//     return new Promise((resolve,reject)=>{
//         //创建axios的实例
//         const instance = axios.create({
//             baseURL:'http://123.207.32.32:8000',
//             timeout:5000
//         })

//     //发送网络请求并进行回调
//     instance(config).then(res=>{
//         resolve(res);
//     }).catch(err=>{
//         reject(err);
//     })
// })
// }

//方式4
export function request(config){
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })
    //axios拦截器
    //请求拦截
    // instance.interceptors.request.use(config=>{
    //     console.log(config);
    //     return config;
    // },err=>{
    //     console.log(err);
    // })
    //响应拦截
    // instance.interceptors.response.use(res=>{
    //     console.log(res);
    // },err=>{
    //     console.log(err);
    // })
    return instance(config);//axios的实例返回值继承了Promise，因此返回的是一个promise
}