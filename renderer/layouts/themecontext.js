import React from "react";
import { createGlobalStyle } from "styled-components";
import Icon from "react-icons-kit";
import { moon, sun} from "react-icons-kit/feather"; 

export const themes = {
    light: {
        background: {
            primary: '#fff',
            secondary: '#eee',
            ternary: '#aaa',
            accent: 'palegreen'
        },
        color: {
            primary: '#000',
            secondary: '#232323',
            ternary: '#444'
        }
    },
    dark: {
        background: {
            primary: '#000',
            secondary: '#232323',
            ternary: '#444',
            accent: 'palegreen'
        },
        color: {
            primary: '#fff',
            secondary: '#eee',
            ternary: '#aaa'
        },
    }
}
export const colors = [{
    hex: 'rgba(88, 103, 242, 1)',
    name: 'Flocent Blue'
}, {
    hex: 'rgb(255, 139, 114)',
    name: 'Bitter Orange'
}, {
    hex: 'rgb(0, 175, 49)',
    name: 'Greeny Green'
}, {
    hex: 'rgb(255, 114, 156)',
    name: 'Hot Pink'
}, {
    hex: 'rgb(51, 51, 51)',
    name: 'Coal Black'
}, {
    hex: 'rgb(133, 75, 142)',
    name: 'Blind Purple'
}, {
    hex: 'rgb(246, 255, 114)',
    name: 'Flaunt Yellow'
}, {
    hex: 'rgb(196, 196, 196)',
    name: 'Ordinary white'
}]

export const toggleTheme = (theme) => {
    debugger
    theme === themes.light ? () => toggleTheme(themes.dark) : () => toggleTheme(themes.light)
}

export const ThemeContext = React.createContext({
    theme: themes.dark ,
    toggleTheme:()=>{debugger}
});
ThemeContext.displayName = "ThemeContext"
 
// Global Styles
export const GlobalStyle = createGlobalStyle`
 
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



export const ToggleThemeButton = () => (
    <ThemeContext.Consumer>
        {
            ({ themed, setThemed }) => (
                <button onClick={() => {
                    const theme = themed === themes.dark
                        ? themes.light
                        : themes.dark;
                    setThemed(theme);
                }}><Icon icon ={ themed === themes.dark
                    ? moon
                    : sun } /></button>
            )
        }
    </ThemeContext.Consumer>)