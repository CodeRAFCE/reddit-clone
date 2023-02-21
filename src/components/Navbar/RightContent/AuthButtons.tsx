import {Button} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
	// SET STATE Method
	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<>
			<Button
				variant={"outline"}
				height="28px"
				width={{base: "70px", md: "110px"}}
				display={{base: "none", sm: "flex"}}
				mr={2}
				onClick={() => setAuthModalState({open: true, view: "login"})}
			>
				Login
			</Button>
			<Button
				height="28px"
				width={{base: "70px", md: "110px"}}
				display={{base: "none", sm: "flex"}}
				mr={2}
				onClick={() => setAuthModalState({open: true, view: "signup"})}
			>
				Sign up
			</Button>
		</>
	);
};
export default AuthButtons;
