import React from "react";

export const themes = {
    light: {
        background: {
            primary: '#fff',
            secondary: '#eee',
            ternary: '#aaa',
            accent: '#6275ff'
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
            accent: '#6275ff'
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

export const toggleTheme = () => {
    
}

export const ThemeContext = React.createContext({
    theme: themes.light, toggleTheme
});
ThemeContext.displayName = "ThemeContext"


export const ThemeWrapper = ({ children }) => { 
     
    const [ThemeValue, setThemeValue] = React.useState(themes.dark);
     
    return (
        <ThemeContext.Provider value={{ theme: ThemeValue, setTheme: setThemeValue }}>
            {children}
        </ThemeContext.Provider>
    )
}