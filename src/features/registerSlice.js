import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const signupSlice = createDataSlice({
  endpoint: `${baseUrl}/api/v1/auth/signup`,
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