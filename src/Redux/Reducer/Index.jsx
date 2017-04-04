//要想提高性能，需要按需加载
import Immutable from 'immutable'
import {SET_STATE, REQUEST_POSTS, RECEIVE_POSTS} from '../Action/Index'
import {RECORD_STATE, SAVE_PRODUCT_LIST, NEW_PRODUCT_DATA} from '../Action/Index'
import {DELETE_ITEM} from '../Action/Index'
import {GET_DATA_START , GET_DATA_SUCCESS, TEST_DISPATCH} from '../Action/Index'
import {SAVE_NOTEBOOK_DATA, UPDATE_NOTEBOOK_DATA,DELTETE_NOTEBOOK_DATA} from '../Action/Index'


//const initialState = Immutable.fromJS({}) //=Immutable.Map({})

const defaultlState = Immutable.fromJS({
    // data: {},
    // notebooklist:[], 
    // isFetching: false
})

// console.log(defaultlState)
export const notoOpo = (state = defaultlState, action = {}) => {
    switch(action.type){
        case SAVE_NOTEBOOK_DATA:
            return state.set("notebooklist",[...action.data.notebooklist])
        case UPDATE_NOTEBOOK_DATA:
            let notebooklist = action.data.notebooklist;
            notebooklist.map((_item) => {
                if(_item.key === action.data.update.key){
                    _item.text = action.data.update.text;
                }else{
                    return _item;
                }
            });
            return state.set("notebooklist",[...notebooklist])
        case DELTETE_NOTEBOOK_DATA:
            let newArr = action.data.todos;
            var arr = newArr.filter( (_item) => {
                return _item.key !== action.data.deletekey
            })
            return state.set("notebooklist",[...arr])
        default:
            return state;
    }
}
//首次渲染时获取数据
export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_POSTS:
            return state.set('isFetching',true);
        case RECEIVE_POSTS:
            return Immutable.Map({'data':action.json,'isFetching':false});//返回一个新的state
        default:
            return state
    }
}

//手动获取数据
export const requestData = (state = {}, action = {}) => {
    //console.log(4)
    switch(action.type){
        case GET_DATA_START:
            return state;
        case GET_DATA_SUCCESS:
            action.success(action.json);
            state[action.name] = action.json;
            return state;
        default:
            return state;
    }
}

export const testData = (state = {}, action = {}) => {
    //console.log(3)
    switch(action.type){
        case TEST_DISPATCH:
            return Object.assign({},state,action);
        default:
            return state;
    }
}

//记录商品列表页数据状态
export const producRecord = (state = {}, action = {}) => {
    //console.log(1)
    switch(action.type){
        case RECORD_STATE:
            return Object.assign({},state,action);
        case SAVE_PRODUCT_LIST:
            state['productList'] = [...action.productList];
            return state;       //记录商品列表数据，但是不触发组件更新
        case NEW_PRODUCT_DATA:
            state['productData'] = [...action.productData];
            return state;
        default:
            return state 
    }
}

//销售记录页面数据
export const saleRecord = (state = Immutable.fromJS({}) , action = {}) => {
    //console.log(2)
    switch(action.type){
        case DELETE_ITEM:
            return Immutable.Map({index:action.index})
        default:
            return state;
    }
}


