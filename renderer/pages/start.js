
import React  from 'react'
import styled from 'styled-components'
import Router,{withRouter} from 'next/router';
 
import { chevronLeft, chevronRight } from 'react-icons-kit/feather'
import Icon from 'react-icons-kit'
import Page from '../layouts/page'
import { getUser, updateUser } from '../services/local-storage';
import Phone from '../components/phone'
import Checklist from '../components/check'
import Nav from '../components/nav' 
import Link from 'next/link';

class Home extends React.Component {

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

    componentDidMount() {
        const { user } = getUser();
        if (user.onboard) {
            Router.push('/home?tab=Snips');
            return;
        }
        
        user.onboard = true;
        updateUser(user);
    } 

    render() {
        return (
        <Page>
            <Link href="/home?tab=Snips"><a>go now</a></Link>
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
`
export default withRouter(Home);
 