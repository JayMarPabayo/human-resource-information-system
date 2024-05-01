import supabase from "./supabase";

export async function getEmployees({ searchKey = "" }) {
  const searchPattern = `%${searchKey}%`;
  let { data, error } = await supabase
    .from("employees")
    .select(`*, departments(*), children(*)`)
    .order("employeeFirstName", { ascending: true })
    .or(
      `employeeFirstName.ilike.${searchPattern},employeeMiddleName.ilike.${searchPattern},employeeLastName.ilike.${searchPattern},employeeDesignation.ilike.${searchPattern}`
    );

  if (error) {
    console.error(error);
    throw new error("fetching employees records failed");
  }

  return data;
}

export async function createUpdateEmployee(employee, id) {
  const { children, ...employeeWithoutChildren } = employee;
  const employeesWithNull = convertEmptyStringsToNull(employeeWithoutChildren);
  let query = supabase.from("employees");

  if (!id) {
    query = query.insert([employeesWithNull]);
  }

  if (id) {
    query = query.update(employeesWithNull).eq("id", id);
  }

  console.log(children);
  const { data, error } = await query.select();
  // -- Children
  const eid = data[0].id;
  if (eid) {
    await deleteChildren(eid);
  }

  if (children && Array.isArray(children)) {
    for (const child of children) {
      const { childrenFullName, childrenGender, childrenBirthdate } = child;
      const childData = {
        childrenParent: eid,
        childrenFullName,
        childrenGender,
        childrenBirthdate,
      };

      // Insert the child data into the "children" table
      const { error: childError } = await supabase
        .from("children")
        .insert([childData]);

      if (childError) {
        console.error(childError);
        throw new Error("Inserting child record failed");
      }
    }
  }

  if (error) {
    console.error(error);
    throw new error("creating/updating employee record failed");
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

export async function deleteChildren(id) {
  const { data, error } = await supabase
    .from("children")
    .delete()
    .eq("childrenParent", id);

  if (error) {
    console.error(error);
    throw new error("deleting children record failed");
  }

  return data;
}
