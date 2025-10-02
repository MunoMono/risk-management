// src/components/HeaderBar.jsx
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
import { Link, useLocation, useNavigate } from "react-router-dom";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 672);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 672);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

function NavItem({ to, isCurrent, children }) {
  const navigate = useNavigate();
  return (
    <HeaderMenuItem
      href={to}
      isActive={isCurrent}
      onClick={(e) => {
        e.preventDefault();
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
      <Header aria-label="RCA Risk Management">
        {isMobile && (
          <HeaderMenuButton
            aria-label="Open menu"
            isActive={isNavOpen}
            onClick={() => setIsNavOpen((v) => !v)}
            data-header-action="true"
          />
        )}

        <HeaderName href="/" prefix="RCA" onClick={goHome}>
          Risk Management
        </HeaderName>

        {!isMobile && (
          <HeaderNavigation aria-label="Primary navigation">
            <NavItem to="/" isCurrent={pathname === "/"}>
              Home
            </NavItem>
            <NavItem to="/risks" isCurrent={pathname.startsWith("/risks")}>
              Risks
            </NavItem>
            <NavItem to="/about" isCurrent={pathname.startsWith("/about")}>
              About
            </NavItem>
          </HeaderNavigation>
        )}

        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Toggle theme" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </>
  );
}
