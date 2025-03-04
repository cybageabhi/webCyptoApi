import axios from "axios";

const API_BASE_URL = "https://scimtest.secretservercloud.com/api/v1/launchers/secret";

const GuidService = {
  async getSessionGuid(secretId: number, siteId: number, launcherTypeId: number, promptFieldValue: string, accessToken: string) {
    try {
      const requestData = {
        launcherTypeId,
        promptFieldValue,
        secretId,
        siteId,
      };

      const response = await axios.post(`${API_BASE_URL}`, requestData, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log("Session GUID Response:", response.data);
        
        // Return both sessionGuid and guid as an object
        return {
          sessionGuid: response.data.model.sessionGuid,
          guid: response.data.model.guid
        };
      } else {
        throw new Error(response.data.errorMessage || "Failed to get session GUID");
      }
    } catch (error) {
      console.error("Error fetching session GUID:", error);
      throw error;
    }
  },
};

export default GuidService;
