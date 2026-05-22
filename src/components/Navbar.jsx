"use client";
import { authClient } from "@/lib/auth-client";
import { syncJwtFromSession, setStoredToken } from "@/lib/api";
import { Avatar, Button, Spinner } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Navlinks from "./Navlinks";
import { FaHamburger, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const jwtSynced = useRef(false);
  useEffect(() => {
    if (user?.email && !jwtSynced.current) {
      jwtSynced.current = true;
      syncJwtFromSession(user).catch(() => { });
    }
    if (!user?.email) jwtSynced.current = false;
  }, [user?.email]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setStoredToken(null);
    await authClient.signOut();
    setProfileOpen(false);
  };

  const privateLinks = user
    ? [
      { href: "/add-idea", label: "Add Idea" },
      { href: "/my-ideas", label: "My Ideas" },
      { href: "/my-interactions", label: "My Interactions" },
    ]
    : [];

  return (
    <nav className="py-3 border-b border-slate-200 dark:border-slate-700 mb-4 sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <div className="w-11/12 mx-auto flex justify-between items-center gap-4">
        <Link
          href="/"
          className="md:text-3xl text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tighter shrink-0"
        >
          IdeaVault
        </Link>

        <button
          type="button"
          className="sm:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaHamburger />
        </button>

        <ul
          className={`
            ${menuOpen
              ? "flex" : "hidden"
            }
             sm:flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 absolute sm:static top-full left-0 right-0 sm:top-auto bg-white dark:bg-slate-950 sm:bg-transparent p-4 sm:p-2 border-b sm:border-0 border-slate-200 dark:border-slate-700`}
        >
          <li>
            <Navlinks href="/">Home</Navlinks>
          </li>
          <li>
            <Navlinks href="/ideas">Ideas</Navlinks>
          </li>
          {privateLinks.map((link) => (
            <li key={link.href}>
              <Navlinks href={link.href}>{link.label}</Navlinks>
            </li>
          ))}

          <li>
            <Button
              variant="outline"
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xl cursor-pointer min-w-10 text-yellow-400"
              aria-label="Toggle theme"
            >
              {
                theme === "light" ?
                  <IoMoonOutline /> : <IoSunnyOutline />
              }
            </Button>
          </li>

          <li>
            {
              isPending ? (
                <Spinner size="sm" />
              ) : user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full border border-slate-500 dark:border-slate-600 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Avatar size="sm">
                      {user?.image ? (
                        <Avatar.Image src={user.image} alt={user.name} />
                      ) : null}
                      <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-2 z-50">
                      <Link
                        href="/my-profile"
                        className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profile Management
                      </Link>
                      <Link
                        href="/my-ideas"
                        className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Ideas
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Logout <FaSignOutAlt />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link className="font-semibold hover:text-indigo-600" href="/login">
                    Login
                  </Link>
                  <Link
                    className="font-semibold bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
              )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
