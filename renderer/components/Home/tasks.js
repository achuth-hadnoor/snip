import styled from 'styled-components'
import Link from 'next/link';
import Draggable from './sortable/drag-handle'
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';
import { copy } from 'react-icons-kit/feather';
import { clipboard } from 'electron';

export default ({ note, onDone, project, commands }) => {
    const [open, setopen] = React.useState(false)
    return <Task color={project.hex} open={open}>
        <div style={{ display: 'flex' }}>
            {commands.length > 0 && <Icon icon={chevronDown} onClick={() => {
                setopen(!open)
            }} />}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Link href={`/snipnote?id=` + note.id}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span style={{ fontSize: '14px', padding: '5px 10px' }}>{note.title}</span>
                        {note.snip.length > 0 && <span style={{ fontSize: '12px', padding: '5px 10px' }} >{note.snip.substr(0, 50)}{note.snip.length > 50 && '...'}</span>}
                    </div>
                </Link>
            </div>
            <Project title={project.title} color={project.hex} />
            {
                !open && <Draggable />
            }


        </div>
        {
            open ? (
                <ul style={{ padding: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column' }}>
                    {
                        commands.length > 0 &&
                        commands.map((command, i) => (
                            <li style={{ padding: '10px 5px', fontSize: '12px', display: 'flex' }}
                                key={`item` + i}
                                index={i}
                                onClick={() => { clipboard.writeText(command.value, 'selection') }}>
                                <span style={{ flex: 1 }}> {command.value}</span>
                                <Icon icon={copy} className="copy" />
                            </li>))
                    }
                </ul>
            ) : null
        }
    </Task>
};

const Task = styled.div` 
    padding:5px;
    margin-top:5px;  
    color:${props => props.theme.color.primary}; 
    background:${props => props.open ? props.theme.background.secondary : 'transparent'};
    user-select:none;
    border-bottom:1px solid #121212;
    
    &:hover{
        background:${props => props.theme.background.secondary};
        border-radius:3px;
    } 
        .copy{opacity :0}
    li:hover{
        background:#000;
        border-radius:5px;
    }
    li:hover .copy{
            opacity:1
        }
        svg{
            cursor:'-webkit-grab'
        }
`;

const Checkbox = styled.span`
    display:inline-block;
    height:20px;
    width:20px;
    border-radius:15px;
    border:1px solid ${props => props.accent};
    margin:auto 5px;
    background:${props => props.checked ? props.accent : 'transparent'};
`;
const Project = styled.span`
    display:block;
    height:10px;
    width:10px;
    border-radius:25px;
    margin:auto 5px;
    background:${props => props.color};
` 