'use strict'

// Packages
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components' 

const Navigation = ({ list, tabSelected }) => {
    return (
        <Tabs>
            {
                list.map(({ name, href }, i) => {
                    return (
                        <Link href={href} key={`name_` + i}>
                            <Tab active={tabSelected === name }>
                                <span>{name}</span>
                            </Tab>
                        </Link>
                    )
                })
            }
        </Tabs>
    )
}

const Tabs = styled.ul`  
        list-style:none;
        display:flex; 
        margin:0;
        padding:10px 0px;
        font-size:16px;
        user-select:none;
        max-width:300px;
        background:${props=>props.theme.background.primary};
        width:100%; 
        z-index:9;
`;

const Tab = styled.button`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        padding:5px;
        text-align:center;
        padding:5px 15px;
        cursor:pointer; 
        &::after {
            content: '';
            display: block;
            width: ${props => props.active ? '50%' : '0'};
            height: 2px;
            margin-top:5px;
            background:${props => props.theme.background.accent};
            transition: width .3s;
        }
    &:hover::after {
        width: 30%;
        transition: width .3s;
    } 
`;

Navigation.propTypes = {
    list: PropTypes.array.isRequired
}

export default Navigation