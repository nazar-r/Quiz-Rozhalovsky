import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <NavLink to="/quizzes" className="logo">
            Quiz Builder
          </NavLink>
          <nav className="nav">
            <NavLink to="/quizzes" end className="nav-link">
              Quizzes
            </NavLink>
            <NavLink to="/create" className="nav-link">
              Create
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
