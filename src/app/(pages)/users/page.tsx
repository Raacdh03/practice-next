"use client";

import SidebarWithHeader from "@/app/components/sidebar";
import HeaderContent, { HeaderContentProps } from "@/app/components/header";
import { Flex, Heading, Text } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { fakeDataUser, userData } from "@/app/types/insertInterface";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Button
} from "@chakra-ui/react";

const HeaderDataContent: HeaderContentProps = {
  title: "Users",
  breadCrumb: ["home", "users"],
};

function UserPage() {
  const [dataUsers, setDataUsers] = useState<userData[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    setDataUsers(fakeDataUser);
    setTotalData(fakeDataUser.length);
  }, [dataUsers]);

  //setup pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  //setup column tabel
  const columns = useMemo<ColumnDef<userData>[]>(
    () => [
      {
        accessorFn: (row) => row.username,
        id: "username",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Username</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Name</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.email,
        id: "email",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Email</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.role,
        id: "role",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Role</Text>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  //setup tanstack react-table
  const table = useReactTable({
    data: dataUsers,
    columns: columns,
    pageCount: totalData,
    state: {
      pagination,
    },

    //pipeline
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    //manual
    manualFiltering: false,
    manualPagination: false,
  });

  return (
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      {/* <pre>{JSON.stringify(dataUsers, null, 2)}</pre> */}
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          {/* table component */}
          <Flex w={"full"} justifyContent={"space-between"}>
            <TableContainer>
              <Table variant="simple">
                {/* HEADER TABLE CODE */}
                <Thead>
                  {table.getHeaderGroups().map((headerGroup: any, idx) => (
                    <Tr key={idx} bg={"gray.100"}>
                      {headerGroup.headers.map((header: any) => {
                        return (
                          <Th
                            key={header.id}
                            colSpan={header.colSpan}
                            color={"gray.500"}
                          >
                            <Heading as="h5" size="sm">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Heading>
                          </Th>
                        );
                      })}
                    </Tr>
                  ))}
                </Thead>
                {/* BODY TABLE CODE */}
                <Tbody>
                  {table.getRowModel().rows.length > 0 ? (
                    //loop column data
                    table.getRowModel().rows.map((row: any, index: any) => {
                      return (
                        <Tr key={index}>
                          {row.getVisibleCells().map((cell: any) => {
                            return (
                              <Td key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                  ) : (
                    // end loop column data
                    <Tr>
                      <Td colSpan={table.options.columns.length + 1}>
                        <Flex justifyContent={"center"} alignItems={"center"}>
                          Belum ada data
                        </Flex>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          {/* table controll components */}
          <Flex width={"full"} justifyContent={"space-between"} gap={2}>
            <Flex gap={2} width={"full"} justifyContent={"start"}>
              <strong>{table.getState().pagination.pageIndex + 1}</strong>/{" "}
              <strong>{table.getPageCount()}</strong>
            </Flex>
            <Flex gap={2} width={"full"}>
              <Button
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}
                size="sm"
                colorScheme="blue"
              >Pertama</Button>
              <Button
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
                size="sm"
                colorScheme="blue"
              >Sebelumnya</Button>
              <Button
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
                size="sm"
                colorScheme="blue"
              >Selanjutnya</Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}
                size="sm"
                colorScheme="blue"
              >Terakhir</Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </SidebarWithHeader>
  );
}

export default UserPage;
