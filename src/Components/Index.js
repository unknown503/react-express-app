import React from 'react'
import Typewriter from 'typewriter-effect';
import {CenteredText} from './Styled/Components'
import { Link } from 'react-router-dom'

function Index() {
    return (
        <CenteredText>
            <Typewriter
                options={{
                    strings: ['aaaAaaAaaAaAAAaAAAaaAaaAaaaaAaa'],
                    autoStart: true,
                    loop: true,
                }}
            />
            <Link className="btn btn-outline-light btn-lg" to="/login">Login</Link>
            <Link className="btn btn-outline-info btn-lg ms-3" to="/sign-up">Sign-up</Link>
        </CenteredText>
    )
}

export default Index
