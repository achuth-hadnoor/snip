import { useState } from 'react';
import Icon from "react-icons-kit"
import { check } from "react-icons-kit/feather"
import styled from 'styled-components'
import { chevronDown } from 'react-icons-kit/feather';

export default ({ projects, selProject, onClick }) => {
    let [expand, setExpand] = useState(false);
    let content;
    switch (expand) {
        case true:
            content = <ProjectWrapperOpen>
                {
                    projects ? projects.map(
                        (p, i) => {
                            return (
                                <li key={`p` + i + p.id} hex={p.hex} onClick={() => { setExpand(!expand); onClick(p.id) }}>
                                    <Dot hex={p.hex} />
                                    <Project> {p.title} </Project>
                                    {p.id === selProject ? <Icon icon={check} /> : null}
                                </li>
                            )
                        }) : (
                            <li onClick={() => {
                                setExpand(!expand)
                            }}>
                                <Project> Untitled </Project>
                                <Icon icon={check} />
                            </li>
                        )
                }
            </ProjectWrapperOpen>
            break;
        case false:
        const _project = projects ? projects.filter((p, i) => {
                if (p.id === selProject) {
                    return (
                        <ProjectWrapper
                            key={i}
                            hex={p.hex} onClick={() => setExpand(!expand)}>
                            <Dot hex={p.hex} />
                            <Project >{p.title}</Project>
                            <Icon icon={chevronDown} />
                        </ProjectWrapper>)
                }
            }): [];            
            content = _project.length !== 0 ? _project.map((p, i) => {
                if (p.id === selProject) {
                    return (
                        <ProjectWrapper
                            key={i}
                            hex={p.hex} onClick={() => setExpand(!expand)}>
                            <Dot hex={p.hex} />
                            <Project >{p.title}</Project>
                            <Icon icon={chevronDown} />
                        </ProjectWrapper>)
                }
            }) : <ProjectWrapper 
                            hex="#6275ff" onClick={() => setExpand(!expand)}>
                            <Dot hex="#6275ff" />
                            <Project >Untitled</Project>
                            <Icon icon={chevronDown} />
                        </ProjectWrapper>
            break;
    }
    return (
        <Wrapper>
            <Title>Project</Title>
            {content}
        </Wrapper >
    )
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
padding:10px;
max-width:400px;
cursor:pointer;
user-select:none;
`
const Title = styled.span`
font-size:14px;
padding:5px;
color : ${props => props.theme.color.ternary}
`
const ProjectWrapper = styled.div`
display:flex;
padding:10px;
cursor:pointer;
background : ${props => props.theme.background.secondary};
color : ${props => props.theme.color.secondary};
border-radius:5px;
font-size:16px; 
`
const Dot = styled.span`
    margin:5px;
    border-radius:25px;
    height:5px;
    width:5px;
    background:${props => props.hex}
`
const Project = styled.div`
flex:1;
padding:0px 10px 
`

const ProjectWrapperOpen = styled.ul`
list-style:none;
display:flex;
flex-direction:column;
padding:10px;
cursor:pointer;
background : ${props => props.theme.background.secondary};
color : ${props => props.theme.color.secondary};
border-radius:5px;
font-size:16px;
max-height:300px;
overflow:auto;
li{
    display:flex;
    padding:10px 0px;
}
`