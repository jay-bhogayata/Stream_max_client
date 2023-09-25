"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTable } from "react-table";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { notifyError } from "@/app/components/NotifyError";
import { notifySuccess } from "@/app/components/NotifySuccess";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [userData, setUserData] = useState({});
  const [nameUpdateOpen, setNameUpdateOpen] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cancelButtonRef = useRef(null);
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleNameUpdate = (d) => {
    setNameUpdateOpen(false);
    const data = {
      name: d.name,
      role: d.role,
      email: userData.email,
    };
    console.log(data);
    fetch(`${server_url}/updateUserInfo`, {
      method: "post",
      body: JSON.stringify(data),
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
        setTimeout(() => {
          router.push("/admin/");
        }, "2000");
      })
      .catch((e) => notifyError(e));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/auth/getAllUser",
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
        setData(jsonData.users || []); // Use an empty array as a fallback if 'users' is not present
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Subscribed",
        accessor: "subscribed",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Verified",
        accessor: "verified",
        Cell: ({ value }) => (value ? "Yes" : "No"),
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
        Header: "edit user",
        accessor: "edit user",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              const data = {
                name: row.allCells[0].value,
                role: row.allCells[2].value,
                email: row.allCells[1].value,
              };
              setValue("name", row.allCells[0].value);
              setValue("role", row.allCells[2].value);

              setUserData(data);
              setNameUpdateOpen(true);

              console.log(data);
            }}
          >
            <Edit
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

  //

  //
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="container mx-auto mt-5">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-3">User List</h1>
      <Transition.Root show={nameUpdateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setNameUpdateOpen}
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
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          update user info
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            {...register("name", {
                              required: true,
                            })}
                          />
                          <select
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            {...register("role", { required: true })}
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleSubmit(handleNameUpdate)}
                    >
                      update user
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setNameUpdateOpen(false);
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
