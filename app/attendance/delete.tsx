"use server";
import axios from "axios";

const deleteData = async (data: any) => {
  console.log(data);
  try {
    await axios.delete(
      `https://us21.api.mailchimp.com/3.0/lists/12a63504d0/members/${data.id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

export const updatePending = async (data: any) => {
  try {
    await axios.put(
      `https://sdg-signture-default-rtdb.firebaseio.com/attendance/-${data.id}.json`,
      {
        seat: data.seat,
        name: data.name,
        status: "Pending",
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export default updatePending;
