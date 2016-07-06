'use strict';

export default function viewLoading($rootScope, loadingService) {
    return {
        restrict:'E',
        template:'<h2 class="text-center loading" ng-if="root.loading.isViewLoading">Загрузка...</h2>',
        link:function(scope, elem, attrs){

            $rootScope.$on('$routeChangeStart', function(){
                loadingService.isViewLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function(){
                loadingService.isViewLoading = false;
            });
        }
    };
}

viewLoading.$inject = ['$rootScope', 'loadingService'];