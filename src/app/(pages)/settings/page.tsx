import SidebarWithHeader from "@/app/components/sidebar";
import HeaderContent, { HeaderContentProps } from "@/app/components/header";
import Contact from "@/app/components/contact";
import { Flex } from "@chakra-ui/react";

const HeaderDataContent: HeaderContentProps = {
  title: "Settings",
  breadCrumb: ["home", "settings"]
};

function SettingPage() {
  return (
    <Flex direction="column" minH="100vh">
        <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      <Contact/>
    </SidebarWithHeader>
    </Flex>
  );
}

export default SettingPage;
