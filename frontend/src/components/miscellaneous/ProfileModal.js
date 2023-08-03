import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
 
  ModalBody,
  ModalCloseButton,

  useDisclosure,
  IconButton,
  Text,

} from "@chakra-ui/react";
import { Flex, Avatar } from "@chakra-ui/react";
import { createdAt } from "../../config/ChatLogics";
import "./SideDrawer.css";


const ProfileModal = ({ user, children }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

return (
  <>
    {children ? (
      <span onClick={onOpen}>{children}</span>
    ) : (
      <IconButton
        icon={<ViewIcon  />}
        onClick={onOpen}
        bg="red"
        color="white"
        pos="absolute"
        top={4}
        right={4}
        className="close-button"
      />
    )}
    <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        h="auto"
        w="auto"
        bg="#28293D"
        color="#F2F2F5"
        pt={4}
        pb={4}
      >
        <ModalCloseButton color="#F2F2F5" pos="absolute" top={4} right={4} />
        <ModalBody d="flex" alignItems="center" justifyContent="center" className="profileModel">
          <Avatar
            size="xl"
            borderRadius="lg"
            width="200px"
            height="200px"
            src={user.pic}
            alt={user.name}
            mr={8}
          />
          <Flex direction="column" alignItems="flex-start">
            <Text fontSize="1.2rem" mt={2}>
              ID: {user._id.toString().substring(0, 9)}
            </Text>
            <Text fontSize="1.2rem" mt={2}>
              Created At: {createdAt(user)}
            </Text>
            <Text fontSize="1.2rem" mt={2}>
              Email: {user.email}
            </Text>
            <Text fontSize="2rem" fontWeight="bold" mt={4}>
              {user.name}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
);

};

export default ProfileModal;
