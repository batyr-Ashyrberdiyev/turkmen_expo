'use client';

import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import Loader from '@/components/ui/Loader';
import useFetch from '@/hooks/useFetch';
import { baseAPI } from '@/lib/API';
import { ServicesType } from '@/lib/types/Services.data';
import { useAppSelector } from '@/redux/hooks';
import { useLang } from '@/utils/useLang';
import { useEffect, useState } from 'react';

const Advertising = () => {
  const [servicesData, setData] = useState<ServicesType>();
  const lang = useAppSelector((state) => state.headerSlice.activeLang.localization);

  const fecthServicsData = async () => {
    try {
      const res = await fetch(`${baseAPI}services`, {
        headers: {
          'Accept-Language': lang,
        },
      });

      if (!res.ok) {
        throw new Error('Error');
      }

      const data = await res.json();

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthServicsData();
  }, [lang]);

  return servicesData ? (
    <LayoutWithSidebar
      title={servicesData?.data ? servicesData.data[1].title : ''}
      second={useLang('Services', 'Услуги', lang)}
      third={servicesData?.data ? servicesData.data[1].title : ''}>
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: servicesData?.data ? servicesData.data[1].content : '',
        }}
      />
    </LayoutWithSidebar>
  ) : (
    <Loader />
  );
};

export default Advertising;
