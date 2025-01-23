"use client";

import React from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Heading } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

interface TableContentProps {
  table: any;
  actions?: (row: any) => React.ReactNode; // Add actions prop
}

export function TableContent({ table, actions }: TableContentProps) {
  return (
    <Flex w="full" justifyContent="space-between">
      <TableContainer>
        <Table variant="simple">
          {/* HEADER TABLE CODE */}
          <Thead>
            {table.getHeaderGroups().map((headerGroup: any, idx: number) => (
              <Tr key={idx} bg="gray.100">
                {headerGroup.headers.map((header: any) => (
                  <Th key={header.id} colSpan={header.colSpan} color="gray.500">
                    <Heading as="h5" size="sm">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Heading>
                  </Th>
                ))}
                {actions && (<Th>Actions</Th>)} {/* Add Actions column if actions exist */}
              </Tr>
            ))}
          </Thead>

          {/* BODY TABLE CODE */}
          <Tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: any, index: number) => (
                <Tr key={index}>
                  {row.getVisibleCells().map((cell: any) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                  {actions && (<Td>{actions(row.original)}</Td>)} {/* Render actions */}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td
                  colSpan={table.options.columns.length + (actions ? 1 : 0)} // Correct colSpan calculation
                >
                  <Flex justifyContent="center" alignItems="center">
                    Belum ada data
                  </Flex>
                </Td>
              </Tr> 
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

interface TableControllContentProps {
  table: any;
}

export function TableControllContent({ table }: TableControllContentProps) {
  return (
    <Flex width="full" justifyContent="space-between" gap={2} mt={4}>
      <Flex gap={2} width="full" justifyContent="start">
        <strong>{table.getState().pagination.pageIndex + 1}</strong>/{" "}
        <strong>{table.getPageCount()}</strong>
      </Flex>
      <Flex gap={2} width="full" justifyContent="end">
        <Button
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
          size="sm"
          colorScheme="blue"
        >
          Pertama
        </Button>
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
          size="sm"
          colorScheme="blue"
        >
          Sebelumnya
        </Button>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
          size="sm"
          colorScheme="blue"
        >
          Selanjutnya
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
          size="sm"
          colorScheme="blue"
        >
          Terakhir
        </Button>
      </Flex>
    </Flex>
  );
}
