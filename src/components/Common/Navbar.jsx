import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  const isLinkActive = (link) => {
    if (link.title === "Catalog") {
      return Boolean(matchRoute("/catalog/:catalogName"))
    }
    return link.path ? Boolean(matchRoute(link.path)) : false
  }

  const navLinkClass = (active) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-richblack-700 text-yellow-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        : "text-richblack-100 hover:bg-richblack-800 hover:text-richblack-5"
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-richblack-700/80 bg-richblack-900/90 shadow-[0_8px_32px_rgba(0,8,20,0.45)] backdrop-blur-xl"
          : "border-richblack-700/40 bg-richblack-900/70 backdrop-blur-md"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-50/30 to-transparent" />

      <div className="mx-auto flex h-16 w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt="StudyNotion"
            width={150}
            height={30}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-richblack-700/60 bg-richblack-800/50 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${navLinkClass(
                      isLinkActive(link)
                    )}`}
                  >
                    <span>{link.title}</span>
                    <BsChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />

                    <div className="invisible absolute left-1/2 top-full z-[1000] mt-3 w-[240px] -translate-x-1/2 translate-y-2 rounded-xl border border-richblack-600 bg-richblack-800/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 lg:w-[300px]">
                      {loading ? (
                        <p className="px-3 py-4 text-center text-sm text-richblack-200">
                          Loading...
                        </p>
                      ) : subLinks.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block rounded-lg px-3 py-2.5 text-sm text-richblack-25 transition-colors hover:bg-richblack-700 hover:text-yellow-50"
                              key={i}
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="px-3 py-4 text-center text-sm text-richblack-200">
                          No Courses Found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className={navLinkClass(isLinkActive(link))}>
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-richblack-700 bg-richblack-800/80 text-richblack-100 transition-all duration-200 hover:border-yellow-50/40 hover:text-yellow-50"
            >
              <AiOutlineShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-yellow-50 px-1 text-[10px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-full border border-richblack-600 px-5 py-2 text-sm font-medium text-richblack-25 transition-all duration-200 hover:border-richblack-500 hover:bg-richblack-800">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-full bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 shadow-[0_0_24px_rgba(255,214,10,0.2)] transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-25">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-richblack-700 bg-richblack-800/80 md:hidden"
          aria-label="Open menu"
        >
          <AiOutlineMenu fontSize={20} className="text-richblack-100" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
