import supabase from "./supabase";

export async function getEmployees({ searchKey = "" }) {
  const searchPattern = `%${searchKey}%`;
  let { data, error } = await supabase
    .from("employees")
    .select("*")
    .or(
      `employeeFirstName.ilike.${searchPattern},employeeMiddleName.ilike.${searchPattern},employeeLastName.ilike.${searchPattern}`
    );

  if (error) {
    console.error(error);
    throw new error("fetching employees records failed");
  }

  return data;
}

export async function createUpdateEmployee(employee, id) {
  const employeesWithNull = convertEmptyStringsToNull(employee);

  let query = supabase.from("employees");

  if (!id) {
    query = query.insert([employeesWithNull]);
  }

  if (id) {
    query = query.update(employee).eq("id", id);
  }

  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new error("creating employee record failed");
  }

  return data;
}

export async function deleteEmployee(id) {
  const { data, error } = await supabase
    .from("employees")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new error("deleting employee record failed");
  }

  return data;
}

function convertEmptyStringsToNull(obj) {
  const transformedObj = { ...obj };

  for (const key in transformedObj) {
    if (
      typeof transformedObj[key] === "string" &&
      transformedObj[key].trim() === ""
    ) {
      transformedObj[key] = null;
    }
  }

  return transformedObj;
}
