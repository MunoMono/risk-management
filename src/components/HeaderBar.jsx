import React, { useEffect, useState } from "react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
  SideNav,
  SideNavItems,
} from "@carbon/react";
import { Moon, Sun } from "@carbon/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

// Hook: detect small screen
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 672);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 672);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// Navigation item helper
function NavItem({ to, isCurrent, children, onClick }) {
  const navigate = useNavigate();
  return (
    <HeaderMenuItem
      href={to}
      isActive={isCurrent}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        navigate(to);
      }}
    >
      {children}
    </HeaderMenuItem>
  );
}

export default function HeaderBar({ theme, toggleTheme }) {
  const isDark = theme === "g90";
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    setIsNavOpen(false);
    if (pathname !== "/") navigate("/");
  };

  return (
    <>
      <Header aria-label="Graham Newman RCA PhD Risk Management">
        {isMobile && (
          <HeaderMenuButton
            aria-label="Open menu"
            isActive={isNavOpen}
            onClick={() => setIsNavOpen((v) => !v)}
            data-header-action="true"
          />
        )}

        <HeaderName href="/" prefix="Graham Newman PhD" onClick={goHome}>
          risk management
        </HeaderName>

        {!isMobile && (
          <HeaderNavigation aria-label="Primary navigation">
            <NavItem to="/" isCurrent={pathname === "/"}>
              Home
            </NavItem>
            <NavItem to="/risks" isCurrent={pathname.startsWith("/risks")}>
              Risks
            </NavItem>
            <NavItem to="/heatmap" isCurrent={pathname.startsWith("/heatmap")}>
              Heat map
            </NavItem>
          </HeaderNavigation>
        )}

        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Toggle theme"
            onClick={toggleTheme}
            tooltipAlignment="end"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      {/* Mobile SideNav */}
      {isMobile && (
        <SideNav
          aria-label="Mobile navigation"
          expanded={isNavOpen}
          onOverlayClick={() => setIsNavOpen(false)}
        >
          <SideNavItems>
            <NavItem to="/" isCurrent={pathname === "/"} onClick={() => setIsNavOpen(false)}>
              Home
            </NavItem>
            <NavItem
              to="/risks"
              isCurrent={pathname.startsWith("/risks")}
              onClick={() => setIsNavOpen(false)}
            >
              Risks
            </NavItem>
            <NavItem
              to="/heatmap"
              isCurrent={pathname.startsWith("/heatmap")}
              onClick={() => setIsNavOpen(false)}
            >
              Heat map
            </NavItem>

            {/* Theme toggle inside mobile menu */}
            <HeaderGlobalAction
              aria-label="Toggle theme"
              onClick={() => {
                toggleTheme();
                setIsNavOpen(false);
              }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>
          </SideNavItems>
        </SideNav>
      )}
    </>
  );
}
