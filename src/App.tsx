import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MonthlyReport, { MonthlyReportLoader } from "./routes/monthlyreport";
import ProjectRoute, { ProjectRouteLoader } from "./routes/project";
import Root from "./routes/root";
import ChapterRoute, { ChapterLoader } from "./routes/chapter";
import TocRoute from "./routes/toc";

const router = createBrowserRouter([
  {
    path: "/wp-reports",
    element: <Root />,
    children: [
      {
        path: ":yr/project/:proid",
        element: <ProjectRoute />,
        loader: ProjectRouteLoader,
      },
      {
        path: ":yr/monthlyreports",
        element: <MonthlyReport />,
        loader: MonthlyReportLoader,
      },
      {
        path: ":yr/chapter",
        element: <ChapterRoute />,
        loader: ChapterLoader,
      },
      {
        path: "toc",
        element: <TocRoute />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
