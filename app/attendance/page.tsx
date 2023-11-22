"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import "../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      email: "D55",
      name: "Amer Bassam Saeed Khanfar Saeed Khanfar",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<any>([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
  const audienceId = "12a63504d0";
  const tagId = "agfund-audience-2"; // Replace with the actual tag ID
  const dataCenter = "us21";
  const apiUrl = "/api/lists/12a63504d0/members";
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      count: 100,
    },
  };
  const getData = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_KEY);
      const response = await axios.get(apiUrl, axiosConfig);
      console.log(response.data.members);
      const members = response.data.members;
      // const membersWithTag = members.filter(
      //   (member: { tags: string | string[] }) => member.tags.includes(tagId),
      // );
      const transformedData = members.map(
        (item: { id: any; full_name: any; email_address: any }) => {
          return {
            id: item.id,
            name: item.full_name,
            email: item.email_address,
          };
        },
      );
      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    // const interval = setInterval(() => {
    //   getData();
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);
  return (
    <div className=' '>
      <div className='containers'>
        <img src='/Prize-logo.png' alt='prize logo' width={120} height={200} />

        <img src='/Agfund-logo.png' alt='prize logo' width={120} height={200} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
