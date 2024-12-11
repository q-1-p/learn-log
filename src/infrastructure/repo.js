import { supabase } from "./supabase"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const findAll = async () => {
    await sleep(100);
    const records = await supabase.from("study-record").select("*");
    console.log(records.data);
    return records.data;
}

export const save = async (record) => {
    await sleep(100);
    const { _, error } = await supabase
        .from("study-record")
        .insert(record);
    
    if (error) {
        console.error("Error saving record:", error);
        throw error;
    }
}

export const deleteRecord = async (id) => {
    const { _, error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
    
    if (error) {
        console.error("Error deleting record:", error);
        throw error;
    }
}