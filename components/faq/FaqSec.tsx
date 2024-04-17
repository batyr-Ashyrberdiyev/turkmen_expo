"use client";

import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Radio } from "../ui/Radio";
import { selectFaq, setFaqTitle } from "@/redux/slices/faqSlice";
import { Title } from "../home/Title";
import { baseAPI } from "@/lib/API";
import { selectHeader } from "@/redux/slices/headerSlice";
import { FaqDataType, RadioDataType } from "@/lib/types/FaqData.type";
import { Select } from "./Select";
import { BreadCrumbs } from "../ui/BreadCrumbs";
import { AnimatePresence } from "framer-motion";

export const radio = [
  { name: "Все", id: "all" },
  { name: "Посетителям", id: "visitors" },
  { name: "Участникам", id: "members" },
];

export const FaqSec = () => {
  const [faqData, setFaqData] = useState<FaqDataType>();

  const [currentRadio, setCurrentRadio] = useState(0);
  const [radioData, setRadioData] = useState<RadioDataType>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchFaqRadio = async () => {
    try {
      const res = await fetch(
        `${baseAPI}faq-user-groups?X-Localization=${activeLang.localization}&`
      );

      const data = await res.json();

      setRadioData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFaq = async () => {
    try {
      const res = await fetch(
        `${baseAPI}faq-headers?X-Localization=${activeLang.localization}${
          currentRadio !== 0 ? `&faq_user_group_id=${currentRadio}` : ""
        }`
      );

      const data = await res.json();

      setFaqData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaq();
    fetchFaqRadio();
    setOpenTitles([]);
  }, [currentRadio, activeLang]);

  const dispatch = useAppDispatch();
  const { faqTitle } = useAppSelector(selectFaq);

  const changeRadio = (id: number) => {
    setCurrentRadio(id);
  };

  const [openTitles, setOpenTitles] = useState<string[]>([]);

  const onTitle = (name: string) => {
    if (openTitles.includes(name)) {
      setOpenTitles(openTitles.filter((item) => item !== name));
    } else {
      setOpenTitles((prev) => [...prev, name]);
    }
  };

  return (
    <div className="container flex flex-col items-start pt-[20px] section-mb">
      <BreadCrumbs second="FAQ" />
      <Title text="«Вопросы-ответы»" />
      <div className="flex items-center sm:mt-6 mt-10 sm:gap-[20px] gap-10 mb-[48px]">
        <AnimatePresence>
          <Radio
            nofilter
            id={currentRadio}
            active={currentRadio === 0}
            changeRadio={changeRadio}
            text={"Все"}
          />
        </AnimatePresence>
        {radioData?.data.map((item) => (
          <div key={v4()}>
            <Radio
              id={item.id}
              active={currentRadio === item.id}
              changeRadio={changeRadio}
              text={item.name}
            />
          </div>
        ))}
      </div>
      {faqData
        ? faqData.data.map((obj) => (
            <Select
              key={v4()}
              {...obj}
              faqItems={obj.faq_items}
              openTitles={openTitles}
              onTitle={onTitle}
            />
          ))
        : null}
    </div>
  );
};
