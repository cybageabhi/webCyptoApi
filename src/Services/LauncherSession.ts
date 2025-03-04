import axios from "axios";

// const API_BASE_URL = "http://localhost:4000/api/v1/launchers/prepare";

const API_BASE_URL="https://scimtest.secretservercloud.com/api/v1/launchers/prepare"

const ApiService = {
  async prepareLauncher(secretId: number, siteId: number, launcherTypeId: number, promptFieldValue: string, accessToken: string) {
    try {
      const requestData = {
        launcherTypeId,
        promptFieldValue,
        secretId,
        siteId,
      };
      console.log("start")
      const response = await axios.post(`${API_BASE_URL}`, requestData, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("end");
      return response.data.launcherUrl.sessionGuid;
    } catch (error) {
      console.error("Error in prepareLauncher:", error);
      throw error;
    }
  },
};

export default ApiService;

