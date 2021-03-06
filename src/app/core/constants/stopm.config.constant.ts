import {StompConfig} from '@stomp/ng2-stompjs';
import { environment } from '../../../environments/environment';

const stompConfig: StompConfig = {
    // Which server?
    url: `${environment.apiConstrutodo.replace('http','ws')}socket-api`,
  
    // Headers
    // Typical keys: login, passcode, host, token
    headers: {/**/},
  
    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeat_in: 0, // Typical value 0 - disabled
    heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  
    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnect_delay: 5000,
  
    // Will log diagnostics on console
    debug: false
};

export const STOMP_CONFIG = stompConfig;
