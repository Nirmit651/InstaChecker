/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
alert("Script is running");

async function loadJSONFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Load and parse both followers.json and following_1.json
async function loadInstagramData() {
    const followersData = await loadJSONFile('followers_and_following/followers.json');
    const followingData = await loadJSONFile('followers_and_following/following_1.json');

    if (followersData) {
        console.log("Followers Data:", followersData);
    }

    if (followingData) {
        console.log("Following Data:", followingData);
    }
}

// Call the function to load and log the data
loadInstagramData();
console.log('test');
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsU0FBUztBQUN2RDtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQyxjQUFjO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnN0YWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbGVydChcIlNjcmlwdCBpcyBydW5uaW5nXCIpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEpTT05GaWxlKGZpbGVQYXRoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZmlsZVBhdGgpO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCAke2ZpbGVQYXRofWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBMb2FkIGFuZCBwYXJzZSBib3RoIGZvbGxvd2Vycy5qc29uIGFuZCBmb2xsb3dpbmdfMS5qc29uXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRJbnN0YWdyYW1EYXRhKCkge1xyXG4gICAgY29uc3QgZm9sbG93ZXJzRGF0YSA9IGF3YWl0IGxvYWRKU09ORmlsZSgnZm9sbG93ZXJzX2FuZF9mb2xsb3dpbmcvZm9sbG93ZXJzLmpzb24nKTtcclxuICAgIGNvbnN0IGZvbGxvd2luZ0RhdGEgPSBhd2FpdCBsb2FkSlNPTkZpbGUoJ2ZvbGxvd2Vyc19hbmRfZm9sbG93aW5nL2ZvbGxvd2luZ18xLmpzb24nKTtcclxuXHJcbiAgICBpZiAoZm9sbG93ZXJzRGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRm9sbG93ZXJzIERhdGE6XCIsIGZvbGxvd2Vyc0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmb2xsb3dpbmdEYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGb2xsb3dpbmcgRGF0YTpcIiwgZm9sbG93aW5nRGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENhbGwgdGhlIGZ1bmN0aW9uIHRvIGxvYWQgYW5kIGxvZyB0aGUgZGF0YVxyXG5sb2FkSW5zdGFncmFtRGF0YSgpO1xyXG5jb25zb2xlLmxvZygndGVzdCcpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==