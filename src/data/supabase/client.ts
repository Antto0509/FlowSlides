import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseKey } from "@/lib/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export const createClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient(
      supabaseUrl!,
      supabaseKey!,
    );
  }
  return browserClient;
};