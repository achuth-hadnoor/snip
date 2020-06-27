import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { sun, moon, arrowLeft, x, info, trash2 } from 'react-icons-kit/feather'
import { ThemeContext } from '../layouts/themecontext'
import Link from 'next/link'

const Navigation = ({ title, snipdel, mode }) => {
    const [menu, setMenu] = useState(false)
    useEffect(() => {
        setMenu(mode);
    }, [mode])
    const router = useRouter();
    switch (router.pathname) {
        case '/home':
            return (
                <NavWrapper>
                    <Title>Commandly</Title>
                    <>
                        <ThemeContext.Consumer>
                            {({ toggleTheme }) =>
                                <Icon icon={menu ? moon : sun} onClick={() => {
                                    setMenu(!menu);
                                    toggleTheme();
                                }} />
                            }
                        </ThemeContext.Consumer>
                        <Icon icon={info} onClick={() => { Router.push('/about') }} />
                    </>
                </NavWrapper>);
        case '/new':
            return (
                <NavWrapper>
                    <Title>{title}</Title>
                    <Link href="/"><Icon icon={x} onClick={() => { Router.push('/') }} /></Link>
                </NavWrapper>);
        case '/snipnote':
            return (
                <NavWrapper>
                    <Link href="/"><Icon icon={arrowLeft} onClick={() => { Router.push('/') }} /></Link>
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
                    <Icon icon={arrowLeft} onClick={() => { Router.push('/') }} />
                    <Title>{title}</Title>
                </NavWrapper>
            )
    }
}
export default Navigation

const NavWrapper = styled.nav`
    display:flex; 
    padding:5px;
    max-width:400px;
    background:${props => props.theme.background.primary};
    i{
        padding:10px;
    }
    span{
        flex:1
    }
`;

const Title = styled.div`
    padding:10px 0px;
    font-size:18px;
    font-weight:700;
    flex:1; 
    -webkit-app-region:drag;
    cursor:grab;
    color:${props => props.theme.color}
`;
