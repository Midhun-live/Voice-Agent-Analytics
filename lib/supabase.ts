// import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase environment variables are missing")
// }

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseAnonKey
// )
import { createClient } from "@supabase/supabase-js"

console.log("SUPABASE URL =", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("SUPABASE KEY =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)
