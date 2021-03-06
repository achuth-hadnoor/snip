import styled from 'styled-components'
import Icon from 'react-icons-kit'
import {search} from 'react-icons-kit/feather'

export default (props) => { 
    return (
        <InputWrapper>
           { props.title && <span>{props.title}</span> } 
            <Wrapper>
                {props.search === "true" ? <Icon icon={search} /> : null}
                <input   {...props} />
            </Wrapper>
        </InputWrapper>
    )
}

const Wrapper = styled.div`
    display:flex; 
    background:${props => props.theme.background.secondary};
    border-radius:5px; 
    margin:5px;
    transition:all .3s ease-in-out;
    i{
        padding:5px;
    }
    input{
        padding:5px 5px;
        color:${props => props.theme.color.secondary};
        background:${props => props.theme.background.secondary};
        border:none;
        flex:1;
        border-radius:5px;
    }

`

const InputWrapper = styled.div`
    display:flex; 
    flex-direction:column;
    max-width:400px; 
    span{
        color:${props => props.theme.color.ternary};
        font-size:14px; 
        padding:5px 10px ;
    } 
    transition:all .3s ease-in-out;
`