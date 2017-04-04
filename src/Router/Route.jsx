import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import notebook from '../Component/notebook';

// import index from '../Component/index'; //销售录入

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const gotoIndex = (location, cb) => {
    require.ensure([],require => {
        cb(null, require('../Component/index'))
    },'gotoIndex')
}
//使用require.ensure按需加载
//提高性能
const chooseProducts = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/chooseProducts').default)
    },'chooseProducts')
}
//帮助中心
const helpCenter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/helpCenter').default)
    },'helpCenter')
}
//销售记录
const saleRecord = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/saleRecord').default)
    },'saleRecord')
}
//可提现金额
const allDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/allDeposit').default)
    },'allDeposit')
}
//提现记录
const applyRecord = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/applyRecord').default)
    },'applyRecord')
}
//提现
const applyDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/applyDeposit').default)
    },'applyDeposit')
}
//配置路由xml
//定义首页加载项目
//定义Link链接对应的组建加载地址
const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={notebook} />//首页
            <Route path="notebook" component={notebook} />
            <Route path="gotoIndex" getComponent={gotoIndex} />
            <Route path="helpCenter" getComponent={helpCenter} />//帮助中心
            <Route path="saleRecord" getComponent={saleRecord} />//销售记录
            <Route path="chooseProducts" getComponent={chooseProducts} />//选择商品
            <Route path="allDeposit" getComponent={allDeposit} />//余额
            <Route path="applyDeposit" getComponent={applyDeposit} />//申请提现
            <Route path="applyRecord" getComponent={applyRecord} /> //提现记录
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);

export default RouteConfig;