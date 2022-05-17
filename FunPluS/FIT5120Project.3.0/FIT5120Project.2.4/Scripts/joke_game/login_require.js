function login_requrie() {
	var x;
	var r = confirm("按下按钮!");
	if (r == true) {
		x = "你按下了\"确定\"按钮!";
		window.location.href = '../../Views/Home/Index.cshtml';

	}
	else {
		x = "你按下了\"取消\"按钮!";
	}
}