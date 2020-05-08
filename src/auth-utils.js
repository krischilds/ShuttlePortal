import { UserAgentApplication } from "msal";

// "openid", "profile"
export const LOGIN_SCOPES = ["user.read"];
export const API_SCOPES = [
  "api://c8dff9f7-11c3-4fc1-87f7-8fcbcc8f035f/access_as_user",
];

// "api://888cd003-9dc1-46e7-b5e9-4803ef1de96d/access_as_user",

export const acquireToken = () => {
  const allScopes = [...LOGIN_SCOPES, ...API_SCOPES];
  var userRequest = {
    scopes: API_SCOPES,
  };

  // ["api://888cd003-9dc1-46e7-b5e9-4803ef1de96d/access_as_user"]
  try {
    return msalApp.acquireTokenSilent(userRequest);
  } catch (error) {
    console.log("ERROR " + error);
  }
};

export const fetchAPI = (url, accessToken) => {
  const response = fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer: ${accessToken}`,
    },
  });

  return response;
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "c8dff9f7-11c3-4fc1-87f7-8fcbcc8f035f",
    authority:
      "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:3003/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
});
