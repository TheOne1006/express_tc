angular
.module('theoneAppAdmin.controllers')
.controller('AddCarouselCtrl', ['$scope', '$modalInstance', 'FileUploader', function($scope, $modalInstance, FileUploader){
  $scope.position = 1;
  $scope.imgTitle = '';
  $scope.imgDesc = '';

// 图片上传　&pre view
  var uploader = $scope.uploader = new FileUploader({
    url:'/admin/carousel/add',
    method:'put',
    alias:'carousel',
    queueLimit:2
  });

  uploader.filters.push({
      name: 'onlyOne',
      fn: function() {
        var len = uploader.queue.length;
          if(len){
            uploader.clearQueue();
          }
    // uploader.formData.push({position: $scope.carousel.position});
         return true;
      }
  });

  // 图片完成添加之后
  uploader.onAfterAddingFile = function (fileObj) {
    $scope.mypreview = fileObj._file;
  };

  //上传之前

  $scope.$watch('position', function () {
    uploader.formData[0]= {position:$scope.position};
  });

  $scope.$watch('imgTitle', function () {
    uploader.formData[1]= {imgTitle:$scope.imgTitle};
  });

  $scope.$watch('imgDesc', function () {
    uploader.formData[2]= {imgDesc:$scope.imgDesc};
  });


  $scope.upload = function () {

    console.log('before');

    uploader.uploadItem(0);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}])
