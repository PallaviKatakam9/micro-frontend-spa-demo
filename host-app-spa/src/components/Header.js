import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Multi-Store Header E-commerce</h1>
      <NavLink to="/storeA" style={{ marginRight: 10 }}>React Remote</NavLink>
      <NavLink to="/storeB">Vue Remote</NavLink>
    </header>
  )
}