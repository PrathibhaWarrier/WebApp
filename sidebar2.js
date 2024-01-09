// ... (other imports)

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);

  // Add state to manage the sidebar's visibility
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.documentElement.classList.toggle("nav-open");
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  React.useEffect(() => {
    // Initialize PerfectScrollbar and clean up on component unmount
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  // ... (rest of the code)

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {/* ... (rest of the code) */}
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      onClick={toggleSidebar} // Toggle sidebar on link click
                    >
                      <i className={prop.icon} />
                      <p>{rtlActive ? prop.rtlName : prop.name}</p>
                    </NavLink>
                    {/* Add the text box with the customTextBox class */}
                    <input type="text" className="customTextBox" readOnly />
                  </li>
                );
              })}
              <li className="active-pro">
                <ReactstrapNavLink href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro">
                  <i className="tim-icons icon-spaceship" />
                  <p>Upgrade to PRO</p>
                </ReactstrapNavLink>
                {/* Add the text box with the customTextBox class */}
                <input type="text" className="customTextBox" readOnly />
              </li>
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

// ... (other code)

export default Sidebar;
