import { createContext, ReactNode, useState } from "react";

export interface TocEntry {
  id: string;
  title: string;
  pageNumber: number;
  level: number;
}

interface TocContextProps {
  tableOfContents: TocEntry[];
  addToTableOfContents: (entry: TocEntry) => void;
}

export const TableOfContentsContext = createContext<TocContextProps>(
  null as unknown as TocContextProps,
);

export const TableOfContentsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tableOfContents, setTableOfContents] = useState<TocEntry[]>([]);

  const addToTableOfContents = (entry: TocEntry) => {
    setTableOfContents((prevState) => {
      const entryExists = prevState.some(
        ({ id, title }) => id === entry.id && title === entry.title,
      );
      return entryExists ? prevState : [...prevState, entry];
    });
  };

  return (
    <TableOfContentsContext.Provider
      value={{ tableOfContents, addToTableOfContents }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
