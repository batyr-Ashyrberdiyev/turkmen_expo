'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import ru from '@/public/assets/icons/header/ru.svg';
import en from '@/public/assets/icons/header/en.svg';
import tm from '@/public/assets/icons/header/tm.svg';
import arrow from '@/public/assets/icons/header/burger-arrow.svg';

import { burgerMenuData } from '@/lib/database/pathnames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BurgerDrop } from './BurgerDrop';
import {
  selectBurger,
  setBurgerDrop,
  setBurgerMenu,
  setFooterDrop,
} from '@/redux/slices/burgerSlice';

export const flags = [
  { name: 'Tm', flag: tm, id: 'tm' },
  { name: 'Ру', flag: ru, id: 'ru' },
  { name: 'En', flag: en, id: 'en' },
];

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const { burgerDrop, footerDrop } = useAppSelector(selectBurger);

  const [headerDrop, setHeaderDrop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const main = document.querySelector('.main');
  const wrapper = document.querySelector('.wrapper');

  const onBurgerDrop = (name: string, status: boolean, header: boolean) => {
    dispatch(header ? setBurgerDrop(name) : setFooterDrop(name));
    dispatch(header ? setFooterDrop('') : setBurgerDrop(''));

    if (status) {
      dispatch(setBurgerMenu(false));
    }
  };

  useEffect(() => {
    main?.classList.add('overflow-hidden');
    wrapper?.classList.add('overflow-hidden');
    dispatch(setBurgerDrop(''));
    dispatch(setFooterDrop(''));

    return () => {
      main?.classList.remove('overflow-hidden');
      wrapper?.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.3,
        ease: 'circOut',
      }}
      exit={{
        x: '100%',
      }}
      className="bg-green overflow-auto fixed w-full z-[900] top-[74px] bottom-0 left-0 min-h-[100vh] h-full px-4 py-10 flex flex-col gap-10 overflow-y-auto">
      <div className="flex flex-col gap-5">
        {burgerMenuData
          .filter((obj) => obj.first)
          .map(
            (item) =>
              !headerDrop && (
                <motion.div key={v4()}>
                  {item.only ? (
                    <Link
                      onClick={() => {
                        onBurgerDrop(item.pathname, true, true);
                      }}
                      href={item.pathname}
                      className="cursor-pointer flex items-center justify-between">
                      <p className="text-[18px] leading-[135%]">{item.title}</p>
                      {!item.only && <Image src={arrow} alt="стрелка" width={20} height={20} />}
                    </Link>
                  ) : (
                    !burgerDrop.includes(item.title) && (
                      <motion.div
                        onClick={() => {
                          dispatch(setBurgerDrop(item.pathname));
                          setHeaderDrop(true);
                        }}
                        className="cursor-pointer flex items-center justify-between">
                        <h3 className="text-[18px] leading-[135%]">{item.title}</h3>
                        {!item.only && <Image src={arrow} alt="стрелка" width={20} height={20} />}
                      </motion.div>
                    )
                  )}
                </motion.div>
              ),
          )}
        {burgerDrop && <BurgerDrop setDrop={setHeaderDrop} filter={burgerDrop} />}
      </div>

      <hr className="border-bgWhite" />

      <div className="flex flex-col gap-5">
        {burgerMenuData
          .filter((obj) => !obj.first)
          .map(
            (item) =>
              !bottom && (
                <div key={v4()}>
                  {item.only ? (
                    <Link
                      onClick={() => onBurgerDrop(item.pathname, true, false)}
                      key={v4()}
                      className="cursor-pointer flex items-center justify-between"
                      href={item.pathname}>
                      <p className="leading-[140%]">{item.title}</p>
                      {!item.only && <Image src={arrow} alt="стрелка" width={20} height={20} />}
                    </Link>
                  ) : (
                    !footerDrop.includes(item.title) && (
                      <div
                        onClick={() => {
                          dispatch(setFooterDrop(item.pathname));
                          setBottom(true);
                        }}
                        className="cursor-pointer flex items-center justify-between">
                        <h3 className="text-[14px] leading-[140%]">{item.title}</h3>
                        {!item.only && <Image src={arrow} alt="стрелка" width={20} height={20} />}
                      </div>
                    )
                  )}
                </div>
              ),
          )}
        {footerDrop && <BurgerDrop setDrop={setBottom} filter={footerDrop} />}
      </div>

      <div className="flex mx-auto items-center gap-10 mb-[60px]">
        {flags.map((item) => (
          <div key={v4()} className="flex items-center gap-[10px] cursor-pointer">
            <p className="leading-[140%]">{item.name}</p>
            <Image src={item.flag} alt="флаг" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
