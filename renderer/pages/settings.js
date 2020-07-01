import styled, { ThemeConsumer } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../layouts/themecontext'

export default () => { 
    return (
        <>
            <Box title="About" items={[{ value: "product info" }, { value: "website" }]} />
            <ThemeContext.Consumer>
                {
                    ({theme,toggleTheme})=>(
                        <button onClick={toggleTheme}>toggletheme</button>
                    )
                }
            </ThemeContext.Consumer>
        </>
    )
}

const Box = ({ title, items }) => {
    // const {theme , setTheme} = React.useContext(ThemeConsumer);
    return (
        <div>
            <span>{title}</span>
            {
                items.map((t, i) => (
                    <div key={`items` + i} index={i}>
                        {t.value}
                    </div>
                ))
            }
        </div>
    )
}
