//Will be used to store and get the user id between different pages
let userId = null;

export const setUserId = (id) => {
  userId = id;
};

export const getUserId = () => {
  return userId;
};