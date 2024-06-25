import React from "react";
import { PageProps, graphql } from "gatsby";
import Project from "@components/Project";
import type { Amendment as AmendmentType } from "src/Project";
import refreshIcon from "@images/refresh.svg";
import downloadIcon from "@images/download.svg";

export const AmendmentPage: React.FC<PageProps<Queries.AmendmentPageQuery>> = ({
  data: { amendments, site },
  location,
}) => {
  if (amendments === null) return null;
  const [amendment, setAmendment] =
    React.useState<NonNullable<Queries.AmendmentPageQuery["amendments"]>>(
      amendments
    );
  const [loading, setLoading] = React.useState<boolean | null>(null);

  const downloadData = async (amendmentId: number) => {
    setLoading(true);
    const data = await fetch(
      `https://apps.dvrpc.org/ords/workprogram25new/workprogram/draftamendment?amendmentid=${amendmentId}`
    );
    const json = await data.json();
    setAmendment(json.items[0]);
    setLoading(false);
  };
  const article = <Project projects={amendment as AmendmentType} site={site} />;
  if (loading === null) downloadData(amendments.amendmentid!);
  React.useEffect(() => setLoading(false), []);

  return (
    <div className="bg-gray-100 flex flex-col items-center print:bg-transparent">
      <div className="relative">
        <div className="print:hidden max-w-[950px] w-full fixed bottom-12 flex flex-col gap-8 items-end">
          <button
            className="block p-0 m-0 rounded-full h-16 w-16 text-center text-white bg-gray-400 hover:bg-gray-500 shadow-material"
            onClick={() => downloadData(amendments.amendmentid!)}
          >
            <img
              src={refreshIcon}
              alt="Refresh"
              width="32"
              height="32"
              className={
                loading
                  ? "inline align-middle animate-spin"
                  : "inline align-middle"
              }
              title="Refresh Content"
            />
          </button>
          <a
            className="block rounded-full h-16 w-16 text-center text-white bg-blue-700 hover:bg-blue-800 shadow-material"
            href={`${location.pathname.slice(0, -1)}.pdf`}
          >
            <img
              src={downloadIcon}
              alt="Download"
              width="32"
              height="32"
              className="inline align-middle pt-4"
              title="Download PDF"
            />
          </a>
        </div>
        <div className="max-w-[950px] w-full m-8 border-2 p-16 bg-white shadow-md print:max-w-full print:p-0 print:m-0 print:border-0 print:shadow-none">
          {article}
        </div>
      </div>
    </div>
  );
};

export default AmendmentPage;

export const query = graphql`
  query AmendmentPage($id: String!) {
    amendments(id: { eq: $id }) {
      amendmentid
      proid
      proname
      respagency
      coordinator
      managers
      goals
      description
      tasks
      products
      beneficiaries
      fundingnote
      funding_details
      lrpimages
    }
    site {
      siteMetadata {
        year
      }
    }
  }
`;
