"use client";

import { FC, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { postContacts } from "@/services/contacts";

interface Props {
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Имя необходимо"),
  email: z.string().email("Email необходим"),
  phone: z.string().min(8, "Номер телефона необходим"),
  company: z.string().optional(),
  msg: z.string().min(5, "Сообщение необходимо"),
});

export type FormType = z.infer<typeof formSchema>;

export const ContactsForm: FC<Props> = ({ className }) => {
  const [status, setStatus] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      msg: "",
    },
  });

  async function onSubmit(data: FormType) {
    try {
      const res = await postContacts(data);

      reset();
      setStatus(res);
    } catch (error) {
      console.error("POST contact", error);
    }
  }

  return (
    <div className={clsx("bg-PRIMARY rounded-[8px] py-8 px-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="h2 !text-white text-3xl font-medium lg:mb-8 mb-6">
          Связаться с нами
        </h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col relative">
            <label htmlFor="name" className="label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className="input"
              {...register("name")}
            />
            <span className="error">{formState.errors.name?.message}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col relative">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                className="input"
                {...register("email")}
              />
              <span className="error">{formState.errors.email?.message}</span>
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="phone" className="label">
                Номер
              </label>
              <input
                type="text"
                id="phone"
                className="input"
                {...register("phone")}
              />
              <span className="error">{formState.errors.phone?.message}</span>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="company" className="label">
              Название компании
            </label>
            <input
              type="text"
              id="company"
              className="input"
              {...register("company")}
            />
            <span className="error">{formState.errors.company?.message}</span>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="msg" className="label">
              Сообщение
            </label>
            <textarea
              rows={3}
              id="msg"
              className="input !h-28 resize-none"
              {...register("msg")}
            />
            <span className="error">{formState.errors.msg?.message}</span>
          </div>
          <button
            disabled={formState.isSubmitting || status}
            className="bg-[#A4FFF3] text-sm text-ON_PRIMARY_CONTAINER h-10 rounded-[2px]"
          >
            {!status ? "Отправить" : "Форма отправлена"}
          </button>
        </div>
      </form>
    </div>
  );
};
