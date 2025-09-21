import createDataSlice from "../lib/slices/createDataSlice";

const signupSlice = createDataSlice({
  endpoint: `${import.meta.env.VITE_BASE_URL}/auth/signup`,
  name: 'signup',
  transformResponse: (data)=>({
    signup: data?.data
  })
});

export const {
    reducer: signUpReducer,
    createData: handleSignUp
} = signupSlice;

export default signUpReducer