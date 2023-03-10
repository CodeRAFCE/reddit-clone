import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useSetRecoilState} from "recoil";
import {authModalState, ModalView} from "../../../atoms/authModalAtom";
import {auth} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";

type SignUpProps = {
	toggleView: (view: ModalView) => void;
};

const SignUp: React.FC<SignUpProps> = ({toggleView}) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [signUpForm, setSignUpForm] = useState({email: "", password: "", confirmPassword: ""});
	const [formError, setFormError] = useState("");
	const [createUserWithEmailAndPassword, user, loading, userError] =
		useCreateUserWithEmailAndPassword(auth);

	// Firebase logic
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formError) setFormError("");
		if (signUpForm.password !== signUpForm.confirmPassword) {
			setFormError("Passwords do not match! :(");
			return;
		}
		createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Update Form State

		setSignUpForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				name="email"
				placeholder="Email"
				type="email"
				mb={2}
				fontSize="10pt"
				_placeholder={{color: "gray.500"}}
				_hover={{bg: "white", border: "1px soild", borderColor: "blue.500"}}
				_focus={{outline: "none", bg: "white", border: "1px soild", borderColor: "blue.500"}}
				bg="gray.50"
				onChange={onChange}
				required
			/>
			<Input
				name="password"
				placeholder="Password"
				type="password"
				mb={2}
				fontSize="10pt"
				_placeholder={{color: "gray.500"}}
				_hover={{bg: "white", border: "1px soild", borderColor: "blue.500"}}
				_focus={{outline: "none", bg: "white", border: "1px soild", borderColor: "blue.500"}}
				bg="gray.50"
				onChange={onChange}
				required
			/>

			<Input
				name="confirmPassword"
				placeholder="Confirm Password"
				type="password"
				mb={2}
				fontSize="10pt"
				_placeholder={{color: "gray.500"}}
				_hover={{bg: "white", border: "1px soild", borderColor: "blue.500"}}
				_focus={{outline: "none", bg: "white", border: "1px soild", borderColor: "blue.500"}}
				bg="gray.50"
				onChange={onChange}
				required
			/>

			<Text textAlign={"center"} color="red" fontSize={"10pt"}>
				{formError || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
			</Text>

			<Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
				Sign Up
			</Button>

			<Flex fontSize="9pt" justifyContent={"center"}>
				<Text mr={1}>Already a redditor?</Text>
				<Text
					color="blue.500"
					fontWeight={700}
					cursor="pointer"
					onClick={() => toggleView("login")}
				>
					LOGIN
				</Text>
			</Flex>
		</form>
	);
};
export default SignUp;
