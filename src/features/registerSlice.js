import createDataSlice from "../lib/slices/createDataSlice";

const signupSlice = createDataSlice({
  endpoint: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/signup`,
  name: "signup",
  transformResponse: (data) => ({
    signup: data?.data,
  }),
});

export const {
    reducer: signUpReducer,
    createData: handleSignUp
} = signupSlice;

export default signUpReducer