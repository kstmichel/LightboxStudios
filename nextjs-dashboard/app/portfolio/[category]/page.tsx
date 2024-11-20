'use server';
import React from 'react';
import Portfolio from '@/app/ui/portfolio/portfolio';
import {
  //  fetchProjectsByPortfolioCategory, 
   fetchSkills 
} from '@/app/lib/data';
import { 
  PortfolioCategoryKeys, 
  PortfolioCategoryId, 
  // Project 
} from '@/app/lib/definitions';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as PortfolioCategoryKeys;
  const initialCategory: PortfolioCategoryKeys = category || PortfolioCategoryId.web_development;
  const page = 1;
  const skillsLibrary = await fetchSkills();

  return (
    <>
      <Portfolio 
        category={initialCategory} 
        page={page} 
        skillsLibrary={skillsLibrary} 
      />
    </>
  );
}
