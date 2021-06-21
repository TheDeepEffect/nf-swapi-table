/**
 * @description All the http request methods are defined here
 */

const GET = async ({ url }) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(response);
  } catch (error) {
    throw new Error(error);
  }
};

export default GET;
