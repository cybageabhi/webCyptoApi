import axios from "axios";

// const AUTH_URL = "http://localhost:4000/api/oauth2/token"; // Use the proxy server

const AUTH_URL = "https://scimtest.secretservercloud.com/oauth2/token"; 
const AuthService = {
  async getAccessToken(username: string, password: string): Promise<string> {
    try {
      const requestData = new URLSearchParams();
      requestData.append("grant_type", "password");
      requestData.append("username", username);
      requestData.append("password", password);

      const response = await axios.post(AUTH_URL, requestData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  },
};

export default AuthService;
