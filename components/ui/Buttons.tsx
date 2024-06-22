'use client';

import React from 'react';
import clsx from 'clsx';

interface GreenBtnProps {
  text: string | boolean;
  mt?: string;
  onEventBtn?: () => void;
  border?: boolean;
  px?: boolean;
}

export const GreenBtn = ({ text, mt, onEventBtn, px }: GreenBtnProps) => {
  return (
    <button
      onClick={onEventBtn}
      className={clsx(
        `${mt}  py-[17px] text-[14px] greenBtnShadow rounded-sm bg-green text-bgWhite hover:bg-lightGreen font-medium transition-all`,
        {
          'px-[43px]': !px,
          'px-[70px]': px,
        },
      )}>
      {text}
    </button>
  );
};

interface BorderProps {
  onEventBtn?: () => void;
  text: string;
  mt?: string;
  px?: boolean;
}

export const BorderBtn = ({ onEventBtn, text, mt, px }: BorderProps) => {
  return (
    <button
      className={clsx(`mt-[${mt}] border-btn py-[17px]`, {
        'px-[43px]': px,
        'px-[17px]': !px,
      })}
      onClick={onEventBtn}>
      {text}
    </button>
  );
};

interface MobBtnProps {
  text: string;
}

export const GreenBtnMob = ({ text }: MobBtnProps) => {
  return (
    <button
      type="button"
      className="p-3 rounded-sm bg-green w-[140px] mx-auto cursor-pointer hover:bg-lightGreen transition-all">
      {text}
    </button>
  );
};

export const SimpleGreenBtn = ({ text }: MobBtnProps) => {
  return (
    <button
      type="button"
      className="bg-green py-[17px] px-[70px] leading-[100%] rounded-sm hover:bg-lightGreen transition-all">
      {text}
    </button>
  );
};
