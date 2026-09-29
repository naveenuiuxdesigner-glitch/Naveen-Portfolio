import { Link } from 'react-router'

/*
  One menu link to a homepage section.
  - "Contact" jumps to the footer on whatever page you're on (the footer is everywhere).
    It's a router link that only changes the #, never a plain href="#contact": in the preview
    build the address itself lives after a #, so a plain one opened a missing /contact page.
  - Every other item goes to its section on the homepage, e.g. /#skills.
  - `active` marks the section currently on screen; screen readers hear it as "current location".
*/
export function NavItem({ item, active = false, className, onClick }) {
  const current = active ? 'location' : undefined

  if (item.id === 'contact') {
    return (
      <Link to={{ hash: '#contact' }} className={className} aria-current={current} onClick={onClick}>
        {item.label}
      </Link>
    )
  }

  return (
    <Link to={{ pathname: '/', hash: `#${item.id}` }} className={className} aria-current={current} onClick={onClick}>
      {item.label}
    </Link>
  )
}
