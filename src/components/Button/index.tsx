import {  ReactNode,} from 'react'
import { Link } from 'react-router-dom'
import './style.scss'


type typeProps={
    children:ReactNode,
    to:string
}
export function Button(props: typeProps,) {
    const {children,to}=props
    return (
        <div id="button">
            <Link  to={to} className='btn btn-primary btn-lg btn-block'>
                {children}
            </Link>
            
            
        </div>
    )
}