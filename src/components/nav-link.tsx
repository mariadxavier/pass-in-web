import { Link } from "react-router-dom";

interface NavLinkProps  {
    children: string, 
    to: string
}

export function NavLink(props: NavLinkProps) {
    return(
        <Link {...props} to={props.to} className="font-medium text-sm text-zinc-300">{props.children}</Link>

    )
}