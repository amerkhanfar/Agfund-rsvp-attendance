"use client";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import updateData, { updatePending } from "./delete";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  email: string;
  name: string;
};

const apiKey = process.env.NEXT_PUBLIC_API_KEY?.toString();
const tagToAdd = "test-dev";

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
};

const deleteData = async (data: any) => {
  console.log(data);
  try {
    await axios.delete(`/api/lists/12a63504d0/members/${data}`, axiosConfig);
    console.log("data deleted");
  } catch (error) {
    console.log(error);
  }
};

const updateTag = async (data: any) => {
  console.log(data);
  try {
    await axios.post(
      `/api/lists/12a63504d0/members/${data}/tags`,
      {
        tags: [{ name: "test-dev", status: "active" }],
      },
      axiosConfig,
    );
    console.log(tagToAdd);
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "index",
    header: "#",
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "org",
    header: "Organization",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      const payment = row.original.id;
      return (
        <div>
          <Button
            disabled
            style={{
              background: "#a7742c",
              width: "80px",
              display: "flex",
              borderRadius: "7px",
              padding: "5px 0px",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
            }}
            variant='ghost'
            className='h-8 w-8 p-0'>
            Attended
          </Button>
        </div>
      );
    },
  },
];
