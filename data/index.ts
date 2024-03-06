export const getUserById = async (id: string) => {
  try {
    // logic here
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return {
      id: "123",
      name: "John Doe",
      email,
      password: null,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
const BaseUrl = "https://traverse-pgpw.onrender.com/api/v1";
export const signinUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const data = await fetch(`${BaseUrl}/auth/signin`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(data.status);
    const res = await data.json();
    if (data.status === 200 || res.ok) {
      console.log(res);

      return {
        success: "Login successful!",
        res,
        // redirect: DEFAULT_LOGIN_REDIRECT
      };
    }
    if (data.status === 400) {
      return {
        error: "Email or Phone number already exist",
      };
    }
    if (data.status === 404) {
      return {
        error: "User not found, sign up instead!",
      };
    }
    if (data.status === 500) {
      return {
        error: "Something went wrong.",
      };
    }

    return {
      error: res.message,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong.",
    };
  }
}; 
