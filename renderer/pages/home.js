import React from 'react'
import Router, { withRouter } from 'next/router'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { check, x, plus } from 'react-icons-kit/feather';
import { getUser, setproject, removeProject, getSnip, updateSnip, updateUser } from '../services/local-storage';
import Nav from '../components/nav'
import Input from './../components/input'
// import Tasks from './../components/Home/tasks'
import Navigation from '../components/Home/navigation'
import { colors } from './../layouts/themecontext'
import SortableComponent from '../components/Home/sortable/sortable-component';
import { arrayMove } from 'react-sortable-hoc';
import Link from 'next/link';
import notify from '../services/notify';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            project: {
                id: '',
                title: '',
                hex: '',
            },
            search: '',
            user: {},
            projects: [],
            theme: false,
            active: false,
            activeTab: 'Snips',
            colors: colors,
            search_notes: []
        }
        this.addProject = this.addProject.bind(this);
    }
    componentDidMount() {
        const { user } = getUser();
        const tabSelected = Router.router.query.tab;
        this.setState({ user: user, projects: user.projects, activeTab: tabSelected });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.router.query.tab !== this.state.activeTab) {
            const { user } = getUser();
            this.setState({ activeTab: nextProps.router.query.tab, user: user });
        }
    }

    addProject = async () => {
        if (this.state.project.title) {
            return setproject(this.state.project).then(async (user) => {
                const projects = [...this.state.projects, this.state.project];
                const _project = {
                    title: '',
                    hex: ''
                }
                this.setState({ projects: projects, user: user, project: _project })
            }).catch((e) => { alert(e) })
        }
        else {
            // alert("Enter project Title");

            notify({
                title: 'Error!',
                body: 'Enter project Title'
            })
        }
    }

    removeProject = (id) => {
        let l = confirm("Do u wish to delete all the tasks under the project?");
        if (l) {
            removeProject(id, l).then((user) => {
                this.setState({ projects: user.projects })
            })

            const projects = this.state.projects.filter((p) => p.id !== id);
            this.setState({ projetcs: projects })
        }
    }
    onchange = (e) => {
        var project = this.state.project;
        project.title = e.target.value;
        this.setState({ project: project })
    }
    onSearchChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
        if (name === 'search') {
            this.filteredList(value);
        }
        // this.state.searchtaskList = 
    }

    filteredList = (value) => {
        if (!value) {
            // this.setState({ search_notes: this.state.user.notes });
            return;
        }
        const _notes = this.state.user.snips.length > 0 && this.state.user.snips.filter(note => {
            if (note.title.toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
            if (note.snip.toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
            if (note.commands && note.commands.length > 0) {
                const _lists = note.commands.filter((s) => {
                    if (s.value.toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                })
                if (_lists.length > 0) {
                    return note
                }
            }
        })
        this.setState({ search_notes: _notes })
    }
    onMove = (type, note) => {
        const { user } = getUser();
        const noteUpdated = user.snips.map(t => {
            if (t.id === note.id) {
                return t;
            }
            return t;
        });
        user.snips = noteUpdated;
        updateUser(user);
        return this.setState({ user });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        const userObj = getUser();
        const { user } = this.state;
        const snips = user.snips;
        const reordered = arrayMove(snips, oldIndex, newIndex);
        userObj.user.snips = reordered;
        updateUser(userObj.user);
        return this.setState({ user: userObj.user });
    }
    render() {
        let content;
        const { activeTab, user } = this.state;
        const tasks = user.snips || [];
        const tabList = [
            { name: 'Snips', href: "/home?tab=Snips" },
            { name: 'Projects', href: "/home?tab=Projects" }
        ]
        switch (activeTab) {
            case 'Snips':
                content = tasks.length === 0 ?
                    <div style={{ alignItems: 'center', justifyContent: 'center', flex: 1, display: 'flex', maxWidth: '400px' }}>Yass!! All Caught up .🙌</div>
                    :
                    <SortableComponent title="Snips" notes={tasks} onMove={this.onMove} onSortEnd={this.onSortEnd} onDone={(i) => {
                        getsnip(i).then(({ id, title, note, project, commands, completed }) => {
                            if (id === i) {
                                updateSnip({ id, title, note, project, commands, completed }).then((user) => {
                                    this.setState({ user: user });
                                })
                            }
                        })
                    }} />
                break;
            case 'Projects':
                content = (
                    <>
                        <Input title="Project Title" placeholder="Enter Title here" onChange={this.onchange} value={this.state.project.title} />
                        <ColorPick colors={this.state.colors} onPick={(color) => {
                            // alert(color.hex)
                            var _pro = this.state.project;
                            _pro.hex = color.hex;
                            this.setState({ project: _pro })
                        }} project={this.state.project} />
                        <Continuee style={{ cursor: 'pointer' }} onClick={this.addProject}><Icon icon={check} /><span>Add Project</span></Continuee>
                        <div>
                            <Title>Projects</Title>
                            <Plist>
                                {
                                    this.state.projects.map((p, i) => <React.Fragment key={p + i}>
                                        <li>
                                            <span style={{ background: p.hex, height: '15px', width: '15px', margin: '10px', borderRadius: '2px' }}></span>
                                            <Title>{p.title}</Title>
                                            {p.title !== 'untitled' ? <Icon icon={x} onClick={() => this.removeProject(p.id)} /> : null}
                                        </li>
                                    </React.Fragment>)
                                }
                            </Plist>
                        </div>
                    </>
                )
                break;
        }
        return (
            <>
                <Nav mode={user.theme === 'dark'} />
                <Navigation list={tabList} tabSelected={this.state.activeTab} />

                <TaskWrapper>
                    {this.state.activeTab !== 'Projects' ?
                        <Input
                            search="true"
                            placeholder="Search for notes"
                            type="search"
                            name="search"
                            onChange={this.onSearchChange}
                            value={this.state.search}
                        />
                        // null
                        : null}
                    {this.state.search == '' ? content :
                        <SortableComponent title="Search Results" notes={this.state.search_notes} onSortEnd={this.onSortEnd} onDone={(i) => {
                            getsnip(i).then(({ id, title, note, project, commands, completed }) => {
                                if (id === i) {
                                    completed = false;
                                    updateSnip({ id, title, note, project, commands, completed }).then((user) => {
                                        this.setState({ user: user });
                                    })
                                }
                            })
                        }} />
                    }
                </TaskWrapper>

                {
                    this.state.activeTab === 'Snips' ?
                        <Link href="/new">
                            <button
                                style={{
                                    cursor: 'pointer',
                                    position: 'fixed',
                                    bottom: "2%", zIndex: 999, padding: "10px", borderRadius: 50, background: 'palegreen', color: '#121212', right: '5%'
                                }}
                            >
                                <Icon icon={plus} />
                            </button>
                        </Link>
                        : null}
            </>
        )
    }
}
export default withRouter(Home)

const TaskWrapper = styled.div`
    display:flex;
    flex-direction :column;
    flex:1; 
    font-size:14px; 
    max-width:400px;
    padding-bottom:70px;
`
const Footer = styled.footer`
    position:fixed;
    font-size:16px;
    display: block;
    margin-bottom: 10px;
    bottom: 0;
    text-align: right;
    max-width: 400px;
    width: 100%; 
    button{
        padding:10px;
        background:${props => props.theme.background.accent};
        bottom:0;
        right:0;
        color:#121212;
        border-radius:25px;
        margin:10px;
    } 
 
`
// Projects

const ColorPick = ({ colors, onPick, project }) => {
    return (
        <ColorWrap>
            <Title>Pick a color</Title>
            <Clist>
                {
                    colors.map((c, i) => {
                        return <CItem key={`t_1` + i} title={c.name} onClick={() => {
                            onPick(c);
                        }}
                            hex={c.hex} sel={project.hex === c.hex ? false : true} />
                    }
                    )
                }
            </Clist>
        </ColorWrap>
    )
}

const Plist = styled.ul`
    list-style:none;
    display:flex;
    padding:5px 0px;
    max-width:400px;
    width:100%;
    flex-wrap:wrap;  
    flex:1;
    li{
        display:flex;
        flex:1; 
        margin:5px;
        user-select:none;
        border-radius:5px;
        align-items : center;
        background:${props => props.theme.background.secondary};
        i{
            padding:5px;
        }
    }
`
const Continuee = styled.button`
        padding:10px;
        background:${props => props.theme.background.accent};
        color:#121212;
        border-radius:10px;
        margin:10px;
        text-align:center;
        z-index:999;
        span{
            padding-left:10px;
        } 

`;
const Title = styled.div`
    color:${props => props.theme.color.ternary};
    font-size: 14px;
    padding:5px 10px;
    flex:1;
`;
const ColorWrap = styled.div`
    display:flex;
    flex-direction:column;    
`;
const Clist = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;

`;
const CItem = styled.div`
    display:block;
    height:25px;
    width:25px;
    margin:5px;
    border-radius:5px;
    background:${props => props.hex};
    border:2px solid ${props => props.sel ? props.theme.background.primary : ''}
`