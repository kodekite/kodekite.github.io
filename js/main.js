    // Register Service Worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register('../service-worker.js')
                .then(function() {
                    console.log("Pendaftaran ServiceWorker berhasil");
                })
                .catch(function () {
                    console.log("Pendaftaran ServiceWorker gagal");
                    
                });
        });
    }else {
        console.log("ServiceWorker belum didukung browser ini.");            
    }

    document.addEventListener("DOMContentLoaded", function() {
        getTeams(); 
    });

    if ('Notification' in window) {
        requestPermission();
    }else {
        console.log('This browser is not supported notification');
    }

    // Notification
    function requestPermission() {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log('Notification is not allowed');
                return;
            }else if(result === 'default'){
                console.log('Permission popup is closed');
            }
            
            console.log('Notification is allowed');

            navigator.serviceWorker.getRegistration().then(function(reg) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BNRhK08L0bEjjEfIeXJ6J1_uJJyzUp3xU99xPZfIMaGmtX1ejlkzD1DsGjXEZK1-zb1uaiBld7uJpNSTcsmIC2s")
                    }).then(function(subscribe) {
                        console.log('Success subscribe with endpoint : ' , subscribe.endpoint);
                        console.log('Success subscribe with p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))); 
                        console.log('Success subscribe with auth: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))); 
                    }).catch(function(e) {
                        console.log('Cannot subscribe ' , e.message);
                    })
                });
            })
        })
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4 );
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }