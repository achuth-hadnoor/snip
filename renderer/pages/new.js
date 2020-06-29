import styled from 'styled-components'
import Router from 'next/router'
import Input from '../components/input'
import Project from '../components/p'
import Nav from '../components/nav'
import Commands from '../components/checklist'
import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/feather';
import { getUser, setSnip } from '../services/local-storage'
class New extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            snip: '',
            project: 'untitled',
            Commands: [],
            active: 'Commands',
            user: {}
        }
    }
    componentDidMount() {
        const { user } = getUser();
        const _projects = user.projects;
        this.setState({ user: user })

    }
    onChange = (e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div style={{flex:1}}>
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
                        active={this.state.active === 'Commands' ? true : false}
                        onClick={() => { this.setState({ active: 'Commands' }) }}>
                        Commands
                    </Tab>
                    <Tab
                        active={this.state.active === 'snips' ? true : false}
                        onClick={() => { this.setState({ active: 'snips' }) }}>
                        Description
                    </Tab>
                </Tabs>
                {
                    this.state.active === 'snips' ?
                        <TextArea
                            placeholder='Descripbe your snippet'
                            onChange={this.onChange}
                            name="snip"
                            value={this.state.snip} />
                        :
                        <Commands
                            lists={this.state.Commands}
                            onComplete={(list) => { this.setState({ Commands: list }) }} />
                }
                <Continuee style={{ cursor: 'pointer' }} onClick={() => {
                    const { title, snip, project, Commands } = this.state;
                    let _snip = {
                        title: title,
                        project: project,
                        snip: snip,
                        Commands: Commands
                    }
                    setSnip(_snip).then((user) => {
                        this.setState({ user: user });
                        Router.push('/')
                    }).catch(e=>{
                        alert(e)
                    });
                }}><Icon icon={check} /> Done </Continuee>
            </div>
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