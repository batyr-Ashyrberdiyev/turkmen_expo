'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import aboutImg from '@/public/assets/images/about.png';
import { aboutData } from '@/lib/database/about';
import { v4 } from 'uuid';
import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { baseAPI } from '@/lib/API';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';

const About = () => {
  const [aboutDatas, setAboutData] = useState<string>();
  const { activeLang } = useAppSelector(selectHeader);

  const fecthAboutData = async () => {
    try {
      const res = await fetch(
        `${baseAPI}settings/about_us?X-Localization=${activeLang.localization}`,
      );

      if (!res.ok) {
        throw new Error('Error');
      }

      const data = await res.json();

      setAboutData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthAboutData();
  }, []);

  console.log(aboutDatas);

  return (
    <LayoutWithSidebar second="Коротко о нас" title="Коротко о нас">
      {/* <Image src={aboutImg} width={1000} height={500} alt="about image" /> */}
      <div className="aboutus flex flex-col items-start gap-y-[24px] text-p">
        {aboutDatas ? (
          <div
            dangerouslySetInnerHTML={{
              __html: aboutDatas,
            }}
            className="text-[16px] leading-[150%]"
          />
        ) : null}
      </div>
    </LayoutWithSidebar>
  );
};

export default About;
