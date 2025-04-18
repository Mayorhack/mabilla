(function () {
    require.config({
        paths: {
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'angular': '../bower_components/angular/angular.min',
            'angular-resource': '../bower_components/angular-resource/angular-resource.min',
            'angular-route': '../bower_components/angular-route/angular-route.min',
            'angular-translate': '../bower_components/angular-translate/angular-translate.min',
            'angular-translate-loader-static-files': '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
            'angular-mocks': '../bower_components/angular-mocks/angular-mocks.min',
            'angularui': '../bower_components/angular-bootstrap/ui-bootstrap.min',
            'angularuitpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
            'underscore': '../bower_components/underscore/underscore.min',
            'webstorage': '../bower_components/angular-webstorage/angular-webstorage.min',
            'require-css': '../bower_components/require-css/css',
            'd3': '../bower_components/d3/d3.min',
            'nvd3': '../bower_components/nvd3/nv.d3.min',
            'nvd3ChartDirectives': '../scripts/modules/angularjs-nvd3-directives',
            'styles': '../styles',
            'test': '../test/functional',
            'notificationWidget': '../scripts/modules/notificationWidget',
            'modified.datepicker': '../scripts/modules/datepicker',
            'configurations': '../scripts/modules/configurations',
            'angularFileUpload': '../bower_components/angularjs-file-upload/ng-file-upload.min',
            'angularFileUploadShim': '../bower_components/angularjs-file-upload/ng-file-upload-shim.min',
             'ngSanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
            'ckEditor': '../bower_components/ckeditor/ckeditor',
            'ngIdle': '../bower_components/ng-idle/angular-idle.min',
            'LocalStorageModule': '../scripts/modules/localstorage',
            'ngCsv': "../scripts/modules/csv",
            'chosen.jquery.min': "../scripts/modules/chosen.jquery.min",
            'frAngular': '../scripts/modules/KeyboardManager',
            'Q': '../bower_components/q/q.min',
            'tmh.dynamicLocale': '../bower_components/angular-dynamic-locale/tmhDynamicLocale.min',
            'webcam-directive':'../bower_components/webcam-directive/dist/webcam.min',
            'angular-wizard': '../scripts/modules/angular-wizard',
            'angular-utils-pagination':'../bower_components/angular-utils-pagination/dirPagination.min',
            'ng-scrollbar':'../bower_components/ng-scrollbar/dist/ng-scrollbar.min'
        },
        shim: {
            'angular': { deps: ['jquery','chosen.jquery.min'], exports: 'angular' },
            'angular-resource': { deps: ['angular'] },
            'angular-route': { deps: ['angular'] },
            'angular-translate': { deps: ['angular'] },
            'angular-translate-loader-static-files': {deps: ['angular' , 'angular-translate'] },
            'angularui': { deps: ['angular'] },
            'angularuitpls': { deps: ['angular' , 'angularui' ] },
            'angular-mocks': { deps: ['angular'] },
            'webstorage': { deps: ['angular'] },
            'd3': {exports: 'd3'},
            'nvd3': { deps: ['d3']},
            'nvd3ChartDirectives': {deps: ['angular', 'nvd3']},
            'configurations': {deps: ['angular']},
            'notificationWidget': {deps: ['angular', 'jquery'], exports: 'notificationWidget'},
            'angularFileUpload': {deps: ['angular', 'jquery', 'angularFileUploadShim'], exports: 'angularFileUpload'},
            'modified.datepicker': {deps: ['angular']},
            'ngSanitize': {deps: ['angular'], exports: 'ngSanitize'},
            'ckEditor': {deps: ['jquery']},
            'ngIdle': {deps: ['angular']},
            'LocalStorageModule': {deps: ['angular']},
            'ngCsv': {deps: ['angular']},
            'chosen.jquery.min': {deps: ['jquery']},
            'frAngular': {deps: ['angular']},
            'Q': {deps: ['angular']},
            'tmh.dynamicLocale': {deps: ['angular']},
            'webcam-directive': {deps: ['angular']},
            'angular-wizard': {deps: ['angular', 'underscore']},
            'angular-utils-pagination': {deps: ['angular']},
            'ng-scrollbar': {deps: ['angular']},
            'mifosX': {
                deps: [
                    'angular',
                    'jquery',
                    'angular-route',
                    'angular-resource',
                    'angular-translate',
                    'angular-translate-loader-static-files',
                    'angularui',
                    'angularuitpls',
                    'webstorage',
                    'nvd3ChartDirectives',
                    'notificationWidget',
                    'angularFileUpload',
                    'modified.datepicker',
                    'ngSanitize',
                    'ckEditor',
                    'ngIdle',
                    'configurations',
                    'LocalStorageModule',
                    'angularFileUploadShim',
                    'ngCsv',
                    'chosen.jquery.min',
                    'frAngular',
                    'Q',
                    'tmh.dynamicLocale',
                    'angular-wizard',
                    'webcam-directive',
                    'angular-utils-pagination',
                    'ng-scrollbar'
                ],
                exports: 'mifosX'
            }
        },
        packages: [
            {
                name: 'css',
                location: '../bower_components/require-css',
                main: 'css'
            }
        ]
    });

    require(['mifosXComponents.d4249160', 'mifosXStyles.af080b9f'], function (componentsInit) {
        componentsInit().then(function(){
            require(['test/testInitializer'], function (testMode) {
                if (!testMode) {
                    angular.bootstrap(document, ['MifosX_Application']);
                }
            });
        });
    });
}());
