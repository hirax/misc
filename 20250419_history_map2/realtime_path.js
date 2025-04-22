
let path = [];
function handleLocationUpdate(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const timestamp = new Date().toISOString();
    
    // 座標をパスに追加
    path.push([lat, lng]);
    
    // サーバーに送信するデータ
    const data = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: path.map(coord => [coord[1], coord[0]])
        },
        properties: {
            time: timestamp
        }
    };
    
    // Folium Realtimeにデータを送信
    window.dispatchEvent(new CustomEvent('folium-realtime-update', {
        detail: data
    }));
}

function handleLocationError(error) {
    console.error('Location error:', error);
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(handleLocationUpdate, handleLocationError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
} else {
    console.error('Geolocation is not supported by this browser.');
}
