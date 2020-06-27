
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
                <Nav title="Snipnote" home />
                {/* <button style={{background:'transparent',textAlign:'right'}} onClick={this.goHome}>SKIP</button> */}
                {/* <Link href="/home?tab=Today">
                    <a style={{ background: '#000', color: '#555', textAlign: 'right', padding: '5px 10px' }}>Skip</a></Link> */}
                {
                    this.state.slide === 0 ?
                        <Wrap>
                            {/* <span style={{ padding: '10px', background: '#111', borderRadius: '25px', margin: '10px' }}>
                                <Icon icon={chevronLeft} />
                            </span> */}
                            <Wrapper>
                                <Phone />
                                <h2 style={{ padding: '20px' }}>Take Notes</h2>
                                <p style={{ fontSize: '.7em', textAlign: 'center', padding: '10px' }}>
                                    Take notes with projects to organize your day!
                    </p>

                            </Wrapper>
                            <span style={{ padding: '10px', background: '#111', borderRadius: '25px', margin: '10px' }} 
                            onClick={()=>{this.setState({slide:1})}}>
                                <Icon icon={chevronRight} />
                            </span>
                        </Wrap>

                        :
                        <Wrap>
                            <span style={{ padding: '10px', background: '#111', borderRadius: '25px', margin: '10px' }} onClick={()=>{this.setState({slide:0})}}>
                                <Icon icon={chevronLeft} />
                            </span>
                            <Wrapper>
                                <Checklist />
                                <h2 style={{ padding: '20px' }}>Check Lists</h2>
                                <p style={{ fontSize: '.7em', textAlign: 'center', padding: '10px' }}>
                                    Mark your todo's with in the Notes!
                    </p>

                            </Wrapper>
                            {/* <span style={{ padding: '10px', background: '#111', borderRadius: '25px', margin: '10px' }}>
                                <Icon icon={chevronRight} />
                            </span> */}
                        </Wrap>} 
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
 