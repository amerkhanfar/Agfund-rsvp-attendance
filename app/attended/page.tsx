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
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
  const audienceId = "12a63504d0";
  const tagId = "agfund-completed-invite-form"; // Replace with the actual tag ID
  const dataCenter = "us21";
  const apiUrl = "/api/lists/12a63504d0/members";
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      count: 1000,
    },
  };
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, axiosConfig);
      console.log(response.data.members);
      const members = response.data.members;
      const filteredMembers = members.filter((member: { tags: any[] }) => {
        return member.tags.some(
          (tag: { name: string }) => tag.name === "attended",
        );
      });

      console.log(filteredMembers);

      const transformedData = filteredMembers.map(
        (
          item: {
            id: any;
            full_name: any;
            email_address: any;
            merge_fields: any;
          },
          index: any,
        ) => {
          return {
            length: filteredMembers.length,
            index: index + 1,
            id: item.id,
            name: item.full_name,
            email: item.email_address,
            org: item.merge_fields.LNAME,
          };
        },
      );
      setData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteData = async (data: any) => {
    console.log(data);
    try {
      await axios.delete(
        `https://us21.api.mailchimp.com/3.0/lists/12a63504d0/members/${data.id}`,
      ),
        axiosConfig;
    } catch (error) {
      console.log(error);
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
        <div className='element'></div>
        <img
          src='/Prize-logo.png'
          alt='prize logo'
          width={120}
          height={200}
          style={{ zIndex: "2" }}
        />

        <img
          src='/Agfund-logo.png'
          alt='prize logo'
          width={120}
          height={200}
          style={{ zIndex: "2" }}
        />
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
