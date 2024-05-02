import nlwUniteIcon from '../assests/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header(){
    return(
        <div className="flex items-center gap-5 py-2">
            <img src={nlwUniteIcon}/>

            <nav className="flex items-center gap-5">
                <NavLink to="/eventos">Eventos</NavLink>
                <NavLink to='/'>Participantes</NavLink>
            </nav>
        </div>

    )
}