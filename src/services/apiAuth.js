import supabase from "./supabase";

export async function signup({ userFullName, userEmail, userPassword }) {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      data: {
        fullname: userFullName,
      },
    },
  });
  if (error) {
    console.log(error.message);
    throw new error("Signing up user failed");
  }
  return data;
}

export async function login({ username, password }) {
  console.log(password);
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("userName", username)
    .single();

  if (error) throw new Error("Username not found");

  // Password check
  if (password !== data.userPassword) {
    throw new Error("Incorrect password");
  }

  try {
    localStorage.setItem("user", JSON.stringify(data));
  } catch (storageError) {
    console.error("Error saving to localStorage:", storageError);
  }

  let id = data.id;
  const now = new Date();
  const isoString = now.toISOString();
  const { error: updatError } = await supabase
    .from("users")
    .update({ userLastLogin: isoString })
    .eq("id", id);

  if (updatError) throw new Error(updatError.message);

  return data;
}

export async function getCurrentUser() {
  try {
    const userString = localStorage.getItem("user");

    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
    return null;
  }
}

export async function logout(id) {
  const now = new Date();
  const isoString = now.toISOString();
  const { data, error } = await supabase
    .from("users")
    .update({ userLastLogout: isoString })
    .eq("id", id);

  if (error) throw new Error(error.message);

  try {
    localStorage.removeItem("user");
  } catch (storageError) {
    console.error("Error saving to localStorage:", storageError);
  }

  return data;
}

export async function updateCurrentUser({ fullname, password }) {
  let updateData;
  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  return data;
}

// function randomString(length) {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
