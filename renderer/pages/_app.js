import App from 'next/app'
import styled from 'styled-components'
import Provider from '../components/provider';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider>
                <Movable />
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default MyApp;

const Movable = styled.div`
    height:5px; 
    cursor:move; 
`;
