"use server";
import axios from "axios";

const updateData = async (data: any) => {
  console.log(data);
  try {
    await axios.put(
      `https://sdg-signture-default-rtdb.firebaseio.com/attendance/-${data.id}.json`,
      {
        seat: data.seat,
        name: data.name,
        status: "Attended",
      },
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

export default updateData;
