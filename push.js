var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNRhK08L0bEjjEfIeXJ6J1_uJJyzUp3xU99xPZfIMaGmtX1ejlkzD1DsGjXEZK1-zb1uaiBld7uJpNSTcsmIC2s",
    "privateKey": "1o0auvgMFBaPiemR_iyyqDc_hrHy-ixVbE5AXrn0dwI"
}

webPush.setVapidDetails(
    'mailto:kodekite@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/dNOhwNIa-JY:APA91bFSTUViTppfWOiktR6I_wTnA5cw_q_nHFScxVakqK16Qmt5_C6veD5bOIQEK3OyH_t1uio8otzMJTzMamycwPCIdQp9Q66aF1pKku0RwJMyvv8Ui2cxUDmyqIgGqODZ6uLaCu7O",
    "keys": {
        "p256dh": "BM2kaUn/pISX7M3MZzmSJFtKWotSd0F8XPBvvTgqvMBai8UR1WxE4GlveVgM0TxxLsesnF/f+ayKlylOyw/IgYo=",
        "auth": "04/Q1tKuK+0rlEYLCv4rgA=="
    }
}

var payload = 'Now playing: Chelsea vs Persija';

var options = {
    gcmAPIKey: "305826329615",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);