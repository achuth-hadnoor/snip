import React, { useContext } from 'react' 
import Page from '../layouts/page';

export default (props) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true)
    }, []);
    const body = (
        <Page>
            {props.children}
        </Page>
    )

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{body}</div>
    }

    return body
}