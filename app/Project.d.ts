export interface Project {
  proid: string;
  proname: string;
  coordinator: string;
  managers: string | null;
  showlive: "T" | "F";
  chapterno: number | null;
  subsection: string | null;
  subsectiontitle: string;
  respagency: string | null;
  goals: string | null;
  description: string | null;
  tasks: string | null;
  products: string | null;
  beneficiaries: string | null;
  fundingnote: string | null;
  funding_details: string | null;
  lrpimages: string | null;
}

export interface Amendment extends Project {
  amendmentid: number;
}

type FundingDetails = {
  fy: number;
  total: number;
  highway: number | null;
  transit: number | null;
  comprehensive: number | null;
  other: number | null;
};

type LRPImages = {
  lrpImage1: string | null;
  lrpImage2: string | null;
  lrpImage3: string | null;
  lrpImage4: string | null;
  lrpImage5: string | null;
};
