import React, { useEffect, useState } from "react";
import CryptoService from "../Services/CryptoService";
import ApiService from "../Services/ApiService";
import LauncherSession from "../Services/LauncherSession"
import GuidService from "../Services/GuidService";
import AuthService from "../Services/GetAccessToken";
const KeyGenerator: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateAndSendKey = async () => {
      try {
        // Generate RSA key pair
        const { publicKey, privateKey } = await CryptoService.generateKeys();
        setPublicKey(publicKey);
        setPrivateKey(privateKey); // Store private key
  
        console.log("Public Key:", publicKey);
        console.log("Private Key:", privateKey); 
        // API parameters
        const secretId = 9681; // Replace with actual value
        const siteId = 0; // Replace with actual value
        const launcherTypeId = 3; // Replace with actual value
        const promptFieldValue = "https%3A%2F%2Fabout.me%2Flogin"; // Replace with actual value

        // Call API to get launcher session ID
        const accessToken=await AuthService.getAccessToken("abhi","Abhi@12345");
        
        console.log("token is "+accessToken);
        
        const { sessionGuid, guid } = await GuidService.getSessionGuid(secretId, siteId, launcherTypeId, promptFieldValue, accessToken);

        console.log("Session GUID:", sessionGuid);
        console.log("GUID:", guid);
        
        const launcherSessionGuid = await LauncherSession.prepareLauncher(secretId, siteId, launcherTypeId, promptFieldValue,accessToken);
       console.log("second call")
        console.log("second call");

        const response = await ApiService.sendPublicKey(publicKey, guid, sessionGuid, launcherSessionGuid,accessToken);
        setApiResponse(response);
        console.log("API Response:", response);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to generate or send public key.");
      } finally {
        setLoading(false);
      }
    };

    generateAndSendKey();
  }, []);

  return (
    <div>
      
      
    
    </div>
  );
};

export default KeyGenerator;
