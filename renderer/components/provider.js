import React, { useContext } from 'react'
import Page from '../layouts/page';
import { themes, ThemeContext } from '../layouts/themecontext';
import { ThemeProvider } from 'styled-components';
import { getUser } from '../services/local-storage';

export default (props) => {
    const [mounted, setMounted] = React.useState(false);
    const [themed, setThemed] = React.useState(themes.dark);
    React.useEffect(() => {
        setMounted(true);
        const {user} = getUser();
        const theme = user.theme === 'dark' ? themes.dark : themes.light;
        setThemed(theme);
    }, []);
    const body = (
        <ThemeContext.Provider value={{themed,setThemed}}>
            <ThemeProvider theme={themed}>
                <Page>
                    {props.children}
                </Page>
            </ThemeProvider>
        </ThemeContext.Provider>
    )

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{body}</div>
    }

    return body
}