"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "../../globals.css";
import crypto from "crypto";

const page = ({ params: { id } }) => {
  const [tag, setTag] = useState();
  const [info, setInfo] = useState();
  const email = decodeURIComponent(id);
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
  const audienceId = "12a63504d0";
  const tagId = "agfund-completed-invite-form";
  const dataCenter = "us21";
  const apiUrl = `/api/lists/12a63504d0/members/${subscriberHash}`;
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const updateTag = async () => {
    try {
      await axios.post(
        `/api/lists/12a63504d0/members/${subscriberHash}/tags`,
        {
          tags: [{ name: "attended", status: "active" }],
        },
        axiosConfig,
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getMemberById = async () => {
    try {
      const response = await axios.get(apiUrl, axiosConfig);

      // Handle the response
      console.log("Member data:", response.data);
      const tags = response.data.tags;
      setInfo(response.data);

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
    updateTag();
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
        <div className='element'></div>
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
        <div className='element confirm'></div>
        <div className='bottom confirm'></div>
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
            <div>Name: {info.full_name}</div>
            <div>Email: {info.email_address}</div>
            <div>Organization: {info.merge_fields.LNAME}</div>
            <div>Position: {info.merge_fields.POSITION}</div>
            <img src='/check.png' alt='' width={100} height={100} />
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
            <div className='element confirm'></div>
            <div className='bottom confirm'></div>
            <img src='/x.png' alt='' width={100} height={100} />
            <div>Not found</div>
          </div>
        )}
      </div>
    );
  }
};

export default page;
