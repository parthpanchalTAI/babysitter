import React from 'react';
import useKeyboard from '../hooks/useKeyboard';
import Container from './Container';

const FooterComponents = ({
    children
}) => {
    const { isKeyboardVisible } = useKeyboard();

    if (isKeyboardVisible) {
        return null
    }
    return (
        <Container
            containerStyle={{
                position: 'absolute',
                bottom: -10,
                width: '100%',
                justifyContent: 'center',
                // display: isKeyboardVisible ? 'none' : 'flex'
            }}
            height={130}
        >
             <Container containerStyle={{
                position: 'absolute',
                alignSelf: 'center',
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'center',
                bottom: 20,
            }}
            >
                {children}
            </Container>
        </Container>
    )
}

export default FooterComponents;