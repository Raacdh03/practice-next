"use client";

import SidebarWithHeader from "@/app/components/sidebar";
import HeaderContent, { HeaderContentProps } from "@/app/components/header";
import { Flex, Text } from "@chakra-ui/react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { fakeDataUser, userData } from "@/app/types/insertInterface";

const HeaderDataContent: HeaderContentProps = {
  title: "Users",
  breadCrumb: ["home", "users"]
};

function UserPage() {
  const [dataUsers, setDataUsers] = useState<userData[]>([]);

  useEffect(() => {
    setDataUsers(fakeDataUser);
  }, [dataUsers]);

  //setup pagination
  const [{ pageIndex, pageSize }, setPagination] = 
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
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
    ],
    []
  );

  return (
    <Flex direction="column" minH="100vh">
        <SidebarWithHeader>
          <HeaderContent {...HeaderDataContent} />
          <pre>{JSON.stringify(dataUsers, null, 2)}</pre>
        </SidebarWithHeader>
    </Flex>
  );
}

export default UserPage;
