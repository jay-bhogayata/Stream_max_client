"use client";
import { X, AlertCircle } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useTable } from "react-table";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { notifySuccess } from "@/app/components/NotifySuccess";
import { notifyError } from "@/app/components/NotifyError";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [cencleSubId, setCencleSubid] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/auth/getAllPayment",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              sameSite: "none",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        // If the user data is nested within an object, access it here
        setData(jsonData.payment || []); // Use an empty array as a fallback if 'users' is not present
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "uniquePaymentId",
        accessor: "uniquePaymentId",
      },
      {
        Header: "stripeCustomerId",
        accessor: "stripeCustomerId",
      },
      {
        Header: "amountPaid",
        accessor: "amountPaid",
      },
      {
        Header: "amountReceived",
        accessor: "amountReceived",
      },
      {
        Header: "paymentStatus",
        accessor: "paymentStatus",
      },
      {
        Header: "userEmail",
        accessor: "userEmail",
      },

      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "cancel subscription",
        accessor: "cancel subscription",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              console.log(row.allCells[1].value),
                setCencleSubid(row.allCells[1].value);
              setOpen(!open);
            }}
          >
            <X
              size={28}
              color="#c01c28"
              className="cursor-pointer bg-gray-200"
            />
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const handleCancelSubscription = (data) => {
    const cusData = {
      stripeCustomerId: cencleSubId,
    };
    console.log("from handle cencle usb", data);
    fetch(`${server_url}/cancelAdminSubscription`, {
      method: "post",
      body: JSON.stringify(cusData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-expose-headers": "Set-Cookie",
        sameSite: "none",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        notifySuccess(d.message);
        router.push("/admin");
      })
      .catch((e) => console.log(data));
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-semibold mb-3">User List</h1>
      <Toaster />
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border p-2 font-semibold"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <AlertCircle color="#e01b24" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Are you sure you want to cancel users subscription
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to cancel user subscription
                              ? doing this will remove your access to watching
                              movies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          handleCancelSubscription(cencleSubId), setOpen(false);
                        }}
                      >
                        cancel user sub
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setOpen(!open);
                        }}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border p-2 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
