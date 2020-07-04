import App from 'next/app'
import styled from 'styled-components'
import Provider from '../components/provider';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider> 
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default MyApp;
 