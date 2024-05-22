import supabase from "./supabase";

export async function getDepartments() {
  let { data, error } = await supabase
    .from("departments")
    .select(`*`)
    .order("departmentName", { ascending: true });

  if (error) {
    console.error(error);
    throw new error("fetching employees records failed");
  }

  return data;
}

export async function createUpdateDepartment(department, id) {
  // -- Check if the department already exists
  let query = supabase.from("departments");

  if (!id) {
    let { data: existingDepartments, error: checkError } = await supabase
      .from("departments")
      .select("id")
      .eq("departmentName", department.departmentName);

    if (checkError) {
      console.error(checkError);
      throw new Error("checking department existence failed");
    }

    if (existingDepartments.length > 0) {
      throw new Error("department already exists");
    }
    query = query.insert([department]);
  }

  if (id) {
    let { data: existingDepartments, error: checkError } = await supabase
      .from("departments")
      .select("id")
      .eq("departmentName", department.departmentName)
      .neq("id", id);

    if (checkError) {
      console.error(checkError);
      throw new Error("checking department existence failed");
    }

    if (existingDepartments.length > 0) {
      throw new Error("Department already exists");
    }
    query = query.update(department).eq("id", id);
  }

  // -- Insert the new department
  let { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("creating/updating department record failed");
  }

  return data;
}

export async function deleteDepartment(id) {
  const { data, error } = await supabase
    .from("departments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new error("deleting department record failed");
  }

  return data;
}

export async function getUniqueDepartments() {
  const { data, error } = await supabase
    .from("uniquedepartments")
    .select(`departmentname`);

  if (error) {
    console.error(error);
    throw new Error("Fetching unique employee departments failed");
  }

  return data;
}

export async function getUniqueDesignations(department) {
  let query = supabase.from("uniquedesignations").select(`employeeDesignation`);

  if (department) query = query.eq("departmentname", department);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Fetching unique employee designations failed");
  }

  return data;
}
