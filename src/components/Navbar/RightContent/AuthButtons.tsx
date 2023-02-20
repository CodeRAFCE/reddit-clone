import {Button, Flex} from "@chakra-ui/react";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
	return (
		<>
			<Button
				variant={"outline"}
				height="28px"
				width={{base: "70px", md: "110px"}}
				display={{base: "none", sm: "flex"}}
				mr={2}
				// onClick={() => {}}
			>
				Login
			</Button>
			<Button
				height="28px"
				width={{base: "70px", md: "110px"}}
				display={{base: "none", sm: "flex"}}
				mr={2}
				// onClick={() => {}}
			>
				Sign up
			</Button>
		</>
	);
};
export default AuthButtons;
