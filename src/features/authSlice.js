import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const lognInSlice = createDataSlice({
  name: "login",
  endpoint: `${baseUrl}/api/v1/auth/login`,
  transformResponse: (response) => response,
});

const getUserSlice = createDataSlice({
  name: "user",
  endpoint: `${baseUrl}/api/v1/auth/currentUser`,
    transformResponse: (response) => {
      return {
        user: response
      }
    },
});

const logoutSlice = createDataSlice({
  name: 'logout',
  endpoint: `${baseUrl}/api/v1/auth/logout`,
  transformResponse: (response) => response,
})

export const {
    actions: loginActions,
    reducer: loginReducer,
    createData: loginUser
} = lognInSlice;

export const {
    actions: fetUserActions,
    fetchData: getCurrentUser,
    reducer: getCurrentUserReducer
} = getUserSlice;

export const {
    actions: logoutActions,
    createData: logoutUser,
    reducer: logoutReducer
} = logoutSlice;