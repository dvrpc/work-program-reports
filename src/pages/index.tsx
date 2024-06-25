import * as React from "react";
import { Link, graphql, type HeadFC, type PageProps } from "gatsby";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import type { Amendment, Project } from "../Project";

type ProjectType = Project & Queries.IndexPageQuery["allProjects"]["nodes"];
type AmendmentType = Amendment &
  Queries.IndexPageQuery["allAmendments"]["nodes"];

function useLocalStorage<T>(
  key: string,
  initialState: T
): [T, (value: T) => void] {
  const [state, setState] = React.useState<T>(initialState);

  React.useEffect(() => {
    const value = localStorage.getItem(key);
    if (!value) return;
    setState(JSON.parse(value) as T);
  }, [key]);

  const returnedSetState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, returnedSetState];
}

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const [search, setSearch] = useLocalStorage<string>("search", "");
  const [live, setLive] = useLocalStorage<string[]>("live", ["T", "F"]);
  const [chapterno, setChapterno] = useLocalStorage<number[]>(
    "chapterno",
    [-1, 2, 3, 4, 5]
  );
  const [subsection, setSubsection] = useLocalStorage<string[]>("subsection", [
    "",
    "A",
    "B",
  ]);

  const getFilters = (node: ProjectType | AmendmentType) => {
    const results: boolean[] = [];
    if (search) {
      results.push(
        node.proname.toLowerCase().includes(search.toLowerCase()) ||
          node.proid.toLowerCase().includes(search.toLowerCase())
      );
    }
    results.push(live.includes(node.showlive));
    if (node.chapterno) results.push(chapterno.includes(node.chapterno));
    if (node.subsection) results.push(subsection.includes(node.subsection));
    return results.every((result) => result);
  };

  return (
    <main className="w-full">
      <nav className="flex flex-wrap justify-between gap-4 mb-8 border-b border-black pb-8 px-4 bg-gray-100">
        <div className="w-full">
          <label htmlFor="search">Search {search}</label>
          <div className="shadow-inner rounded-md bg-white">
            <input
              className="focus:shadow-[0_0_0_3px_#BFDEFF] focus:outline-0 bg-transparent px-1 w-full border rounded-md h-8 border-gray-300"
              role="search"
              type="search"
              placeholder="Search"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              id="search"
            />
          </div>
        </div>
        <div>
          <label htmlFor="live">Live</label>
          <Multiselect
            defaultValue={["T", "F"]}
            value={live}
            onChange={(values) => setLive(values.map((item) => item.id))}
            dataKey="id"
            textField="name"
            data={[
              { id: "T", name: "True" },
              { id: "F", name: "False" },
            ]}
            id="live"
          />
        </div>
        <div>
          <label htmlFor="chapter">Chapter</label>
          <Multiselect
            defaultValue={[-1, 2, 3, 4, 5]}
            value={chapterno}
            onChange={(values) => setChapterno(values)}
            data={[-1, 2, 3, 4, 5]}
            id="chapter"
          />
        </div>
        <div>
          <label htmlFor="section">Section</label>
          <Multiselect
            defaultValue={["", "A", "B"]}
            value={subsection}
            onChange={(values) => setSubsection(values)}
            data={["", "A", "B"]}
            id="section"
          />
        </div>
        <div>
          <button className="rounded-md text-white bg-blue-500 py-2 px-4 border border-blue-700 shadow-inset hover:bg-blue-600">
            Download TOC
          </button>
        </div>
      </nav>
      <ul className="px-4 pb-4">
        {[
          ...(data.allAmendments.nodes as AmendmentType[]),
          ...(data.allProjects.nodes as ProjectType[]),
        ]
          .filter(getFilters)
          .map((node) => (
            <li key={node.proid}>
              <Link to={`/project/${node.proid}`}>
                {node.proid}: {node.proname}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query IndexPage {
    allProjects(sort: { proid: ASC }) {
      nodes {
        proid
        proname
        showlive
        chapterno
        subsection
      }
    }
    allAmendments(sort: { proid: ASC }) {
      nodes {
        amendmentid
        proid
        proname
      }
    }
  }
`;
