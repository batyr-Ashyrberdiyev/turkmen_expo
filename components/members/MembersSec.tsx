"use client";

import React from "react";
import Image from "next/image";

import membersImg from "@/public/assets/images/members.png";
import { aboutMembers } from "@/lib/database/members";
import { v4 } from "uuid";
import { LayoutWithSidebar } from "../page/layout-with-sidebar";

export const MembersSec = () => {
  return (
    <div className="flex flex-col">
      <LayoutWithSidebar
        title="Информация для участников"
        second="Информация для участников"
        path="/members"
      >
        <p className="text-p">
          В распоряжении компании имеются возможности размещения и застройки
          полностью оборудованных павильонов общей площадью 1200 кв.м. которые
          соответствуют современным стандартам. В помещении имеются все
          необходимые коммуникации для реализации проектов любого характера.
          Конгрессы, конференции и другие мероприятия проводятся в специально
          подготовленных залах.
        </p>
        <Image src={membersImg} width={1000} height={500} alt="members" />
        {aboutMembers.map((item) => (
          <div className="flex flex-col items-start gap-y-[24px] text-p">
            <p>{item.text}</p>
            <ol className="list-disc ml-[20px]">
              {item.list.map((text) => (
                <li key={v4()}>{text}</li>
              ))}
            </ol>
            <p>{item.text2}</p>
          </div>
        ))}
      </LayoutWithSidebar>
    </div>
  );
};
