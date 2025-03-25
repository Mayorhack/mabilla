(function (module) {
  mifosX.services = _.extend(module, {
    HttpServiceProvider: function () {
      var requestInterceptors = {};

      this.addRequestInterceptor = function (id, interceptorFn) {
        requestInterceptors[id] = interceptorFn;
      };

      this.removeRequestInterceptor = function (id) {
        delete requestInterceptors[id];
      };

      this.$get = [
        "$http",
        function (http) {
          var HttpService = function () {
            var getConfig = function (config) {
              return _.reduce(
                _.values(requestInterceptors),
                function (c, i) {
                  return i(c);
                },
                config
              );
            };

            var self = this;
            _.each(["get", "delete", "head"], function (method) {
              self[method] = function (url) {
                var config = getConfig({
                  method: method.toUpperCase(),
                  url: url,
                });
                return http(config);
              };
            });
            _.each(["post", "put"], function (method) {
              self[method] = function (url, data, headers) {
                var config = getConfig({
                  method: method.toUpperCase(),
                  url: url,
                  data: data,
                  headers: headers,
                });
                return http(config);
              };
            });
            this.setAuthorization = function (key, isOauth) {
              if (isOauth) {
                http.defaults.headers.common.Authorization = "bearer " + key;
              } else {
                http.defaults.headers.common.Authorization = "Basic " + key;
                http.defaults.headers.common["x-source-code"] = "PRODMOBILEAPP";
                http.defaults.headers.common["x-client-id"] =
                  "LIV_PRODMOBILEAPP_558763550576155756010023806468";
                http.defaults.headers.common["x-client-secret"] =
                  "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJQUk9ETU9CSUxFQVBQIiwiaWF0IjoxNzA3ODU3NzE2LCJzdWIiOiJQUk9ETU9CSUxFQVBQIiwiaXNzIjoiUFJPRE1PQklMRUFQUCIsImV4cCI6MTcwNjA2NjAxOX0.H2ZEHs03RpaQ_rASkBJupl8xwicnkomDomsOX2HN93s";
              }
            };

            this.cancelAuthorization = function () {
              delete http.defaults.headers.common.Authorization;
              delete http.defaults.headers.common[
                "Fineract-Platform-TFA-Token"
              ];
            };

            this.setTwoFactorAccessToken = function (token) {
              http.defaults.headers.common["Fineract-Platform-TFA-Token"] =
                token;
            };
            this.setOTPToken = function (token) {
              console.log("otp set");

              http.defaults.headers.common["otp"] = token;
            };
          };
          return new HttpService();
        },
      ];
    },
  });
  mifosX.ng.services
    .config(function ($provide) {
      $provide.provider("HttpService", mifosX.services.HttpServiceProvider);
    })
    .run(function ($log) {
      $log.info("HttpService initialized");
    });
})(mifosX.services || {});
