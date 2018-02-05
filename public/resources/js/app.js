
var app = angular.module('products', []);

app.controller('productCTRL', function ($scope, $http) {
    
    $scope.loader = {
        loading: false
    };
    
    $scope.showCreateForm = function () {
        // clear form
        $scope.clearForm();

        // change modal title
        $('#modal-product-title').text('Create New Account');

        // show create product button
        $('#btn-create-product').show();

    };

    // Clear form values
    $scope.clearForm = function () {
//        $scope.id = "";
        $scope.acc_name = "";
        $scope.master_acc_name = "";
        $scope.region= "";
        $scope.modalstatustext = "";
    };
    
    // Hide Form fields 
    $scope.hideFormFields = function () {
        $('#form-dinminder').hide();
    };
    
    // Show Form fields 
    $scope.showFormFields = function () {
        $('#form-dinminder').show();
    };

    //Read all entries
    $scope.getAll = function () {
        
        $scope.loader.loading = true;
        
        $http.get("api/list")
            .success(function (response) {
                if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no added accounts.";
					$scope.loader.loading = false;
				} else {
					$scope.names = response.products;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.statustext = "There was an error fetching data, please check database connection.";
            });
    };

    // Create Product
    $scope.createProduct = function () {
        
        $scope.loader.loading = true;
        
        $http.post('/api/insert', {
            'acc_name' : $scope.acc_name,
            'master_acc_name' : $scope.master_acc_name,
            'region' : $scope.region
        })
            .success(function (response) {
				 if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "Record already exists! Please do search for the details, or try entering new details again.";
					//$scope.loader.loading = 2;
				} else{
                // close modal
                $('#myModal').modal('hide');
				//console.log(result)
				
                // clear modal content
                $scope.clearForm();

                // refresh the product list
                $scope.getAll();}
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.modalstatustext = "Sorry, unable to add Account Details.";
            });
    };
	
});