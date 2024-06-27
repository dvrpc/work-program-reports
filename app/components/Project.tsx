import SVG_1a from "~/images/1a.svg";
import SVG_1b from "~/images/1b.svg";
import SVG_1c from "~/images/1c.svg";
import SVG_1d from "~/images/1d.svg";
import SVG_1e from "~/images/1e.svg";
import SVG_2a from "~/images/2a.svg";
import SVG_2b from "~/images/2b.svg";
import SVG_2c from "~/images/2c.svg";
import SVG_2d from "~/images/2d.svg";
import SVG_2e from "~/images/2e.svg";
import SVG_3a from "~/images/3a.svg";
import SVG_3b from "~/images/3b.svg";
import SVG_3c from "~/images/3c.svg";
import SVG_3d from "~/images/3d.svg";
import SVG_3e from "~/images/3e.svg";
import SVG_4a from "~/images/4a.svg";
import SVG_4b from "~/images/4b.svg";
import SVG_4c from "~/images/4c.svg";
import SVG_4d from "~/images/4d.svg";
import SVG_4e from "~/images/4e.svg";
import type { Project, FundingDetails, LRPImages, Amendment } from "~/Project";
import { useAppContext } from "~/root";

const images: Record<string, string> = {
  "1a": SVG_1a,
  "1b": SVG_1b,
  "1c": SVG_1c,
  "1d": SVG_1d,
  "1e": SVG_1e,
  "2a": SVG_2a,
  "2b": SVG_2b,
  "2c": SVG_2c,
  "2d": SVG_2d,
  "2e": SVG_2e,
  "3a": SVG_3a,
  "3b": SVG_3b,
  "3c": SVG_3c,
  "3d": SVG_3d,
  "3e": SVG_3e,
  "4a": SVG_4a,
  "4b": SVG_4b,
  "4c": SVG_4c,
  "4d": SVG_4d,
  "4e": SVG_4e,
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ProjectView({
  project,
}: {
  project: Project | Amendment;
}) {
  const { year } = useAppContext();

  return (
    project && (
      <article>
        <table className="w-full">
          <tbody>
            <tr className="font-bold border-b-[3px] border-black">
              <th className="text-left pr-8 whitespace-nowrap w-1">
                PROJECT: {project.proid}
              </th>
              <th className="text-left">{project.proname}</th>
            </tr>
            <tr>
              <th className="text-left pr-8 whitespace-nowrap w-1">
                Responsible Agency:
              </th>
              <td>{project.respagency}</td>
            </tr>
            <tr>
              <th className="text-left pr-8 whitespace-nowrap w-1">
                Program Coordinator:
              </th>
              <td>{project.coordinator}</td>
            </tr>
            <tr>
              <th className="text-left pr-8 whitespace-nowrap w-1">
                Project Manager(s):
              </th>
              <td>{project.managers}</td>
            </tr>
            {project.lrpimages && (
              <tr>
                <th className="text-left pr-8 whitespace-nowrap w-1">
                  Supports LRP Goals:
                </th>
                <td>
                  <div className="inline-flex gap-1">
                    {Object.values(
                      (JSON.parse(project.lrpimages) as LRPImages[])[0]
                    ).map(
                      (image) =>
                        image && (
                          <img
                            width="21"
                            height="21"
                            src={images[image.split(".")[0]]}
                            alt={image.split(".")[0]}
                            key={image}
                          />
                        )
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <h3 className="my-2 font-bold underline">Goals:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.goals ?? "" }} />
        <h3 className="my-2 font-bold underline">Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.description ?? "" }} />
        <h3 className="my-2 font-bold underline">Tasks:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.tasks ?? "" }} />
        <h3 className="my-2 font-bold underline">Products:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.products ?? "" }} />
        <h3 className="my-2 font-bold underline">Beneficiaries:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: project.beneficiaries ?? "" }}
        />
        <h3 className="my-2 font-bold underline">Project Cost and Funding:</h3>
        <table className="w-full border-y-2 border-black">
          <thead>
            <tr className="border-y border-black">
              <th className="text-left pt-1">FY</th>
              <th className="pt-1">Total</th>
              <th className="pt-1">Highway PL Program</th>
              <th className="pt-1">Transit PL Program</th>
              <th className="pt-1">Comprehensive Planning</th>
              <th className="pt-1">Other</th>
            </tr>
          </thead>
          <tbody>
            {(JSON.parse(project.funding_details ?? "[]") as FundingDetails[])
              .sort((a, b) => a.fy - b.fy)
              .map((row) => (
                <tr
                  key={row.fy + row.total}
                  className={
                    project.highlightfund === "Funding Table Only" ||
                    project.highlightfund === "Both Funding Table and Notes"
                      ? "bg-yellow-500 border-y border-black"
                      : "border-y border-black"
                  }
                >
                  <td className="text-left pt-1">{row.fy}</td>
                  <td className="text-center pt-1">
                    {row.total && USDollar.format(+row.total)}
                  </td>
                  <td className="text-center pt-1">
                    {row.highway && USDollar.format(+row.highway)}
                  </td>
                  <td className="text-center pt-1">
                    {row.transit && USDollar.format(+row.transit)}
                  </td>
                  <td className="text-center pt-1">
                    {row.comprehensive && USDollar.format(+row.comprehensive)}
                  </td>
                  <td className="text-center pt-1">
                    {row.other && USDollar.format(+row.other)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {project.fundingnote && (
          <>
            <p>{year} Other Funding Details:</p>
            <p
              dangerouslySetInnerHTML={{ __html: project.fundingnote }}
              className={
                project.highlightfund === "Funding Notes Only" ||
                project.highlightfund === "Both Funding Table and Notes"
                  ? "bg-yellow-500"
                  : ""
              }
            />
          </>
        )}
      </article>
    )
  );
}
