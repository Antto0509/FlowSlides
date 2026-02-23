'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient(cookies())

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect('/login?error=credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/create-carousel')
}

export async function signup(formData: FormData) {
  const supabase = await createClient(cookies())

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect('/login?error=signup')
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=check-email')
}

export async function loginWithGoogle() {
  const supabase = await createClient(cookies())

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  })

  if (error || !data.url) {
    redirect('/login?error=oauth')
  }

  redirect(data.url)
}

export async function logout() {
  const supabase = await createClient(cookies())
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}