import supabase from "./supabase";

export async function getDepartments() {
  let { data, error } = await supabase.from("departments").select(`*`);

  if (error) {
    console.error(error);
    throw new error("fetching employees records failed");
  }

  return data;
}
