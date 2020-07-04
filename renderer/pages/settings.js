import styled, { ThemeConsumer } from 'styled-components'
import { ThemeContext, themes, ToggleThemeButton } from '../layouts/themecontext'
import Nav from '../components/nav'
import { exportUser, importUser, clearHistory } from '../services/settings'
import Icon from 'react-icons-kit'
import { upload, download, alertTriangle,user,globe,envelope,mail,send } from 'react-icons-kit/feather' 
import {socialWindows} from 'react-icons-kit/ionicons'
import { shell } from 'electron'
import { command } from 'react-icons-kit/feather'
import { arrowRight } from 'react-icons-kit/feather'
import { power } from 'react-icons-kit/feather'


export default () => {
    return (
        <>
            <Nav title="settings" />
            <Box title="Data" > 
                <div className="item" onClick={importUser}><Icon icon={upload} /> <span>Import Commands from JSON</span></div>
                <div className="item" onClick={exportUser}><Icon icon={download} /> <span>Export Commands from JSON</span></div>
                <div className="item" onClick={clearHistory}><Icon icon={alertTriangle} /><span> Clear History</span> </div>
            </Box>
            <Box title="About" > 
                <div className="item" onClick={()=>{shell.openExternal('https://twitter.com/achuth_hadnoor')}}><Icon icon={user} /> <span>Achuth Hadnoor</span></div>
                <div className="item" onClick={()=>{shell.openExternal('https://commandly.achuth-hadnoor.vercel.app')}}><Icon icon={globe} /> <span>website</span></div>
                <div className="item" onClick={()=>{shell.openExternal('mailto:achuth.hadnoor123@gmail.com')}}><Icon icon={send} /><span>Send Feedback</span> </div>
                <span style={{padding:'10px'}}>App Shortcut</span> 
                <div className="item" style={{justifyContent:'center'}} ><Icon icon={socialWindows} /> or <Icon icon={command}/> + ALT + <Icon icon={arrowRight}/> </div> 
              </Box>

        </>
    )
}

const Box = ({ title, children }) => {
    // const {theme , setTheme} = React.useContext(ThemeConsumer);
    return (
        <BoxWrapper>   
         <div className="title">{title}</div> 
            {children}
        </BoxWrapper>
    )
}

const BoxWrapper = styled.div`
    flex:1;
    .title{
        padding:15px;
        font-weight:600
    }
    .item{
        padding:10px;
        font-size:12px;
        cursor:pointer;
        transition:all .2s ease-in-out;
        display:flex;
        align-items:center;
        i{
            padding:10px;
        }
    }
    .item:hover{
    transition:all .2s ease-in-out;
        background:${props => props.theme.background.secondary}
    }

`