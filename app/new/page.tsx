"use client";
import react, { useState } from "react";

import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  //   const [name, setName] = useState("");
  //   const [seat, setSeat] = useState("");
  //   const [status, setStatus] = useState("");

  async function createTodo(data: FormData) {
    const name = data.get("name")?.valueOf();
    if (typeof name !== "string" || name.length === 0) {
      throw new Error("Invalid Title");
    }

    const seat = data.get("seat")?.valueOf();
    if (typeof seat !== "string" || seat.length === 0) {
      throw new Error("Invalid Title");
    }

    const status = data.get("status")?.valueOf();
    if (typeof status !== "string" || status.length === 0) {
      throw new Error("Invalid Title");
    }

    await axios.post(
      "https://sdg-signture-default-rtdb.firebaseio.com/attendance.json",
      { name, seat, status },
    );
  }
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>New</h1>
      </header>
      <form action={createTodo} className='flex gap-2 flex-col'>
        <input
          type='text'
          name='name'
          placeholder='name'
          //   value={name}
          //   onChange={(e) => {
          //     setName(e.target.value);
          //   }}
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <input
          type='text'
          name='seat'
          placeholder='seat'
          //   value={seat}
          //   onChange={(e) => {
          //     setSeat(e.target.value);
          //   }}
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <input
          type='text'
          name='status'
          placeholder='status'
          value={"away"}
          //   value={status}
          //   onChange={(e) => {
          //     setStatus(e.target.value);
          //   }}
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <div className='flex gap-1 justify-end'>
          <Link
            href='/attendance'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>
            Create
          </button>
        </div>
      </form>
    </>
  );
}
