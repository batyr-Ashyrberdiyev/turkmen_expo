import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getAbout } from "@/services/about";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang;
  const data = await getAbout(lang);

  const aboutText = lang === "en" ? "About us" : "Коротко о нас";

  return (
    <LayoutWithSidebar second={aboutText} title={aboutText}>
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
        className="text-[16px] aboutus  text-p flex flex-col items-start gap-6 leading-[150%] pb-10"
      />
    </LayoutWithSidebar>
  );
}
