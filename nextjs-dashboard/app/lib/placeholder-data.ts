// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import { ProjectTable, Skill } from "./definitions";

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const skills: Skill[] = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81a1",
    name: "React",
    icon_url: "@/public/icons/react.svg",
    level: 3,
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4e2a6442a",
    name: "TypeScript",
    icon_url: "@/public/icons/typescript.svg",
    level: 3,
  },
  {
    id: "3958dc9e-712f-4377-85e9-efc4b6a6442a",
    name: ".Net",
    icon_url: "@/public/icons/react.svg",
    level: 3,
  },
];

const projects: ProjectTable[] = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    title: "Project 1",
    description: "This is the first project",
    image_url: "https://cdn2.thecatapi.com/images/gl.jpg",
    alt: "cat image 1",
    type: "web_development",
    skills: [skills[0].id, skills[1].id],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ab",
    title: "Project 2",
    description: "This is the second project",
    image_url: "https://cdn2.thecatapi.com/images/282.png",
    alt: "cat image 2",
    type: "games",
    skills: [skills[0].id, skills[1].id],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ac",
    title: "Project 3",
    description: "This is the third project",
    image_url: "https://cdn2.thecatapi.com/images/3dp.jpg",
    alt: "cat image 3",
    type: "ui_design",
    skills: [skills[0].id, skills[1].id],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ad",
    title: "Project 4",
    description: "This is the fourth project",
    image_url: "https://cdn2.thecatapi.com/images/447.jpg",
    alt: "cat image 4",
    type: "web_development",
    skills: [skills[0].id, skills[1].id],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ae",
    title: "Project 5",
    description: "This is the fifth project",
    image_url: "https://cdn2.thecatapi.com/images/6em.jpg",
    alt: "cat image 5",
    type: "web_development",
    skills: [skills[0].id, skills[1].id],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81af",
    title: "Project 6",
    description: "This is the sixth project",
    image_url: "https://cdn2.thecatapi.com/images/8os.jpg",
    alt: "cat image 6",
    type: "games",
    skills: [skills[0].id, skills[1].id],
  },
];

export { users, skills, projects };
