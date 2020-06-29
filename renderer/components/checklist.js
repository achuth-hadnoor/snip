import styled from 'styled-components'
import Icon from "react-icons-kit";
import { x,copy } from "react-icons-kit/feather";
import Input from './input'
import uuid from 'uid-promise';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move' 

class Commands extends React.Component {
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
        if (this.state.value) {
            let list = { id: await uuid(10), value: this.state.value, checked: this.state.checked };
            let lists = [...this.state.lists, list];
            this.props.onComplete(lists);
            this.setState({ lists: lists, value: '' })
            return;
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
    onsortEnd = ({ oldIndex, newIndex }) => { 
        let { lists } = this.state;
        lists = arrayMove(lists, oldIndex, newIndex)
        this.setState({lists})
    };
    render() {
        return (
            <ListWrapper>
                <form onSubmit={this.addList}>
                    <Input
                        placeholder="Enter new command"
                        name="value"
                        value={this.state.value}
                        onChange={this.onChange} />
                </form>
                <SortableComponent commands={this.state.lists} onsortEnd={this.onsortEnd} onClick={() => { }} />
            </ListWrapper>
        )
    }
}
export default Commands;

const ListWrapper = styled.div`
    display:flex;
    flex-direction:column;  
    overflow:auto;
    align-items:${props => props.empty ? "center" : 'none'};
    padding-bottom:100px;
`;

const ListItem = styled.div`
    display:flex;
    margin-top:10px;
    border-bottom:1px solid #333;
    align-items:center;
    padding: 0px 10px;
    user-select:none;
    svg{
        display:none
    }
    &:hover svg{
        display: block;
    } 
`;
const Checkbox = styled.span`
    display:inline-block;
    height:20px;
    width:20px;
    border-radius:5px;
    border:1px solid ${props => props.theme.background.ternary};
    margin:10px;
    background:${props => props.checked ? '#6275ff' : 'transparent'};
`;
const ListInput = styled.div`
    flex:1;
    background:inherit;
    border:none;
    color:inherit;
    padding:10px 10px ;
    font-size:.7em; 
    flex-wrap:wrap;
    flex:1;
`;


const SortableComponent = ({ commands, onsortEnd, onClick }) => {
    return (
        <SortableList
            commands={commands}
            onSortEnd={onsortEnd}
            onClick={onClick}
            useDragHandle={true}
        />
    )
}
const SortableList = SortableContainer(({ commands, onClick }) => (
        <div>
            {
               commands.length > 0 ?  commands.map((l, i) => (
                    <SortableItem
                        key={`item-${i}`}
                        index={i}
                        command={l}
                    />
                )) : null
            }
        </div>
    )
)
const SortableItem = SortableElement(({ command }) => (
        <ListItem >
            <DragHandle />
            <ListInput>{command.value}</ListInput>
            <Icon icon={x} style={{ padding: '10px' }} onClick={() => this.onRemove(l.id)} />
        </ListItem>
    )
)
const DragHandle = SortableHandle(() => <svg
    viewBox="0 0 10 10"
    style={{ margi: '0 5', width: '14px', height: '14px',  flexShrink: 0, backfaceVisibility: 'hidden', fill: '#eee', cursor: 'grab' }}>
    <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path></svg>)
