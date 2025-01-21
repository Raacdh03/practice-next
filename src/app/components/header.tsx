import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Spacer } from "@chakra-ui/react";

export interface HeaderContentProps {
  title: string;
  breadCrumb: string[];
}

const HeaderContent = ({ title, breadCrumb }: HeaderContentProps) => {
  return (
    <Box mb={4}>
      <Flex alignItems="center">
        <Heading as="h1"  fontSize='50px' fontWeight="bold">
          {title}
        </Heading>

        <Spacer />

        <Breadcrumb fontWeight="medium" fontSize="lg">
          {breadCrumb.map((item, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${item.toLowerCase()}`}>{item}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
    </Box>
  );
};

export default HeaderContent;
