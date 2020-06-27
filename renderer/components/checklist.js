import { useState } from 'react'
import styled from 'styled-components'
import Icon from "react-icons-kit";
import { x } from "react-icons-kit/feather";
import Input from './input'
import uuid from 'uid-promise';

class CheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: props.lists || [],
            value: '',
            checked: false,
            listValue: '',
        }
    }
    componentDidMount() {
        this.setState({ lists: this.props.lists })
    }
    addList = async (e) => {
        e.preventDefault();
        if(this.state.value){
            let list = { id: await uuid(10), value: this.state.value, checked: this.state.checked };
            let lists = [...this.state.lists, list];
            this.props.onComplete(lists);
            this.setState({ lists: lists, value: '' })
            return ;
        }
        alert("Enter list item ");
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    onCheck = (id) => {
        let { lists } = this.state;
        let newLists = lists.map((l, i) => {
            if (l.id === id) {
                l.completed = !l.completed; 
                return l;
            }
            else { 
                return l;
            }
        });
        return this.setState({ lists: newLists }); 
    }
    onRemove = (id) => { 
        let { lists } = this.state;
        let newLists = lists.filter((l, i) => {
            if (l.id != id) { 
                return l;
            } 
        });  
        this.setState({ lists: newLists }); 
        return this.props.onComplete(newLists);
    }
    render() {
        return (
            <ListWrapper>
                <form onSubmit={this.addList}>
                    <Input title="List"
                        placeholder="Enter new List item"
                        name="value"
                        value={this.state.value}
                        onChange={this.onChange} />
                </form>
                {
                    this.state.lists ? this.state.lists.map((l, i) => <ListItem key={i}>
                        <Checkbox
                            name="checked"
                            checked={l.completed}
                            onClick={() => this.onCheck(l.id)}
                        />
                        <ListInput>{l.value}</ListInput>
                        <Icon icon={x} style={{ padding: '10px' }} onClick={()=>this.onRemove(l.id)}/>
                    </ListItem>
                    )
                        :
                        <ListWrapper empty={true}>
                            No items here
                        </ListWrapper>
                }

            </ListWrapper>
        )
    }
}
export default CheckList;
const ListWrapper = styled.div`
display:flex;
flex-direction:column;
max-height:500px;
height:100%;
overflow:scroll;
align-items:${props=>props.empty ? "center":'none'}
`;
const ListItem = styled.div`
display:flex;
margin-top:10px;

`;

const Checkbox = styled.span`
    display:inline-block;
    height:20px;
    width:20px;
    border-radius:5px;
    border:1px solid ${props => props.theme.background.ternary};
    margin:10px;
    background:${props => props.checked ? '#6275ff' : 'transparent'}
`;
const ListInput = styled.div`
flex:1;
background:inherit;
border:none;
color:inherit;
padding:10px 10px ;
font-size:.7em; 
`;
