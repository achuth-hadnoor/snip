import styled, { ThemeConsumer } from 'styled-components'
import { ThemeContext, themes, ToggleThemeButton } from '../layouts/themecontext'
import Link from 'next/link'

export default () => {
    return (
        <><ToggleThemeButton/>
        <Link href="/"><a>Go back please</a></Link>
            <Box title="About" items={[{ value: "product info" }, { value: "website" }]} />
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

