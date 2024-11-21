import { fetchProjectsByPortfolioCategory } from "./data";

export type UUID = string;

export interface FormFields {
  [key: string]: FormDataEntryValue | string[];
}

export const PortfolioCategoryId = {
  web_development: 'web_development',
  ui_design: 'ui_design',
  games: 'games',
}

export type PortfolioCategoryKeys = keyof typeof PortfolioCategoryId;

export type Project = {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  alt: string;
  type: PortfolioCategoryKeys;
  skills: Skill[];
};

export type ProjectTable = Omit<Project, 'skills'> & {
  skills: UUID[];
};

class PortfolioCategory {
  id: string;
  value: number;
  title: string;
  description: string;
  page: number;
  projects?: Project[];

  constructor(id: string, value: number, title: string, description: string, page: number, projects: Project[] = []) {
    this.id = id;
    this.value = value;
    this.title = title;
    this.description = description;
    this.page = page;
    this.projects = projects;
  }

  async GetProjects () {
    try {
      const projects = await fetchProjectsByPortfolioCategory(this.id, 1);
      return projects;
  
    } catch(error) {
      console.log(`Error fetching projects for ${this.title} Web Development category`, error);
      throw error;
    }
  }
}

class WebDevelopmentCategory extends PortfolioCategory {
  constructor(page: number = 1) {
    super(
        PortfolioCategoryId.web_development,
        Object.keys(PortfolioCategoryId).indexOf(PortfolioCategoryId.web_development),
        "Web Development",
        "Check out some of the web development projects I've worked on, each one focused on clean, responsive design and a smooth user experience. Click on any project to dive deeper, learn more about the process, and even review the code on GitHub.",
        page
    );
  }
}

class UIDesignCategory extends PortfolioCategory {
  constructor(page: number = 1) {
    super(
      PortfolioCategoryId.ui_design,
      Object.keys(PortfolioCategoryId).indexOf(PortfolioCategoryId.ui_design),
      "UI Designs",
      "Designs I have worked on",
      page
    )
  }
}

class GamesCategory extends PortfolioCategory {
  constructor(page: number = 1) {
    super(
      PortfolioCategoryId.games,
      Object.keys(PortfolioCategoryId).indexOf(PortfolioCategoryId.games),
      "Games",
      "Games I have worked on",
      page
    )
  }
}

export const portfolioPanelData: PortfolioCategory[] = [
  new WebDevelopmentCategory(),
  new UIDesignCategory(),
  new GamesCategory(),
];

export type PortfolioPanel = {
  id: string;
  value: number;
  title: string;
  description: string;
  projects?: Project[];
};

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
  status: "pending" | "paid";
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
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
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
  status: "pending" | "paid";
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
  status: "pending" | "paid";
};

export const SkillLevel = [1, 2, 3, 4, 5];

export type Skill = {
  id: string;
  name: string;
  icon_url: string;
  level: 1 | 2 | 3 | 4 | 5;
};
