// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import { ProjectTable, SkillTable } from './definitions';

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const skills: SkillTable[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81a1',
    name: 'React',
    icon_url: '@/public/icons/react.svg',
    level: 3
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4e2a6442a',
    name: 'TypeScript',
    icon_url: '@/public/icons/typescript.svg',
    level: 3
  },
  {
    id: '3958dc9e-712f-4377-85e9-efc4b6a6442a',
    name: '.Net',
    icon_url: '@/public/icons/react.svg',
    level: 3
  },
];

const projects: ProjectTable[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    title: 'Project 1',
    description: 'This is the first project',
    image_url: 'https://cdn2.thecatapi.com/images/gl.jpg',
    alt: 'cat image 1',
    type: 'web_development',
    skills: `${skills[0].id}, ${skills[1].id}`,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ab',
    title: 'Project 2',
    description: 'This is the second project',
    image_url: 'https://cdn2.thecatapi.com/images/282.png',
    alt: 'cat image 2',
    type: 'game',
    skills: `${skills[0].id}`,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ac',
    title: 'Project 3',
    description: 'This is the third project',
    image_url: 'https://cdn2.thecatapi.com/images/3dp.jpg',
    alt: 'cat image 3',
    type: 'ui_design',
    skills: `${skills[0].id}, ${skills[1].id}`,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ad',
    title: 'Project 4',
    description: 'This is the fourth project',
    image_url: 'https://cdn2.thecatapi.com/images/447.jpg',
    alt: 'cat image 4',
    type: 'web_development',
    skills: `${skills[0].id}`,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ae',
    title: 'Project 5',
    description: 'This is the fifth project',
    image_url: 'https://cdn2.thecatapi.com/images/6em.jpg',
    alt: 'cat image 5',
    type: 'web_development',
    skills: `${skills[1].id}`,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81af',
    title: 'Project 6',
    description: 'This is the sixth project',
    image_url: 'https://cdn2.thecatapi.com/images/8os.jpg',
    alt: 'cat image 6',
    type: 'game',
    skills: `${skills[0].id}, ${skills[1].id}`,
  },
];


export { users, customers, invoices, revenue, skills, projects };
