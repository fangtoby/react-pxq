import React,{Component, Proptypes} from 'react';
import {History, Link} from 'react-router';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template} from './common/mixin';

class SubmitText extends Component{
	constructor(){
		super();
		this.state = {
			contentText: 'helloworld'
		}
		this.changeValue = (type, event) =>{
			if (type == 'contentText') {
				let contentTextValue = event.target.value;
				this.setState({
                    contentText: contentTextValue
                })
			}
		}
		this.submit = (e) => {
			Tool.alert('save...');
			if(this.state.contentText == ''){
				Tool.alert("Message Text Can't be null");
				return;
			}
			this.props.addTodo(this.state.contentText)
			this.state.contentText = ''
			this._inputElement.value = ''
			e.preventDefault()
		}
	}
	componentWillMount(){

	}
	componentDidMount(){

	}
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	componentWillUpdate(){

	}
	render(){
		return (
			<div className="component_submit_textbox">
				<input type="text" value={this.state.contentText} ref={(a) => this._inputElement = a} placeholder='Please input your todos' onChange={this.changeValue.bind(this,'contentText')} />
				<div className='submit' onClick={this.submit}>
                    Saved
                </div>
			</div>
		)
	}
	componentWillUnmount(){

	}
}

class Todolist extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	render(){
			let {notoOpo} = this.props;
		return (
			<ul className="component_todo_list">
				{
                    notoOpo.get('notebooklist').map((item, index) => {
                        return <TodoListItem key={index} id={item.key} text={item.text} {...item} {...this.props} index={index}/>
                    })
                }
			</ul>
		)
	}
}
class TodoListItem extends Component{
	constructor(){
		super();
	}
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	render(){
        let {id,text,delteTodo} = this.props;
		return (
			<li>
			{text}<a href="javascript:void(0);" className="list_delete"  onClick={() => delteTodo(id,text)} ></a>
			</li>
		)
	}
}

class Main extends Component{
	constructor(){
		super();
		this.addTodo = (text) => {
			var itemArray = [];
			if(this.props.notoOpo.get('notebooklist')){
				itemArray = this.props.notoOpo.get('notebooklist'); 
			}
			//新建项
			itemArray.push( { 
				text: text, 
				key: Date.now(),
				status: 0
			} ); 
			this.props.saveNotebookDate('',{
				notebooklist: itemArray
			})
			//修改项
			// this.props.updateNotebookData('',{
			// 	notebooklist: itemArray,
			// 	update:{
			// 		key: 1,
			// 		text: text
			// 	}
			// })
		}
		this.delteTodo = (key,text) => {
			this.props.deleteNotebookData('',{
				deletekey:key,
				todos: this.props.notoOpo.get('notebooklist')
			});
			return false;
		}
	}
	componentWillMount(){

	}
	componentDidMount(){

	}
	render(){
			let {notoOpo} = this.props;
		return (
			<div className="component_container component_notebook">
                <Header nav saleRecord title='销售录入'/>
                <div style={{marginTop:'2.2rem'}} ></div>
				<SubmitText addTodo={this.addTodo} {...this.props} />
				{
                   notoOpo.get('notebooklist') && notoOpo.get('notebooklist').length > 0 ? <Todolist delteTodo={this.delteTodo} {...this.props} /> : null
                }
			</div>
		)
	}
	componentWillUnmount(){

	}
}

export default template({
	id: 'notebook',
	component: Main,
	url:''
});