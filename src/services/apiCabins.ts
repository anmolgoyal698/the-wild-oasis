import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Could not fetch cabins");
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
  .from('cabins')
  .insert([
    newCabin,
  ])
  .select();
  
  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error("Could not create cabin");
  }

  return data;
}

export async function deleteCabin(cabinId: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Could not delete cabin");
  }

  return data;
}
