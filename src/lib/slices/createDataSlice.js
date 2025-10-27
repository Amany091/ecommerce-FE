import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import toast from "react-hot-toast";

export const createDataSlice = (
    {name,
    endpoint,
    transformResponse = data => data
})=>{

    const buildQueryParams = (params={})=>{
        if (!params || Object.keys(params).length === 0) return;
        return "?" + new URLSearchParams(params).toString();
    }

    const request = async (method="GET", body =null, params = null, url)=>{
        const fullUrl = params ? `${url}${buildQueryParams(params)}` : url;
        const response = await fetch(fullUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.message || `Request failed with ${response.status}`,
                details: errorData.errors || null,
            };
        }
        return response.json()
    }

    const fetchData = createAsyncThunk(`${name}/fetchdata`, async ({id, params}={}, {rejectWithValue})=>{
        try {
            const fullEndpoint = id ? `${endpoint}/${id}` : endpoint;
            const response = await request("GET", null, params, fullEndpoint)
            return transformResponse(response, params);
        } catch (error) {
            return rejectWithValue(error)
        }
    })

    const createData = createAsyncThunk(
      `${name}/createData`,
      async (body, { rejectWithValue }) => {
        try {
          const data = await request("POST", body, null, endpoint);
          return data?.data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    const updateData = createAsyncThunk(
      `${name}/updateData`,
      async ({ id, body }, { rejectWithValue }) => {
        try {
          const data = await request('PUT', body, null, `${endpoint}/${id}`);
          return transformResponse(data);
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    const updateAllData = createAsyncThunk(`${name}/updateAllData`, async ()=>{
      try {
        const data = await request('PUT', null, null, `${endpoint}/updateAll`);
        return transformResponse(data);
      } catch (error) {
        return rejectWithValue(error)
      }
    })

    const deleteData = createAsyncThunk(
      `${name}/deleteData`,
      async (id, { rejectWithValue }) => {
        try {
          const data = await request('DELETE', null, null, `${endpoint}/${id}`);
          return transformResponse(data);
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    const fetchItem = createAsyncThunk(`${name}/fetchItem`, async (id, {rejectWithValue})=>{
      try {
        const data = await request('GET', null, null, `${endpoint}/${id}`)
        return transformResponse(data)
      } catch (error) {
        return rejectWithValue(error)
      }
    });

    const debouncedFetchData = debounce((dispatch, params) => {
      dispatch(fetchData(params));
    }, 3000);

    const dataSlice = createSlice({
        name,
        initialState:{
            data: null,
            item:{},
            error: null,
            loading: false,
            hasFetched: false,
            filters: {},
        },
        reducers:{
            setFilters :(state,action)=>{
                const {key, value} = action.payload;
                state.filters = {...state.filters, [key]:value}
            },
            resetFilters : (state, action)=>{
                state.filters = {}
            },
            markFetched : (state, action)=>{
                state.hasFetched = true
            }
        },
        extraReducers: builder =>{
          builder
            .addCase(createData.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(createData.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              toast.success("Action completed successfully");
              state.data?.data?.push(action.payload);
            })
            .addCase(createData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

            .addCase(deleteData.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              const itemId = action.meta.arg;
              state.data.data = state.data.data.filter((item) => item._id !== itemId);
              toast.success("Order deleted successfully");
            })
            .addCase(deleteData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })

            .addCase(fetchData.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              state.data = action.payload[name];
              state.hasFetched = true;
            })
            .addCase(fetchData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })

            .addCase(updateData.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(updateData.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              toast.success("Updated Successfully")
              const itemId = action.meta.arg.id;
              state.data.data = state.data.data.map((item) =>
                item.id === itemId ? action.payload[name].data : item
              );
            })
            .addCase(updateData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })

            .addCase(updateAllData.pending, (state, action)=>{
              state.loading = true;
              state.error = null;
            })
            .addCase(updateAllData.fulfilled, (state, action)=>{
              state.loading = false;
              state.error = null;
              toast.success("All items updated successfully");
              state.data.data = action.payload[name].data;
            })
            .addCase(updateAllData.rejected, (state, action)=>{
              state.loading = false;
              state.error = action.error.message;
            })

            .addCase(fetchItem.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              state.item = action.payload[name]
            })
            .addCase(fetchItem.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });
        }
})

    return {
      ...dataSlice,
      fetchData,
      deleteData,
      updateData,
      updateAllData,
      createData,
      fetchItem,
      debouncedFetchData,
      hasFetched: (state) => state[name].hasFetched,
      markFetched: dataSlice.actions.markFetched,
    };
};

export default createDataSlice;
