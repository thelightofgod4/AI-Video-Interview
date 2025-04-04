'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = auth();
  
  if (!userId) {
    return redirect('/sign-in');
  }

  return redirect('/dashboard');
} 
