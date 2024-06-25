import * as React from "react";
import Project from "~/components/Project";
import type { Amendment as AmendmentType } from "~/Project";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import FAB from "~/components/FAB";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params.amendmentid, params);
  const data = await fetch(
    `https://apps.dvrpc.org/ords/workprogram25new/workprogram/draftamendment?amendmentID=${params.amendmentid}`
  );
  const json = await data.json();
  console.log(JSON.stringify(json, undefined, 2));
  return json.items[0];
}

export default function Amendment() {
  const amendment = useLoaderData<typeof loader>();
  if (amendment === null) return null;

  const article = <Project project={amendment as AmendmentType} />;

  return (
    <div className="bg-gray-100 flex flex-col items-center print:bg-transparent">
      <div className="relative">
        <FAB />
        <div className="max-w-[950px] w-full m-8 border-2 p-16 bg-white shadow-md print:max-w-full print:p-0 print:m-0 print:border-0 print:shadow-none">
          {article}
        </div>
      </div>
    </div>
  );
}
