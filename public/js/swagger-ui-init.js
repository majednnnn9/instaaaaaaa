
window.onload = function() {
    // Build a system
    var url = window.location.search.match(/url=([^&]+)/);
    if (url && url.length > 1) {
      url = decodeURIComponent(url[1]);
    } else {
      url = window.location.origin;
    }
    var options = {
    "swaggerDoc": {
      "openapi": "3.0.0",
      "info": {
        "version": "1.0.0",
        "title": "Simple Swagger Setup",
        "description": "A simple swagger documentation setup",
        "connect": {
          "name": "Kingsley"
        },
        "servers": [
          "http://localhost:4100"
        ]
      },
      "schemes": [
        "http",
        "https"
      ],
      "paths": {
        "/api/profile/{limit}/{skip}": {
          "patch": {
            "summary": "Fetch user profile details",
            "description": "fetch profile details of a user",
            "tags": [
              "Profile"
            ],
            "parameters": [
              {
                "in": "query",
                "name": "limit",
                "schema": {
                  "type": "integer"
                },
                "description": "Number of cars to fetch per page"
              },
              {
                "in": "query",
                "name": "skip",
                "schema": {
                  "type": "integer"
                },
                "description": "Number of cars to skip"
              }
            ],
            "responses": {
              "200": {
                "description": "User profile fetch successfuly"
              },
              "400": {
                "description": "unable to fetch user profile data"
              }
            }
          }
        },
        "/api/v1/auth/login": {
          "post": {
            "summary": "Fetch user profile details",
            "description": "fetch profile details of a user",
            "tags": [
              "Authentiction User"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "tyep": "string",
                        "example": "string"
                      },
                      "password": {
                        "tyep": "string",
                        "example": "string"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "User profile fetch successfuly"
              },
              "400": {
                "description": "Email or password is incorrect"
              }
            }
          }
        },
        "/api/v1/auth/rigester": {
          "get": {
            "summary": "Fetch user profile details",
            "description": "fetch profile details of a user",
            "tags": [
              "Authentiction User"
            ],
            "security": [
              {
                "basicAuth": []
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "email": "string",
                        "example": "email@gmail.com"
                      },
                      "name": {
                        "tyep": "string",
                        "example": "string"
                      },
                      "password": {
                        "tyep": "string",
                        "example": "string"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "User profile fetch successfuly"
              },
              "400": {
                "description": "Email or password is incorrect"
              }
            }
          }
        }
      },
      "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer"
          },
          "basicAuth": {
            "type": "http",
            "scheme": "basic"
          }
        }
      },
      "tags": []
    },
    "customOptions": {}
  };
    url = options.swaggerUrl || url
    var urls = options.swaggerUrls
    var customOptions = options.customOptions
    var spec1 = options.swaggerDoc
    var swaggerOptions = {
      spec: spec1,
      url: url,
      urls: urls,
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    }
    for (var attrname in customOptions) {
      swaggerOptions[attrname] = customOptions[attrname];
    }
    var ui = SwaggerUIBundle(swaggerOptions)
  
    if (customOptions.oauth) {
      ui.initOAuth(customOptions.oauth)
    }
  
    if (customOptions.preauthorizeApiKey) {
      const key = customOptions.preauthorizeApiKey.authDefinitionKey;
      const value = customOptions.preauthorizeApiKey.apiKeyValue;
      if (!!key && !!value) {
        const pid = setInterval(() => {
          const authorized = ui.preauthorizeApiKey(key, value);
          if(!!authorized) clearInterval(pid);
        }, 500)
  
      }
    }
  
    if (customOptions.authAction) {
      ui.authActions.authorize(customOptions.authAction)
    }
  
    window.ui = ui
  }
  