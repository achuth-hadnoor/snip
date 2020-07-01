import { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Progress from 'nprogress'
import styled, { ThemeProvider, ThemeContext } from 'styled-components'
import { themes, GlobalStyle } from './themecontext'

let progress
const stopProgress = () => {
    clearTimeout(progress)
    Progress.done()
}

Router.onRouteChangeStart = () => {
    progress = setTimeout(Progress.start, 200)
}

Router.onRouteChangeComplete = stopProgress
Router.onRouteChangeError = stopProgress

class Page extends Component {
    constructor() {
        super();
        this.state = {
            theme: themes.dark,
            toggleTheme: this.toggleTheme,
        }
        this.handleKeypress = this.handleKeypress.bind(this)
    }
    toggleTheme = () => {
        debugger
        this.setState(state => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));
    };
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeypress, true);
        Router.onRouteChangeError = stopProgress
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeypress, true);
        Router.onRouteChangeError = stopProgress
    }

    handleKeypress(event) {
        if (event.altKey && event.keyCode === 78) {
            return Router.push({
                pathname: '/new'
            })
        }

        if (event.altKey && event.keyCode === 37) {

            return Router.push({
                pathname: '/home?tab=Snips'
            })
        }
    }

    render() {
        const { children } = this.props;
        return (
            <>
                {/* <ThemeContext.Provider value={this.state}>
                  <ThemeProvider theme={this.state.theme}> */}
                <GlobalStyle />
                <Head>
                    <title>Snip Note</title>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#000" />
                    <meta
                        name="description"
                        content="A notes app to get your task done..."
                    />
                </Head>
                <Wrapper>
                    {children}
                </Wrapper>
                {/* </ThemeProvider>
            </ThemeContext.Provider> */}
            </>
        )
    }
}

export default Page

const Wrapper = styled.div`
    display:flex; 
    flex-direction:column;
    max-width:600px;
    width:100%;
    flex:1;
    height:100%;
    margin:auto;  
`;
