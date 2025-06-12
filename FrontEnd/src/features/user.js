import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  error: false,
  userToken,
};

// action creater
export const register = createAsyncThunk(
  "users/register",
  async ({ firstname, lastname, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      firstname,
      lastname,
      email,
      password,
    });
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("userToken", data.jwt);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      localStorage.removeItem("userToken");
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resteTegistered: (state) => {
      state.registered = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = false;
        state.userToken = action.payload.jwt;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resteTegistered } = userSlice.actions;

export default userSlice.reducer;
