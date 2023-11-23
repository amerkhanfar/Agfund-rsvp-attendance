"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const page = ({ params: { id } }) => {
  const [tag, setTag] = useState();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
  const audienceId = "12a63504d0";
  const tagId = "agfund-completed-invite-form";
  const dataCenter = "us21";
  const apiUrl = `/api/lists/12a63504d0/members/${id}`;
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const getMemberById = async () => {
    try {
      const response = await axios.get(apiUrl, axiosConfig);

      // Handle the response
      console.log("Member data:", response.data.tags);
      const tags = response.data.tags;
      tags.some((item) => item.name === "test-dev")
        ? setTag(true)
        : setTag(false);
    } catch (error) {
      // Handle errors
      console.error("Error fetching member:", error.message);
      setTag(false);
    }
  };

  useEffect(() => {
    getMemberById();
  }, []);

  if (tag === undefined) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}>
        <Oval
          height={80}
          width={80}
          color='#a7742c'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#ebac55'
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  } else {
    return (
      <div>
        {tag ? (
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}>
            <img src='/check.png' alt='' width={350} height={350} />
            <div>Invited</div>
          </div>
        ) : (
          <div
            div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}>
            <img src='/x.png' alt='' width={350} height={350} />
            <div>Not invited</div>
          </div>
        )}
      </div>
    );
  }
};

export default page;
