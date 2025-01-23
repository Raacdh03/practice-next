"use client";

import SidebarWithHeader from "@/app/components/sidebar";
import HeaderContent, { HeaderContentProps } from "@/app/components/header";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import {
  fakeDataUser,
  initValueUser,
  userData,
} from "@/app/types/insertInterface";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  TableContent,
  TableControllContent,
} from "@/app/components/tableContent";
import * as Yup from "yup";
import { useFormik } from "formik";

const HeaderDataContent: HeaderContentProps = {
  title: "Users",
  breadCrumb: ["home", "users"],
};

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

function UserPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataUsers, setDataUsers] = useState<userData[]>([]);
  const [selectedUser, setSelectedUser] = useState<userData | null>(null);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    // setDataUsers(fakeDataUser);
    setTotalData(fakeDataUser.length);
  }, [dataUsers]);

  //setup pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
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
    // pageCount: totalData,
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

  // crud
  const createUser = (newUser: userData) => {
    setDataUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser: userData) => {
    setDataUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === updatedUser.username) {
          return { ...user, ...updatedUser }; // Update only the changed fields
        }
        return user; // Keep other users unchanged
      })
    );
    // Reset the selectedUser state after update
    setSelectedUser(null);
  };

  const deleteUser = (username: string) => {
    setDataUsers((prevUsers) => {
      const filteredUsers = prevUsers.filter(
        (user) => user.username !== username
      );
      if (filteredUsers.length === prevUsers.length) {
        console.warn("User not found: ", username);
      }
      return filteredUsers; // Return array without the deleted user
    });
  };

  const handleEditUser = (user: userData) => {
    if (!user) {
      console.error("No user data available for editing");
      return;
    }
  
    setSelectedUser(user);
    formikUser.setValues({
      username: user.username || "",
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    });
    onOpen();
  };
  
  const formikUser = useFormik({
    initialValues: initValueUser,
    validationSchema: FormSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (selectedUser) {
        updateUser(values); // Update user if selected
      } else {
        createUser(values); // Create new user if no user is selected
      }
      onClose(); // Close modal after submit
      formikUser.resetForm(); // Reset form
    },
  });

  return (
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      {/* <pre>{JSON.stringify(dataUsers, null, 2)}</pre> */}
      <Card>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text>{HeaderDataContent.title}</Text>
            <Button
              colorScheme="gray"
              onClick={() => {
                setSelectedUser(null);
                formikUser.resetForm();
                onOpen();
              }}
            >
              Add User
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          {/* table component */}
          <TableContent
            table={table}
            actions={(row) => (
              <Flex gap="2">
                <Button size="sm" onClick={() => handleEditUser(row.original)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() =>
                    row.original?.username && deleteUser(row.original.username)
                  }
                >
                  Delete
                </Button>
              </Flex>
            )}
          />
          {/* table controll components */}
          <TableControllContent table={table} />
        </CardBody>
      </Card>
      {/* modal form user */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formikUser.handleSubmit}>
          <ModalContent>
            <ModalHeader>{selectedUser ? "Edit User" : "Add User"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                maxWidth="400px"
                mx="auto"
                mt="8"
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
              >
                <>
                  <FormControl
                    id="username"
                    mb="4"
                    isInvalid={formikUser.errors.username ? true : false}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      disabled={!!selectedUser}
                      onChange={formikUser.handleChange}
                      value={formikUser.values.username}
                      placeholder="Enter username"
                    />
                    <FormErrorMessage>
                      {formikUser.errors.username
                        ? "isi username dahulu.."
                        : " "}
                    </FormErrorMessage>
                  </FormControl>
                </>

                <>
                  <FormControl
                    id="name"
                    mb="4"
                    isInvalid={formikUser.errors.name ? true : false}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.name}
                      placeholder="Enter name"
                    />
                    <FormErrorMessage>
                      {formikUser.errors.name ? "isi nama dahulu.." : " "}
                    </FormErrorMessage>
                  </FormControl>
                </>

                <>
                  <FormControl
                    id="email"
                    mb="4"
                    isInvalid={formikUser.errors.email ? true : false}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      type="text"
                      name="email"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.email}
                      placeholder="Enter email"
                    />
                    <FormErrorMessage>
                      {formikUser.errors.email ? "isi email dahulu.." : " "}
                    </FormErrorMessage>
                  </FormControl>
                </>

                <>
                  <FormControl
                    id="role"
                    mb="4"
                    isInvalid={formikUser.errors.role ? true : false}
                  >
                    <FormLabel>Role</FormLabel>
                    <Select
                      id="role"
                      name="role"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.role}
                      placeholder="Select role"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                    </Select>
                    <FormErrorMessage>
                      {formikUser.errors.role ? "isi role dahulu.." : " "}
                    </FormErrorMessage>
                  </FormControl>
                </>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                {selectedUser ? "Update" : "Create"}
              </Button>
              <Button ml="4" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </SidebarWithHeader>
  );
}

export default UserPage;
