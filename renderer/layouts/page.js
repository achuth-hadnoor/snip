import { Component } from 'react'
import Router from 'next/router'
import Progress from 'nprogress'
import styled from 'styled-components'
import { ThemeContext } from './themecontext'
import { toggleTheme, themes } from './themecontext'
import Head from 'next/head'
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
        this.toggleTheme = () => {
            const theme = localStorage.getItem('theme');
            if (theme === 'light') {
                localStorage.setItem('theme', 'dark')
                return this.setState({
                    theme: themes.dark
                });
            }
            if (theme === 'dark') {
                localStorage.setItem('theme', 'light')
                return this.setState(state => ({
                    theme: themes.light
                }));

            }
            else {
                const desktopMode = window.matchMedia('(prefers-color-scheme : dark )').matches;
                if (desktopMode) {
                    localStorage.setItem('theme', 'light')
                    return this.setState({
                        theme: themes.light
                    });
                } else {
                    localStorage.setItem('theme', 'dark')
                    return this.setState({
                        theme: themes.dark
                    });
                }
            }

        };
        this.state = {
            theme: themes.dark,
            toggleTheme: this.toggleTheme,
        }
        this.handleKeypress = this.handleKeypress.bind(this)
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeypress, true);
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            return this.setState({ theme: themes.light })
        } if (theme === 'dark') {
            return this.setState({ theme: themes.dark })
        }
        else {
            const desktopMode = window.matchMedia('(prefers-color-scheme : dark )').matches;
            if (desktopMode) {
                return this.setState({
                    theme: themes.dark
                });
            }
            else {
                return this.setState({
                    theme: themes.light
                });
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeypress, true)
    }

    handleKeypress(event) {
        if (event.altKey && event.keyCode === 78) {
            return Router.push({
                pathname: '/new'
            })
        }
        // if (event.altKey && event.keyCode === 83) {
        //     return Router.push({
        //         pathname: '/settings'
        //     })
        // }

        if (event.altKey && event.keyCode === 37) {
            return Router.push({
                pathname: '/home?tab=Today'
            })
        }
    }

    render() {
        const { children } = this.props;
        return (
            <ThemeContext.Provider value={this.state}>
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
            </ThemeContext.Provider>
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
