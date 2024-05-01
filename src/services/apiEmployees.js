import supabase from "./supabase";

export async function getEmployees({ searchKey = "" }) {
  const searchPattern = `%${searchKey}%`;
  let { data, error } = await supabase
    .from("employees")
    .select(`*, departments(*), children(*), educations(*)`)
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
  const { children, educations, ...employeeWithoutChildren } = employee;
  const employeesWithNull = convertEmptyStringsToNull(employeeWithoutChildren);
  let query = supabase.from("employees");

  if (!id) {
    query = query.insert([employeesWithNull]);
  }

  if (id) {
    query = query.update(employeesWithNull).eq("id", id);
  }

  console.log(educations);

  const { data, error } = await query.select();
  // -- Children
  const eid = data[0].id;
  if (eid) {
    await deleteChildren(eid);
    await deleteEducations(eid);
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

  if (educations && Array.isArray(educations)) {
    for (const education of educations) {
      const educationData = {
        educationStudent: eid,
        ...education,
      };

      // Insert the educationData data into the "educations" table
      const { error: educationError } = await supabase
        .from("educations")
        .insert([educationData]);

      if (educationError) {
        console.error(educationError);
        throw new Error("Inserting education record failed");
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

export async function deleteEducations(id) {
  const { data, error } = await supabase
    .from("educations")
    .delete()
    .eq("educationStudent", id);

  if (error) {
    console.error(error);
    throw new error("deleting education record failed");
  }

  return data;
}
