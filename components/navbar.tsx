"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

const Navlinks = [
  { id: 1, title: "About", slug: "about" },
  { id: 2, title: "Works", slug: "works" },
  { id: 3, title: "Contact", slug: "contact" },
];

export default function Navbar() {
  let pathname = usePathname(); //This is to get the current loction
  const [open, setOpen] = useState(false); // State to manage the full screen Menu.If false it is closed and if true it is opened
  const [menuBtnState, setMenuBtnState] = useState(false); // State to manage the hamburger Menu.If false it is closed and if true it is opened
  const [openBtn, setBtnOpen] = useState(false);

  const handleHanburgerManu = () => {
    if (!menuBtnState) {
      //open
      setMenuBtnState(true);
      setOpen(true);
      setBtnOpen(true);
    } else {
      //close
      setMenuBtnState(false);
      setOpen(false);
      setBtnOpen(false);
    }
  };
  const hideMenu = () => {
    if (open) {
      setOpen(false);
      setMenuBtnState(false);
      setBtnOpen(false);
    }
  };
  return (
    <nav
      className={`fixed top-0 z-50 flex w-full flex-col items-center border-b border-alt-300/40 bg-alt-500 bg-opacity-30 backdrop-blur-lg backdrop-filter`}
    >
      <div className='flex w-full max-w-7xl flex-col px-4 py-3'>
        <div className='flex w-full justify-between'>
          {/* Logo and Pic */}
          <div className='flex items-center space-x-2'>
            <div className='nav-link-logo'>
              <Link href={"/"} className=''>
                <h1 className=''>iamjulius</h1>
                {pathname === "/" ? (
                  <motion.div
                    layoutId='nav'
                    transition={{
                      duration: 0.8,
                      delay: 0.8,
                      ease: "easeInOut",
                      opacity: { ease: "easeInOut" },
                      layout: { duration: 0.3 },
                    }}
                    className='h-[0.2rem] w-full overflow-hidden bg-white'
                  ></motion.div>
                ) : (
                  <div className='h-[0.2rem] bg-transparent'></div>
                )}
              </Link>
            </div>
          </div>
          {/* Links and CTA */}
          <div className=''>
            <div className=''>
              <div className={`z-[50] flex w-full select-none overflow-hidden`}>
                <div className='flex flex-col items-center justify-center overflow-hidden'>
                  {/* Hanburger Manu Itself */}
                  <div
                    data-cursor-stick='#stick-here'
                    data-cursor='-navstick'
                    className='fixed right-0 top-0 z-[50] pb-6 pl-6 pr-4 pt-4 md:right-4'
                  >
                    <div
                      id='stick-here'
                      onClick={handleHanburgerManu}
                      className={`navMen z-[100] cursor-pointer
            ${open ? "px-3 py-1" : "px-3 py-1"}
          `}
                    >
                      <div className='flex w-6 items-center justify-end'>
                        <div className='group flex h-4 w-4 cursor-pointer flex-col items-center justify-between'>
                          {/* the btn */}
                          <span
                            className={`relative h-[2px] w-full transform cursor-pointer rounded-lg bg-white transition duration-300 ease-in-out 
                ${openBtn ? "translate-y-1 rotate-45 bg-white" : ""}
                `}
                          />
                          <span
                            className={`relative h-[2px] w-full transform cursor-pointer rounded-lg bg-white transition duration-300  ease-in-out
                ${openBtn ? "hidden w-0" : "w-full"}
                `}
                          />
                          <span
                            className={`relative h-[2px] w-full transform  cursor-pointer rounded-lg bg-white transition duration-300 ease-in-out
                ${openBtn ? "-translate-y-2.5 -rotate-45 bg-white" : ""}
                `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* MainMenu */}
                  <div className=''>
                    <AnimatePresence mode='sync'>
                      {open && (
                        <div className='fixed right-0 top-0 z-30 min-h-screen w-full overflow-hidden bg-alt-500  font-black'>
                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            className='relative h-screen w-full'
                          >
                            <div className='flex h-full flex-col justify-between'>
                              {/* top */}
                              <div className=' relative z-40 flex h-40 flex-col justify-end overflow-hidden'></div>

                              {/* navlinks */}
                              <div className='z-[80] flex flex-1 flex-col justify-center'>
                                <div className='flex flex-col items-center justify-center space-y-8 text-4xl'>
                                  {/* home Link */}
                                  {Navlinks.map((data) => {
                                    const { id, slug, title } = data;
                                    return (
                                      <div key={id}>
                                        <Link
                                          href={`/${slug}`}
                                          onClick={hideMenu}
                                          className='text-[#828282]/70 hover:text-white'
                                        >
                                          <h1
                                            className={`font-Black ${
                                              pathname === `/${slug}` &&
                                              "underline"
                                            }  hover:decoration-white`}
                                          >
                                            {title}
                                          </h1>
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
