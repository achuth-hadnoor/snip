import styled from 'styled-components'
import CheckList from '../checklist'
import { getProject } from '../../services/local-storage'
import Draggable from './sortable/drag-handle'
import Link from 'next/link';
export default ({ note, onDone, project }) => {
    return <Task color={project.hex} >
        <Checkbox
            name="checked"
            accent={project.hex}
            checked={note.completed}
            onClick={() => onDone(p.id)}
        />
        <Link href={`/snipnote?id=` + note.id}>
            <a style={{ display: 'flex', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '.9em', padding: '5px 10px' }}>{note.title}</span>
                    <span style={{ fontSize: '.7em', padding: '5px 10px' }} >{note.note}</span>
                </div>
            </a>
        </Link>
        <Project title={project.title} color={project.hex} />
        <Draggable/>
    </Task>
};

const Task = styled.div`
    display:flex;  
    padding:5px;
    margin-top:5px;
    cursor:pointer; 
    color:${props => props.theme.color.primary};
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