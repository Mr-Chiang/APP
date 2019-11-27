var data;
var finish;

export default{
	success:function(res){
		this.data = res;
		this.finish = true;
	},
	
	init:function(fun,data=null){
		this.finish = false;
		eval('this.'+fun+"(data)")
		while(!this.finish){
			
		}
		return this.data;
	},	
	
	
	  // 从相册中选择图片
	galleryImg:async function (callback) {
		var that = this;
			await plus.gallery.pick(function(path){
				// that.createUpload(path);
				// that.success(path);
				callback({status:true,data:path})
			}, function ( e ) {
				callback({status:false,msg:'取消选择图片！'})
			}, {filter:"image"} );		
		},
		
		// 从相册中选择多张图片 
	galleryImgs:function (){		
			var that = this;
			plus.gallery.pick( function(e){
				that.result(e.files);
				// for(var i in e.files){
				// 	console.log(e.files[i]);
				// }
			}, function ( e ) {
				console.log( "取消选择图片" );
			},{filter:"image",multiple:true});
		},		
		
		// 创建上传任务
	createUpload:function (path,url,callback) {
		console.log('图片上传中！')
			var that = this;
			// var task = plus.uploader.createUpload(that.apis.upload_image, 
			var task = plus.uploader.createUpload(url, 
				{ method:"POST",blocksize:204800,priority:100 },
				function ( t, status ) {
					// 上传完成
					if ( status == 200 ) { 
						var res = JSON.parse(task.responseText);
						callback({status:true,data:res});
						
					} else {
						callback({status:false,msg:'图片上传失败！'});
					}
				}
			);
			task.addFile(path, {key:"file"} );
			// task.addData( "string_key", "string_value" );
			//task.addEventListener( "statechanged", onStateChanged, false );
			task.start();
		}
}