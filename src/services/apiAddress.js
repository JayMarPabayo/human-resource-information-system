import supabase from "./supabase";

export async function getRegions() {
  let { data: refRegion, error } = await supabase.from("refRegion").select("*");
  if (error) {
    console.error(error);
    throw new error("fetching regions records failed");
  }

  return refRegion;
}

export async function getProvinces(region) {
  let { data: refProvince, error } = await supabase
    .from("refProvince")
    .select("*")
    .eq("regCode", region);

  if (error) {
    console.error(error);
    throw new error("fetching regions records failed");
  }

  return refProvince;
}
