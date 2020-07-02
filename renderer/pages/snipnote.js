import styled from 'styled-components'
import Router from 'next/router'
import { getUser, setSnip, getSnip, updateSnip, removeSnip } from '../services/local-storage'
import Input from '../components/input'
import Project from '../components/p'
import Nav from '../components/nav'
import Commands from '../components/checklist'
import Icon from 'react-icons-kit';
import { check, plus } from 'react-icons-kit/feather';
import notify from '../services/notify'
class Snip extends React.Component {
    constructor() {
        super();
        this.state = {
            snip: {
                title: '',
                snip: '',
                project: '',
                commands: [],
            },
            active: 'Notes',
            user: {}
        }
    }
    componentDidMount() {
        const { user } = getUser();
        if (Router.router.query.id) {
            let id = Router.router.query.id;
            getSnip(id).then((n) => {
                let _note = {
                    id: id,
                    title: n.title,
                    snip: n.snip,
                    project: n.project,
                    commands: n.commands,
                    user: user
                }
                this.setState({ snip: _note, user: user })
            });
        }
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ snip: { ...this.state.snip, [name]: value } });
    }
    render() {
        return (
            <div style={{ flex: 1 }}>
                {
                    this.state.snip ? <>
                        <Nav title="Commandly" snipdel={() => {
                            removeSnip(this.state.snip.id).then(() => { Router.push('/') })
                        }} />
                        <Input
                            title='Title'
                            placeholder="Enter title"
                            onChange={this.onChange}
                            name="title"
                            value={this.state.snip.title} />
                        <Project
                            selProject={this.state.snip.project}
                            projects={this.state.user.projects}
                            onClick={(id) => { this.setState({ snip: { ...this.state.snip, project: id } }) }} />
                        <Tabs>
                            <Tab
                                active={this.state.active === 'commands' ? true : false}
                                onClick={() => { this.setState({ active: 'commands' }) }}>
                                commands
                    </Tab>
                            <Tab
                                active={this.state.active === 'Notes' ? true : false}
                                onClick={() => { this.setState({ active: 'Notes' }) }}>
                                Desccription
                    </Tab>
                        </Tabs>

                        {
                            this.state.active === 'Notes' ?
                                <TextArea
                                    placeholder='Enter few commands'
                                    onChange={this.onChange}
                                    name="snip"
                                    required
                                    value={this.state.snip.snip} />
                                :
                                <Commands
                                    lists={this.state.snip.commands}
                                    onComplete={(list) => {
                                        this.setState({ snip: { ...this.state.snip, commands: list } })
                                    }} />
                        }
                        <Continuee style={{ cursor: 'pointer' }}
                            onClick={() => {
                                const { id, title, snip, project, commands } = this.state.snip; 
                                    if(!title || title === ' '){
                                        return notify({
                                            title: 'Error!',
                                            body: 'title is required'
                                        }) 
                                    }
                                updateSnip({ id, title, snip, project, commands }).then((user) => {
                                    this.setState({ user: user });
                                    Router.push('/')
                                }).catch(e => {
                                    notify({
                                        title: 'Error!',
                                        body: e
                                    })
                                });
                            }}>
                            <Icon icon={check} /></Continuee></> : <div>loading....</div>
                }
            </div>
        )
    }
}

export default Snip;

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