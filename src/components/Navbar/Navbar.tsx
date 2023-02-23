import {Flex, Image} from "@chakra-ui/react";
import {User} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

// type NavbarProps = {};

const Navbar: React.FC = () => {
	const [user, loading, error] = useAuthState(auth);
	return (
		<Flex bg="white" height="44px" padding="6px 12px">
			<Flex align={"center"} mr={2}>
				<Image src="/images/redditFace.svg" alt="reddit-face" height="30px" />
				<Image
					src="/images/redditText.svg"
					alt="reddit-text"
					height="46px"
					display={{base: "none", md: "unset"}}
				/>
			</Flex>
			{/* <Directory /> */}
			<SearchInput />
			<RightContent user={user as User} />
		</Flex>
	);
};

export default Navbar;
