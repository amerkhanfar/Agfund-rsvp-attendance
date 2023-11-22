"use client";

import "../../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function DemoPage() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
  const audienceId = "12a63504d0";
  const tagId = "agfund-completed-invite-form"; // Replace with the actual tag ID
  const dataCenter = "us21";
  const apiUrl = `/api/lists/12a63504d0/members/${id}`;
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      count: 200,
    },
  };
  const getData = async () => {
    try {
      const response = await axios.get(apiUrl, axiosConfig);
      console.log(response);
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
    </div>
  );
}
