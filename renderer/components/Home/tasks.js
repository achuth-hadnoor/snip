import styled from 'styled-components'
import Link from 'next/link';
import Draggable from './sortable/drag-handle'
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';

export default ({ note, onDone, project, commands }) => {
    const [open, setopen] = React.useState(false)
    return <Task color={project.hex} >
        <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div>
                    { commands.length > 0 && <Icon icon={chevronDown} onClick={() => {
                        setopen(!open)
                    }} />}
                    <Link href={`/snipnote?id=` + note.id}>
                        <span style={{ fontSize: '.9em', padding: '5px 10px' }}>{note.title}</span>
                    </Link>
                </div>
                <span style={{ fontSize: '.7em', padding: '5px 10px' }} >{ note.snip.substr(0, 50) + '...' }</span>
            </div>
            {
                open ? (
                    <ul>
                        {
                            commands.length > 0 &&
                            commands.map((command, i) => <li key={`item` + i} index={i}>{command.value}</li>)
                        }
                    </ul>
                ) : null
            }
        </div>
        <Project title={project.title} color={project.hex} />
        <Draggable />
    </Task>
};

const Task = styled.div`
    display:flex;  
    padding:5px;
    margin-top:5px;
    cursor:pointer; 
    color:${props => props.theme.color.primary};
    align-items:center;
    &:hover{
        background:${props => props.theme.background.secondary};
        border-radius:3px;
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