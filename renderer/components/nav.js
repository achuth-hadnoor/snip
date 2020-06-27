import React  from 'react'
import  { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { arrowLeft, x, settings, trash2 } from 'react-icons-kit/feather' 

const Navigation = ({ title, snipdel }) => { 
    const router = useRouter();
    switch (router.pathname) {
        case '/home':
            return (
                <NavWrapper> 
                    <Title>Commandly</Title>
                    <Link href="/about">
                        <a> <Icon icon={settings} /> </a>
                    </Link> 
                </NavWrapper>);
        case '/new':
            return (
                <NavWrapper>
                    <Title>{title}</Title>
                    <Link href="/home?tab=Snips"><a><Icon icon={x} /></a></Link>
                </NavWrapper>);
        case '/snipnote':
            return (
                <NavWrapper>
                    <Link href="/"><a><Icon icon={arrowLeft} /> </a></Link>
                    <Title>{title}</Title>
                        <Icon icon={trash2} onClick={() => { snipdel(); }} />
                </NavWrapper>
            )
        case '/':
            return (
                <NavWrapper>
                            <Title>{title}</Title>
                        </NavWrapper>
            )
        default:
            return (
                <NavWrapper>
                            <Link href="/"><a><Icon icon={arrowLeft} /></a></Link>
                            <Title>{title}</Title>
                        </NavWrapper>
            )
    }
}

export default Navigation

const NavWrapper = styled.nav`
    display:flex;
    max-width:400px;
    align-items:center;
    background:${props => props.theme.background.primary};
    i{
                            padding:10px;
    }
    span{
                            flex:1
    }
`;

const Title = styled.div`
    padding:5px;
    font-size:18px;
    /* font-weight:700; */
    flex:1;
    font-family:monospace;
    color:${props => props.theme.color.primary};
    /* text-align:center; */
`;
