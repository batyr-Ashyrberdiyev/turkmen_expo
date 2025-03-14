"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { PartnersType } from "@/lib/types/PartnersData.type";
import { baseAPI } from "@/lib/API";
import { useLang } from "@/utils/useLang";
import { Title } from "../ui/title";

export const Partners = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const [partnersData, setPartnersData] = useState<PartnersType>();

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${baseAPI}partners`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      const data = await res.json();

      setPartnersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [activeLang.localization]);

  return (
    <section className="container">
      <div className="mb-[40px]">
        <Title
          text={useLang("Partners", "Партнёры", activeLang.localization)}
        />
      </div>

      <div className="flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7000}
          breakpoints={{
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 4.5 },
            630: { slidesPerView: 3.5 },
            300: { slidesPerView: 2 },
          }}
        >
          {partnersData &&
            partnersData.data.map((logo, i) => (
              <SwiperSlide key={i} className="h-[63px] w-fit overflow-hidden">
                <a href={logo.link} target="_blank">
                  <Image
                    height={200}
                    width={200}
                    src={logo.images[0].path}
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
