import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      style={{
        background: "linear-gradient(147.14deg, #FF3B3B 6.95%, #6600CC 93.05%)", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
      }}
      _hover={{
        background: "#4D0099", 
        transform: "scale(1.2)", 
     marginLeft: "5px",
      }}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
