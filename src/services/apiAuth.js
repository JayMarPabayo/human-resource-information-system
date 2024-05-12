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

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
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
