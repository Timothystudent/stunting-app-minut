import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Animated } from "react-native";
import { WebView } from "react-native-webview";
import geoData from "../data/geoData.json";

const MapView = ({ navigation }) => {
  const webViewRef = useRef(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const mapHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; width: 100%; }
      #map { height: 100%; width: 100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map').setView([-6.1754, 106.8201], 10);

      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZhD5en5bTNPf7VzQe9L9', {
        attribution: '© MapTiler & OpenStreetMap',
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(map);

      var geoJsonLayer;

      function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.on('click', function () {
            const detail = {
              id: feature.properties.id,
              name: feature.properties.name,
              keterangan: feature.properties.keterangan,
              persentase: feature.properties.persentase
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(detail));
          });
        }
      }

      window.addEventListener("message", function(event) {
        try {
          var geojsonData = JSON.parse(event.data);
          if (geoJsonLayer) {
            map.removeLayer(geoJsonLayer);
          }

          geoJsonLayer = L.geoJSON(geojsonData, {
            onEachFeature: onEachFeature,
            style: function(feature) {
              const p = parseFloat(feature.properties.persentase);
              let fillColor = '#4daf4a';

              if (p > 50) fillColor = '#e31a1c';
              else if (p > 30) fillColor = '#ff7f00';
              else if (p > 0) fillColor = '#ffff00';

              return {
                fillColor: fillColor,
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
              };
            }
          }).addTo(map);

          try {
            map.fitBounds(geoJsonLayer.getBounds());
          } catch (e) {
            console.error("Error fitting bounds:", e);
          }
        } catch (e) {
          console.error("GeoJSON error:", e);
        }
      });
    </script>
  </body>
  </html>
`;

  const sendGeoJsonToWebView = () => {
    if (webViewRef.current) {
      console.log('Mengirim GeoJSON ke WebView:', geoData);
      const geoJsonString = JSON.stringify(geoData);
      const script = `
        (function() {
          try {
            window.postMessage(${JSON.stringify(geoJsonString)}, '*');
          } catch(e) {
            console.error('Error sending GeoJSON:', e);
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(script);
      setIsLoading(false);
    } else {
      console.error('WebView ref tidak tersedia');
      setError('Gagal memuat peta');
      setIsLoading(false);
    }
  };

  const handleMessage = (event) => {
    try {
      const detail = JSON.parse(event.nativeEvent.data);
      console.log('Data diterima dari WebView:', detail);
      setSelectedInfo(detail);
    } catch (e) {
      console.error("Gagal parsing data detail:", e);
      setError('Gagal memuat data wilayah');
    }
  };

  useEffect(() => {
    if (selectedInfo) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedInfo]);

  const closeInfoPanel = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedInfo(null);
    });
  };

  const goToDetailPage = () => {
    console.log('Navigasi ke DetailWilayah dengan info:', selectedInfo);
    closeInfoPanel();
    navigation.navigate('DetailWilayah', { info: selectedInfo });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text>Memuat peta...</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        originWhitelist={["*"]}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={sendGeoJsonToWebView}
        onMessage={handleMessage}
      />
      {selectedInfo && (
        <Animated.View style={[styles.infoPanel, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.infoTitle}>{selectedInfo.name}</Text>
          <Text style={styles.infoText}>{selectedInfo.keterangan}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={goToDetailPage} style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Lihat Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeInfoPanel}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#cc0000',
    textAlign: 'center',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#444', marginBottom: 12 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailButtonText: { color: '#fff', fontWeight: 'bold' },
  closeText: { color: '#007bff', fontWeight: 'bold' },
});

export default MapView;