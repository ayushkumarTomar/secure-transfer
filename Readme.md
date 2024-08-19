# [SecureTransfer](https://securetransfer.vercel.app)
Securely transfer files peer-to-peer (P2P) in encrypted chunks using AES-GCM.


### STUN and TURN Servers
For optimal performance, especially behind restrictive NATs or firewalls, configure your own STUN and TURN servers:

STUN: Discovers public IPs and ports for direct P2P connections.
TURN: Relays data when direct connections are blocked or unreliable.
Note: TURN servers may be used if NAT is restricted.

### Configuration
1. **Obtain Server Information**: Use public servers for testing or set up your own for production. You can get one free from [here](https://www.metered.ca/stun-turn)
2. **Integrate Servers**: Update WebRTC configuration in your application in config/config.ts.
   ```javascript
   const configuration = {
     iceServers: [
       { urls: 'stun:stun.example.org' },
       {
         urls: 'turn:turn.example.org',
         username: 'yourUsername',
         credential: 'yourPassword'
       }
     ]
   };
   ```
3. **Test the Configuration**: Ensure connections are stable in various network environments.

## Features

- **P2P** 
- **File Sent in Chunks**
- **Chunks are encrypted**





