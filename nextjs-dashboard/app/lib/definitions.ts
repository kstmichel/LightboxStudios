// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

// import { string } from "zod";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type UUID = string;

export const PortfolioTabs: { [key: string]: number } = {
  web_development: 0,
  ui_design: 1,
  game: 2,
};

export const portfolioPanels: PortfolioPanel[] = [
  {
      id: 'web_development',
      value: PortfolioTabs.web_development,
      title: 'Web Development',
      description: 'Projects I have worked on',
      projects: []
  },
  {
      id: 'ui_design',
      value: PortfolioTabs.ui_design,
      title: 'UI Designs',
      description: 'Designs I have worked on',
      projects: []
  },
  {
      id: 'games', 
      value: PortfolioTabs.game, 
      title: 'Games',
      description: 'Games I have worked on',
      projects: []
  }
]

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type PortfolioPanel = {
    id: string;  
    value: number;
    title: string;
    description: string;
    projects: Project[];
}

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const SkillLevel = [1, 2, 3, 4, 5];

export type Skill = {
  id: string;
  name: string;
  icon_url: string;
  level: 1 | 2 | 3 | 4 | 5;
}

// export type SkillTable = {
//   id: string;
//   name: string;
//   icon_url: string;
//   level: number;
// }

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt: string;
  type: 'web_development' | 'game' | 'ui_design'
  skills: Skill[];
};

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt: string;
  type: "web_development" | "game" | "ui_design";
  skills: UUID[];
};
