import styled from 'styled-components'
import Router from 'next/router'
import { getUser, setSnip, getNote, updateNote, removeNote } from '../services/local-storage'
import Input from '../components/input'
import Project from '../components/p'
import Nav from '../components/nav'
import Checklist from '../components/checklist'
import Icon from 'react-icons-kit';
import { check ,plus} from 'react-icons-kit/feather';
class Snip extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: {
                title: '',
                note: '',
                project: '',
                checklist: [],
            },
            active: 'Notes',
            user: {}
        }
    }
    componentDidMount() {
        const { user } = getUser();
        if (Router.router.query.id) {
            let id = Router.router.query.id;
            getNote(id).then((n) => {
                let _note = {
                    id:id,
                    title: n.title,
                    note: n.note,
                    project: n.project,
                    checklist: n.checklist,
                    user: user
                }
                this.setState({ notes: _note, user: user })
            });
        }
    }
    onChange(e){
        const { name, value } = e.target;
        this.setState({ notes: { ...this.state.notes, [name]: value } });
    }
    render() {
        return (
            <>
                {
                    this.state.notes ? <>
                        <Nav title="Task" snipdel = {()=>{
                            removeNote(this.state.notes.id).then(()=>{Router.push('/')})
                        }}/>
                        <Input
                            title='Title'
                            placeholder="Enter title"
                            onChange={this.onChange}
                            name="title"
                            value={this.state.notes.title} />
                        <Project
                            selProject={this.state.notes.project}
                            projects={this.state.user.projects}
                            onClick={(id) => { this.setState({ notes: { ...this.state.notes, project: id } }) }} />
                        <Tabs>
                            <Tab
                                active={this.state.active === 'Notes' ? true : false}
                                onClick={() => { this.setState({ active: 'Notes' }) }}>
                                Notes
                    </Tab>
                            <Tab
                                active={this.state.active === 'Checklist' ? true : false}
                                onClick={() => { this.setState({ active: 'Checklist' }) }}>
                                Checklist
                    </Tab>
                        </Tabs>
                        {
                            this.state.active === 'Notes' ?
                                <TextArea
                                    placeholder='Jot down some notes... Start typing notes...'
                                    onChange={this.onChange}
                                    name="note"
                                    value={this.state.notes.note} />
                                :
                                <Checklist
                                    lists={this.state.notes.checklist} 
                                    onComplete={(list) => {  
                                        this.setState({ notes: { ...this.state.notes,checklist: list }})  
                                    }} />
                        }
                        <Continuee style={{ cursor: 'pointer' }} 
                            onClick={() => {
                                const { id,title, note, project, checklist } = this.state.notes;  
                                updateNote({id,title, note, project, checklist}).then((user) => { 
                                    this.setState({ user: user });
                                    Router.push('/')
                                }).catch(e => {
                                    alert(e)
                                });
                            }}>
                        <Icon icon={check} /></Continuee></> : <div>loading....</div>
                }
            </>
        )
    }
}

export default Snip;

const TextArea = styled.input`
    background:${props => props.theme.background.primary};
    color:${props => props.theme.color.primary};
    max-height:400px;
    height:100%;
    max-width:400px;
    width:100%;
    outline:none;
    border:none;
    padding:10px;
`
const Tabs = styled.ul`
        list-style:none;
        display:flex; 
        margin:0;
        padding:0;
        user-select:none;
        font-size:14px;
`

const Tab = styled.button`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center; 
        padding:5px;
        text-align:center;
        padding:5px 15px;
        cursor:pointer; 
        &::after {
            content: '';
            display: block;
            width: ${props => props.active ? '50%' : '0'};
            height: 2px;
            margin-top:5px;
            background:${props => props.theme.background.accent};
            transition: width .3s;
        }
    &:hover::after {
        width: 30%;
        transition: width .3s;
    } 
`
const Continuee = styled.button`
        padding:10px 15px;;
        background:${props => props.theme.background.accent};
        position:fixed;
        bottom:0;
        right:0;
        color:#121212;
        border-radius:25px;
        margin:10px;
    
`