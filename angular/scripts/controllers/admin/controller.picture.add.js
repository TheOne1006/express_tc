angular.module('theoneAppAdmin.controllers')

  .controller('AddPictureCtrl', ['$scope', '$modalInstance', 'FileUploader', function ($scope, $modalInstance, FileUploader) {

      $scope.kind = 'article';
      $scope.imgtitle = 'pic';

      var formDataArr = [{
          kind:$scope.kind,
          imgTitle:$scope.imgtitle
        }];

    // 图片上传　&pre view
      var uploader = $scope.uploader = new FileUploader({
        url:'/admin/picture/add',
        method:'put',
        alias:'picture',
        formData:formDataArr
      });


      $scope.upload = function () {

      uploader.queue[0].formData =[{
          kind:$scope.kind,
          imgTitle:$scope.imgtitle
        }];
      console.log(uploader);

        uploader.uploadAll();
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };


      // 图片完成添加之后
      uploader.onAfterAddingFile = function (fileObj) {
        $scope.mypreview = fileObj._file;
      };


  }])
  ;
