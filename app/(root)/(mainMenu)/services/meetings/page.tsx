import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { baseAPI } from "@/lib/API";
import { ServicesType } from "@/lib/types/Services.data";
import { getServices } from "@/services/services";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const data = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[9].title : ""}
      third={data?.data ? data.data[9].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[9].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
