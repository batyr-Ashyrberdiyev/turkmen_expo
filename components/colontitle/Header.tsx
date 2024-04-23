"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import logo from "@/public/assets/icons/header/logo.svg";
import burger from "@/public/assets/icons/header/burger.svg";
import search from "@/public/assets/icons/header/search.svg";
import searchMob from "@/public/assets/icons/header/mob-search.svg";

import { LangMenu } from "../ui/LangMenu";
import { Input } from "../home/Input";
import { headerMenu, headerMenu2 } from "@/lib/database/pathnames";
import { BurgerMenu } from "../ui/BurgerMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectHeader, setShowInput } from "@/redux/slices/headerSlice";
import { selectBurger, setBurgerMenu } from "@/redux/slices/burgerSlice";

export const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { showInput } = useAppSelector(selectHeader);
  const { burgerMenu } = useAppSelector(selectBurger);

  const toggleMenu = () => {
    dispatch(setBurgerMenu(!burgerMenu));
    dispatch(setShowInput(false));
  };

  const onSearch = () => {
    dispatch(setShowInput(!showInput));
    dispatch(setBurgerMenu(false));
  };

  return (
    <>
      {/* Mobile */}

      <header
        className={clsx(
          "bg-bgWhite tab:hidden flex items-center justify-between z-50 px-4 py-6 sticky ",
          {
            "fixed w-full top-0": burgerMenu,
          }
        )}
      >
        <Image
          src={searchMob}
          height={32}
          width={32}
          alt="поиск"
          className="cursor-pointer"
          onClick={onSearch}
        />

        <Link
          onClick={() => {
            dispatch(setBurgerMenu(false));
            dispatch(setShowInput(false));
          }}
          href={"/"}
        >
          <Image
            src={logo}
            height={24}
            width={160}
            alt="лого"
            className="cursor-pointer"
          />
        </Link>

        <Image
          src={burger}
          height={32}
          width={32}
          alt="меню"
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        <AnimatePresence>{burgerMenu && <BurgerMenu />}</AnimatePresence>
      </header>

      <AnimatePresence>
        {showInput && (
          <div className="absolute w-full top-0 left-0">
            <Input mob />
          </div>
        )}
      </AnimatePresence>

      {/* Desktop */}

      <header className="hidden relative z-[3000] tab:flex flex-col">
        <div className="flex items-center bg-darkBlue text-white py-[12px] font-regular text-extraSm">
          <div className="container flex items-center justify-between">
            <p className="text-extraSm">Тел.: +99362006200</p>
            <div className="flex items-center gap-[6px]">
              <div className="flex items-center gap-x-[20px]">
                {headerMenu.map((item) => (
                  <Link key={v4()} href={item.link}>
                    <p
                      className={clsx(
                        "after:transition-all duration-1000 relative leading-[130%]",
                        {
                          "link-border-bottom cursor-default hover:after:bg-green":
                            item.link === pathname,
                          "hover:link-border-bottom hover:after:bg-[#738799]":
                            item.link === item.link,
                        }
                      )}
                    >
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex gap-[10px]">
                <LangMenu />
                <Image
                  src={search}
                  alt="поиск"
                  onClick={() => dispatch(setShowInput(true))}
                  className="cursor-pointer"
                />
                <AnimatePresence>
                  {showInput && (
                    <div className="absolute h-[100vh] w-full z-[2500] top-0 left-0">
                      <Input />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bgWhite text-black">
          <div className="container py-[17px] flex items-center justify-between">
            <Link href="/">
              <Image src={logo} alt="logo" height={38} width={235} />
            </Link>
            <div className="flex items-center gap-x-[20px] font-medium">
              {headerMenu2.map((item) => (
                <Link key={v4()} href={item.link} className="cursor-pointer">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
