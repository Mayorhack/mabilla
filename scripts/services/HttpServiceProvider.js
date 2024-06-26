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
              self[method] = function (url, data) {
                var config = getConfig({
                  method: method.toUpperCase(),
                  url: url,
                  data: data,
                });
                return http(config);
              };
            });
            this.setAuthorization = function (key, isOauth) {
              if (isOauth) {
                http.defaults.headers.common.Authorization = "bearer " + key;
              } else {
                http.defaults.headers.common.Authorization = "Basic " + key;
              }
              http.defaults.headers.common["x-source-code"] = "PRODMOBILEAPP";
              http.defaults.headers.common["x-client-id"] =
                "lL/2C0OVKYOBfGqdvZuoUl6XDAYx9J2l43yGEAb9XcXzQsUCB31N5iY0RojaHuOTqOKBI7tGpndt43KDwg1CwQ==";
              http.defaults.headers.common["x-client-secret"] =
                "501L3Xh6kjv4ll5B+TIj6iZRVOTesp/Zi0uQc8LSsH6HOwJvWkO9j/eZCDnW/YLdkCdVOtG7kLrG01BcewIm7rkmueuxVfRtixuHDFF7HyeFlA0mLn41RX2DrMmaxR9+I/Qwv3sqFvpa/o5jlmNwzKYV4tFODxrahgSdqC5CU02ju5MJiayrdkQGQYNKnLb0iHPYOoQzZ0nyCVxHTRoMiG6gznK58NMyKWkiAwEFky4rcusn403Gnf09/IAEq8ZEbfXJ0vFSFTMrnEebHxjF2A==";
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
