import styled from 'styled-components'
import Router from 'next/router'
import Input from '../components/input'
import Project from '../components/p'
import Nav from '../components/nav'
import Checklist from '../components/checklist'
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather';
import { check } from 'react-icons-kit/feather';
import { getUser, setNote } from '../services/local-storage'
class New extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            note: '',
            project: 'untitled',
            checklist: [],
            active: 'Notes',
            user: {}
        }
    }
    componentDidMount() {
        const { user } = getUser();
        const _projects = user.projects;
        this.setState({ user: user })

    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <>
                <Nav title={'New'} />
                <Input
                    title='Title'
                    placeholder="Enter title"
                    onChange={this.onChange}
                    name="title"
                    value={this.state.title} />
                <Project
                    selProject = {this.state.project}
                    projects={this.state.user ? this.state.user.projects : [{ id:"untitled",title: 'untitled', hex: '#6275ff' }]}
                    onClick={(id) => {  
                        this.setState({ project: id }) 
                        }} />
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
                            value={this.state.note} />
                        :
                        <Checklist
                            lists={this.state.checklist}
                            onComplete={(list) => { this.setState({ checklist: list }) }} />
                }
                <Continuee style={{ cursor: 'pointer' }} onClick={() => {
                    const { title, note, project, checklist } = this.state;
                    let Note = {
                        title: title,
                        project: project,
                        note: note,
                        checklist: checklist
                    }
                    setNote(Note).then((user) => {
                        this.setState({ user: user });
                        Router.push('/')
                    }).catch(e=>{
                        alert(e)
                    });

                }}><Icon icon={check} /> Done </Continuee>
            </>
        )
    }
}

export default New;

const TextArea = styled.textarea`
    background:${props => props.theme.background.primary};
    color:${props => props.theme.color.primary};
    max-height:400px;
    height:100%;
    max-width:400px;
    width:100%;
    outline:none;
    border:none;
    padding:10px;
`;
const Tabs = styled.ul`
        list-style:none;
        display:flex; 
        margin:0;
        padding:0;
        user-select:none;
        font-size:14px;
        max-width:400px;
`;

const Continuee = styled.button`
        padding:10px 15px;;
        background:${props => props.theme.background.accent};
        position:fixed;
        bottom:0;
        right:0;
        color:#121212;
        border-radius:25px;
        margin:10px;
`;
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
        };
    &:hover::after {
        width: 30%;
        transition: width .3s;
    }
`;