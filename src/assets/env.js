// (function(window) {
//     window["env"] = window["env"] || {};

//     // Environment variables
//     window["env"]["apiUrl"] = "https://api.myapp.com";
//     window["env"]["issuer"] = "https://test";
//     window["env"]["realm"] = "realm";
//     window["env"]["clientId"] = "client";
// })(this);


(function(window) {
    window["env"] = window["env"] || {};
    console.log(window["env"]);
    // Environment variables
    window["env"]["apiUrl"] = "http://localhost:8080/api";
})(this);