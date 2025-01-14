'use client';

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  nofilter?: boolean;
  text: string;
  id: number;
  active?: boolean;
  changeRadio: (id: number) => void;
}

export const Radio = ({ nofilter = false, text, id, active = false, changeRadio }: Props) => {
  return (
    <div
      className="flex items-center gap-[10px] cursor-pointer"
      onClick={() => changeRadio(nofilter ? 0 : id)}>
      <div className="p-[3px] rounded-full w-[16px] h-[16px] border-[1px] border-OUTLINE cursor-pointer">
        {active && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={
              active
                ? {
                    scale: 1,
                  }
                : {}
            }
            transition={{ duration: 0.1 }}
            className={clsx('scale-0 transition-all bg-green h-full w-full rounded-full')}
          />
        )}
      </div>
      <div className="mob:text-[13px] mob:leading-[125%] text-[12px] leading-[100%]">{text}</div>
    </div>
  );
};
