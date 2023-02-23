/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {useAuthState} from "react-firebase-hooks/auth";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import {auth} from "../../../firebase/clientApp";
import {useEffect} from "react";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
	const [modalState, setModalState] = useRecoilState(authModalState);
	const [user, loading, error] = useAuthState(auth);

	const handleClose = () => {
		setModalState((prev) => ({
			...prev,
			open: false,
		}));
	};

	const toggleView = (view: string) => {
		setModalState({
			...modalState,
			view: view as typeof modalState.view,
		});
	};

	useEffect(() => {
		if (user) handleClose();
		console.log(user);
		return () => {};
	}, [user]);

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={"center"}>
						{modalState.view === "login" && "Login"}
						{modalState.view === "signup" && "Sign Up"}
						{modalState.view === "resetPassword" && "Reset Password"}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						flexDirection={"column"}
						alignItems="center"
						justifyContent={"center"}
						pb={6}
					>
						<Flex
							direction={"column"}
							align="center"
							justify={"center"}
							width="70%"
							// border="1px solid red"
						>
							{modalState.view === "login" || modalState.view === "signup" ? (
								<>
									<OAuthButtons />
									<Text color="gray.500" fontWeight={700}>
										OR
									</Text>
									<AuthInputs toggleView={toggleView} />
								</>
							) : (
								<ResetPassword toggleView={toggleView} />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
export default AuthModal;
