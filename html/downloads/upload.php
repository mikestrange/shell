<?php 
//utf-8格式
header("Content-type:text/html;charset=utf-8");
//当前目录
define('ROOT',dirname(__FILE__).'/');  
//
$root_path = ROOT;
//--
$path = ROOT."temp/";
//判断目录存在否，存在给出提示，不存在则创建目录
if (is_dir($path)){  
	echo "目录[$path]已经存在,无需再创建<br/>";
}else{ 
	if (mkdir($path, 0777, true))
	{
		echo "目录[$path]创建成功<br/>";
	}else{
		echo "目录[$path]创建失败<br/>";
	}
}

//定义下载目录
$root_path = $path;
//打印post
print_r($_POST);
//
if(is_uploaded_file($_FILES['upfile']['tmp_name']))
{  
	$error = $_FILES['upfile']["error"];//上传后系统返回的值
	//获取数组里面的值 
	$name = $_FILES["upfile"]["name"];//上传文件的文件名 
	$type = $_FILES["upfile"]["type"];//上传文件的类型 
	$size = $_FILES["upfile"]["size"];//上传文件的大小 
	$tmp_name = $_FILES['upfile']['tmp_name'];//上传临时文件地址
	$save_file = $root_path.basename($name);//保存后台地址
	echo "upload start : error = ".$error."<br/>";
	if($error == 0)
	{
		echo "================<br/>"; 
		echo "上传路径是：".$root_path."<br/>"; 
		echo "上传文件名称是：".basename($name)."<br/>"; 
		echo "上传文件类型是：".$type."<br/>"; 
		echo "上传文件大小是：".$size."<br/>"; 
		echo "上传文件的临时存放路径是：".$tmp_name."<br/>"; 
		echo "上传文件的保存路径：".$save_file."<br/>"; 
		echo "开始移动上传文件<br/>"; 
		//把上传的临时文件移动到up目录下面 
		if(move_uploaded_file($_FILES['upfile']['tmp_name'], $save_file)){
			echo "文件上传成功啦！"; 
			echo "文件名:".$save_file;
		}else{
			echo "#####文件上传失败:权限问题#####";
		} 
	}
}else{
	echo "#####文件上传失败:存在临时文件#####";
}

?>