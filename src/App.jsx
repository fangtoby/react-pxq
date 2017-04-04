//载入基础的react 只负责ui渲染
import React, {Component, PropTypes} from 'react';
//载入react dom渲染模块
import ReactDOM, {render} from 'react-dom';
//管理数据
import {Provider} from 'react-redux';
//管理路由
import route from './Router/Route'; //路由配置
//公共status，集中更新
import store from './Redux/Store/Store';
// 引用配置
// 重制手机端点击事件
// 获取根地址 localhost/http://www.server.cn
// 获取系统类型 ios/Android
import './Config/Config.js';//引入默认配置
//样式
import './Style/common.scss';
import './Style/head.scss';
import './Style/index.scss';
import './Style/chooseProducts.scss';
import './Style/helpCenter.less';
import './Style/saleRecord.less';
import './Style/allDeposit.less';
import './Style/applyDeposit.less';
import './Style/applyRecord.less';
import './Style/notebook.less';
//es6 新定义函数方法
// let letgo = () => {
// 	console.log("let go !!!!")
// }

// letgo();

store.subscribe(() => { //监听state变化
    console.log(store.getState())
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

