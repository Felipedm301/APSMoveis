/* services da PedidaApp */
/* PS. Em uma App complexa, crie arquivos separados para cada service */

angular.module('starter').service('ProdutosService', function ($http, $q) {


	var url = 'http://cozinhapp.sergiolopes.org/produtos?random=1';

	// sempre dispara o serviço pra checar dados mais recentes
	var promise = $http.get(url,{timeout: 5000}).then(function (response) {
		//$rootScope.$broadcast('produtos-atualizados',	response.data);
		var json = JSON.stringify(response.data);
		localStorage.setItem('cache', json);
		return response.data;
	}).catch(function () {
		return JSON.parse(localStorage.getItem('cache'));
	});

	// procura no localStorage
	var cache = localStorage.getItem('cache');
	if (cache != null) {
		promise = $q(function (resolve, reject) {
			resolve(JSON.parse(cache));
		});
	}

	return {
		lista: function () {
			return promise;
		}
	};

});