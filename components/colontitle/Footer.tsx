"use client";

import React from "react";
import Link from "next/link";

import vk from "@/public/assets/icons/footer/vk.svg";
import rss from "@/public/assets/icons/footer/rss.svg";
import telegram from "@/public/assets/icons/footer/telegram.svg";

import { footerInfo, headerMenu, headerMenu2 } from "@/lib/database/pathnames";
import { useAppSelector } from "@/redux/hooks";
import { useLang } from "@/utils/useLang";

export const icons = [
  { title: telegram, link: "" },
  { title: vk, link: "" },
  { title: rss, link: "" },
];

export const Footer = () => {
  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  return (
    <footer className="bg-darkBlue pt-6 pb-5 mob:py-[40px]">
      <div className="container">
        <div className="flex md:flex-row flex-col justify-between text-bgWhite text-sm md:mb-[80px] mb-5">
          <div className="w-full mob:max-w-[600px] flex md:flex-row flex-col items-start justify-between gap-x-[20px]">
            <div className="w-full max-w-[290px] flex flex-col items-start gap-y-[10px]">
              {headerMenu2
                .filter((item) => (localization === "en" ? item.en : !item.en))
                .map((item, i) => (
                  <Link key={i} href={item.link} className="cursor-pointer">
                    {item.title}
                  </Link>
                ))}
            </div>

            <hr className="md:hidden w-full border-[1px] border-gray3 max-w-[233px] my-5" />

            <div className="w-full max-w-[290px] mob:leading-[100%] leading-[115%] md:mb-0 mb-5 flex flex-col items-start gap-y-[10px]">
              {headerMenu
                .filter((item) => (localization === "en" ? item.en : !item.en))
                .map((item, i) => (
                  <Link key={i} href={item.link} className="cursor-pointer">
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-end w-full md:mb-5">
              <div className="mb-[40px] flex flex-col md:gap-y-[10px] gap-0">
                {footerInfo.map((item, i) => (
                  <p
                    className="md:leading-[100%] text-[12px] leading-[130%]"
                    key={i}
                  >
                    {item}
                  </p>
                ))}
              </div>
              {/* <form className="flex flex-col flex-wrap items-start gap-x-[10px] w-full">
              <label
                htmlFor="footer"
                className="text-sm mob:mb-[19px] font-normal md:font-medium mb-[10px]">
                Подписка на новости «ТуркменЭкспо»
              </label>
              <div className="flex w-full mb-5 md:flex-row flex-wrap flex-col md:items-center items-start gap-[10px]">
                <input
                  id="footer"
                  type="email"
                  placeholder="Ваш e-mail адрес"
                  className="focus:outline-none md:w-[206px] w-full border-[1px] border-gray3 placeholder:text-bgWhite placeholder:text-[12px] mob:px-[15px] mob:py-[10px] p-4 bg-navyBlue2 text-[12px] text-bgWhite"
                />
                <button type="submit" className="bg-navyBlue p-[16px] text-[12px] mob:py-[10px]">
                  Подписаться
                </button>
              </div>
            </form> */}
              {/* <p className="text-[12px] leading-[130%] max-w-[300px]">
              Оформляя подписку, вы даете согласие на обработку своих персональных данных
            </p> */}
            </div>
          </div>
        </div>

        <div className="text-bgWhite flex mob:flex-row flex-col items-center justify-between pt-[17px] border-t-[1px] border-gray3">
          <p className="mob:text-[12px] mx-auto text-[12px] leading-[130%] md:leading-[150%] md:mb-0 mb-5">
            {useLang("@2024 IE TurkmenExpo", "@2024 ИП ТуркменЭкспо")}
          </p>
          {/* <div className="flex items-center gap-x-[10px]">
              {icons.map((item) => (
                <Link key={v4()} href={item.link}>
                  <Image src={item.title} alt={item.title} />
                </Link>
              ))}
            </div> */}
        </div>
      </div>
    </footer>
  );
};
