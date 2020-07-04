
import React from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router';

import { chevronLeft, chevronRight } from 'react-icons-kit/feather'
import Icon from 'react-icons-kit'
import Page from '../layouts/page'
import { getUser, updateUser } from '../services/local-storage';
import Phone from '../components/phone'
import Checklist from '../components/check' 
import Link from 'next/link';

class Home extends React.Component {
    componentDidMount() {
        const { user } = getUser();
        if (user.onboard) {
            Router.push('/home?tab=Snips');
            return;
        }
        user.onboard = true;
        updateUser(user);
    }
    constructor() {
        super();
        this.state = {
            slide: 0,
            slides: [{
                title: "Take Notes",
                content: "Take notes with projects to organize your day!",
                illustration: <Phone />
            }, {
                title: "Check Lists",
                content: "Mark your todo's with in the Notes",
                illustration: <Checklist />
            }]
        };
    } 

    render() {
        return (
            <Page>
                <div style={{display:"flex", flexDirection:'column' , alignItems:'center',justifyContent:'center',height:'100%'}}>
                    <h2>Commandly</h2>
                <Link href="/home?tab=Snips"><GetStarted>Get Started</GetStarted></Link>
                </div>
            </Page>
        )
    }
};

const Wrapper = styled.div`
    display:flex;
    margin:auto;
    align-items:center;
    flex-direction:column;
    font-family:monospace;
    transition:all .3s ease-in-out;
`
const Wrap = styled.div`
    display:flex;
    margin:auto;  
    text-align:center;
    justify-content:center;
    align-items:center;
    font-family:monospace;
    background:${props => props.theme.background.primary};
    height:100%;
    transition:all .3s ease-in-out;
`;
const GetStarted = styled.a`
    margin:10px;
    padding:5px 15px;
    background:${props => props.theme.background.ternary};
    color:${props => props.theme.color.primary};
    border-radius:5px;
    cursor:pointer;
    transition:all .3s ease-in-out;
`;

export default withRouter(Home);
