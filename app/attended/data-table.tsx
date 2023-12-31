"use client";
import * as React from "react";
import Link from "next/link";
import { Oval } from "react-loader-spinner";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className='flex flex-col items-center py-4 w-screen justify-center gap-10'>
        <h1 style={{ fontSize: "20px" }} className='heading'>
          Attendance
        </h1>
        <div
          style={{
            width: "90%",
            position: "relative",
            padding: "10px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              position: "absolute",
              left: "0",
              width: "20%",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <div>Total : {data.length}</div>
          </div>

          <div className='contains-links'>
            <Link href={"/attendance"} className='other'>
              View RSVP Response
            </Link>
            <Link href={"/approved"} className='other'>
              View Approved
            </Link>
            <Link href={"/attended"} className='other'>
              View Attendance
            </Link>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Input
            placeholder='Search...'
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
      </div>

      <div className='rounded-md border flex items-center w-screen'>
        <Table>
          <TableHeader style={{ background: "#a7742c" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ color: "white" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow
                className='text-center'
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "55vw",
                }}>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
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
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    className='text-center'
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "55vw",
                    }}>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'>
                      <p style={{ fontSize: "15px" }}>No Result</p>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
