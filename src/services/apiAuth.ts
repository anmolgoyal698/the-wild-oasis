import supabase, { AVATAR_PHOTOS_STORAGE_URL } from "./supabase";

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export const signUp = async ({ fullName, email, password }: SignUpParams) => {
  // Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session!);
  }

  return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  console.log("Hello world");
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  //This is going to get the session data from local storage
  const { data: session } = await supabase.auth.getSession();
  console.log("SESSION DATA", session);
  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export async function updateCurrentUser({ password, fullName, avatar }: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) {
  // 1. Update password OR fullName
  let updateData: any;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${AVATAR_PHOTOS_STORAGE_URL}${fileName}`,
      },
    });

  if (updateUserError) throw new Error(updateUserError.message);
  return updatedUser;
}