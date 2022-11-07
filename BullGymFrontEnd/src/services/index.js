//proyecto antiguo no tengo el token, lo quito para probar
export const getAllExercisesService = async (
  type = "",
  muscle_group = "",
  token
) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises?type=${type}&muscle_group=${muscle_group}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.exercises;
};

export const getSingleExerciseService = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  console.log("pasa el json", json);

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const registerUserService = async ({ name, email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.message;
};

export const getUserDataService = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${id}`);

  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
export const getMyUserDataService = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data.user;
};

export const logInUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const sendExercicseService = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/exercises`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  console.log(json.data.exercise);

  return json.data.exercise;
};

export const addFavoriteService = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${id}/favs`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );

  const favs = await response.json();

  if (!response.ok) {
    throw new Error(favs.message);
  }

  return favs;
};

export const likeExerciseService = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${id}/likes`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );

  const likes = await response.json();

  if (!response.ok) {
    throw new Error(likes.message);
  }

  return likes;
};

export const deleteExerciseService = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
