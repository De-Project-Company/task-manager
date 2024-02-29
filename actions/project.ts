"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { AddTeamMembersSchema } from "@/schemas";
import { z } from "zod";
import { GetFromSessionStorage } from "@/utils";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const CreateProject = async (values: any) => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };
  try {
    const res = await $http.post("/project", values, config);
    // console.log("project creates successfully:", res.data);
    if (res?.status === 200) {
      return {
        success: "Project created successfully, check your email!",
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a project.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The requested endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};

export const getProject = async () => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };

  try {
    const res = await $http.get("/project", config);
    // console.log(res.data);
    if (res.status === 200) {
      return {
        status: "success",
        project: res.data.projects,
        count: res.data.count,
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a project.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The requested endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};

export const AddMembers = async (
  values: z.infer<typeof AddTeamMembersSchema>,
  projectId: string
) => {
  const validatedFields = AddTeamMembersSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };
  try {
    const res = await $http.post(
      `/project/${projectId}/addMember`,
      values,
      config
    );
    if (res.status === 200) {
      return {
        status: "success",
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a project.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The requested endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};

export const getPojectdetails = async (id: string) => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };
  try {
    const res = await $http.get(`/project/${id}`, config);
    if (res.status === 200) {
      return {
        status: "success",
        project: res.data.project,
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a project.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The requested endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};

export const deleteProject = async (projectId: string) => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };

  try {
    const res = await $http.delete(`/project/${projectId}`, config);

    if (res.status === 204) {
      return {
        status: "success",
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to delete the project.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The project with the specified ID was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};

export const updateProjectStatus = async (
  projectId: string,
  newStatus?: string
) => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };

  const requestBody = {
    status: newStatus,
  };

  try {
    const res = await $http.patch(`/project/${projectId}`, requestBody, config);

    if (res.status === 200) {
      return {
        status: "success",
        project: res.data.project,
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error:
          "Forbidden. You don't have permission to update the project status.",
      };
    } else if (e?.response?.status === 400) {
      return {
        error: "Sorry, this project does not exist!",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The project with the specified ID was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};
