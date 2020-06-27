import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Page from '../layouts/page';
import { ThemeContext } from '../layouts/themecontext'


// Global Styles
const GlobalStyle = createGlobalStyle`
 
html,body{
  margin:0;
  padding:0;  
  position:relative;
  height:100%;
  width:100%;
  font-size:17px;
  display:flex;
  flex-direction:column;
  background:${props => props.theme.background.primary};
  color:${props => props.theme.color.primary};
  transition:.1s ease-in-out;
}
*,:after,:before {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none
}
::-webkit-scrollbar {  
    transition:all 1s ease-in-out;
    height: 14px;
    width:5px;
    background: ${props => props.theme.background.primary};
}  
::-webkit-scrollbar-track { 
    transition:all 1s ease-in-out;
}
::-webkit-scrollbar-thumb,::-webkit-scrollbar-track {
    background-clip: padding-box;
    border-radius: 8px; 
}
::-webkit-scrollbar-thumb {
   background: ${props => props.theme.background.accent};
} 
#__next{
  padding:0;
  margin:0;   
  flex:1;
  font-family:sans-serif;
}
input[type="submit"] {
      padding: 5px 15px;
      background: #ccc;
      border: 0 none;
      cursor: pointer;
      -webkit-border-radius: 5px;
      border-radius: 5px;
    }
    a{
      text-decoration:none;
      color:inherit;
      outline:none;
    }
    a:visited{
        font-weight:600;
    }
    .themeChanger{
        position:absolute;
        top:0px;
        right:0px;
        border:none;
        background:transparent;
        z-index:999999
    }
    i{
        cursor:pointer;
    }
    #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: palegreen;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${props => props.theme.background.accent}, 0 0 5px ${props => props.theme.background.accent};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
      button{
          border:none;
          padding:0px;
          margin:0px;
          background:inherit;
          color:inherit;
      }
`;


export default (props) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true)
    }, []);
    const body = <Page>
        <ThemeContext.Consumer>
            {(themes) => {
                return (<ThemeProvider theme={themes.theme}>
                    <GlobalStyle />
                    {props.children}
                </ThemeProvider>)
            }
            }
        </ThemeContext.Consumer>

    </Page>

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{body}</div>
    }
    
    return body
}