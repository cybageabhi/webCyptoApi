export default class ApiService {
    static async sendPublicKey(
        publicKey: string, 
        guid: string, 
        sessionGuid: string, 
        launcherSessionGuid: string, 
        accessToken: string // Add access token parameter
    ) {
        const xmlPayload = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:thesecretserver.com">
            <soap:Body>
                <urn:GetSymmetricKey>
                    <urn:guid>${guid}</urn:guid>
                    <urn:sessionGuid>${sessionGuid}</urn:sessionGuid>
                    <urn:launcherSessionGuid>${launcherSessionGuid}</urn:launcherSessionGuid>
                    <urn:publicKeyBlob>${publicKey}</urn:publicKeyBlob>
                </urn:GetSymmetricKey>
            </soap:Body>
        </soap:Envelope>`;

        const response = await fetch("http://localhost:4000/api/Rdp/v2/rdpwebservice.asmx", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`, // Pass the bearer token
                "Content-Type": "text/xml",
                "SOAPAction": "urn:thesecretserver.com/GetSymmetricKey",
            },
            body: xmlPayload,
        });

        return response.text(); // SOAP responses are usually in XML format
    }
}
