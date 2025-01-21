'use client'

import SidebarWithHeader from "@/app/components/sidebar";
import HeaderContent, { HeaderContentProps } from "@/app/components/header";
import { Flex } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'

const HeaderDataContent: HeaderContentProps = {
  title: "Home",
  breadCrumb: ["home"]
};

function HomePage() {
  return (
    <Flex direction="column" minH="100vh">
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      <Card align='center'>
        <CardHeader>
          <Heading size='md'> Customer dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme='gray'>View here</Button>
        </CardFooter>
      </Card>
    </SidebarWithHeader>
    </Flex>
  )
}

export default HomePage;