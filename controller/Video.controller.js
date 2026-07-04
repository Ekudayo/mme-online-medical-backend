// Example: videoController.js or a route definition file
// import Twilio from "twilio/lib/rest/Twilio";

// import Twilio from "twilio/lib/rest/Twilio";

import Twilio from "twilio";
// const twilio = require("twilio");

// IMPORTANT: Load these securely from environment variables (process.env)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = process.env.TWILIO_API_KEY; // The SK... SID
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET; // The SECRET for the SK...

// This function acts as your MVC Controller Action
export const getAccessToken = (req, res) => {
  // 1. Get the room name (Appointment ID) and user identity from the client request
  // This assumes query parameters: /api/video/token?roomId=Apt123&identity=Patient456
  const { roomId, identity } = req.query;

  if (!roomId || !identity) {
    return res
      .status(400)
      .send({ error: "Room ID and Identity are required." });
  }

  // 2. Create the Access Token Generator
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  // Create the token instance
  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY, // Use the API Key SID (SK...)
    TWILIO_API_SECRET, // Use the API Key Secret
    { identity: identity } // Identify the user
  );

  // 3. Grant video access to the specific room
  const videoGrant = new VideoGrant({
    room: roomId,
  });
  token.addGrant(videoGrant);

  // 4. Send the secure JWT token back to the React client
  res.send({ token: token.toJwt() });
};

// Example of defining the route in Express:
// router.get('/api/video/token', getAccessToken);

// module.exports = {
//   getAccessToken,
// };
