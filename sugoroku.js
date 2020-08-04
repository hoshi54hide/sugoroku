
img = new Array("★", "◆", "●", "■");
koma = new Array();
goal = 23;
leftValue = 0;

restart();

function restart() {
	user_num = 0;
	pre_num = 0;
	pre_r = 0;
	timer = 0;
	leftValue = 0;

	for (i = 0; i < 4; i++) {
		document.getElementById("brd" + i).innerHTML = img[i];
		koma[i] = 0;
	}

	sai_reset();
}

function getNum(num) {
	clearTimeout(timer);
	document.getElementById("sai" + pre_num).innerHTML = pre_r;
	pre_num = num;
	pre_r = r;
	document.getElementById("sai" + num).innerHTML = "<font color='#FF0000'>" + r + "</font>";
	koma[num] += r;
	var s = "";
	for (i = 0; i < koma[num]; i++) {
		s += "🐾🐾";
	}
	document.getElementById("brd" + num).innerHTML = s + img[num];
	if (koma[num] < goal) {
		sai_next();
	} else {
		goalin();
	}
}

function goalin() {
	alert("ゴール！！\n優勝は" + document.form1.elements["user" + user_num].value + "さんです。");
	// リロードをさせて最初に戻す様にしています。
	// もし不都合があれば変更をお願いします。
	document.location.reload()
	// restart();
}

function sai_next() {
	user_num++;
	if (user_num == 4) user_num = 0;
	var s = document.form1.elements["user" + user_num].value;
	if (s != "") {
		sai_reset();
	} else {
		if (user_num != pre_num) {
			sai_next();
		} else {
			sai_reset();
		}
	}
}

function sai_reset() {
	document.form1.btn0.disabled = true;
	document.form1.btn1.disabled = true;
	document.form1.btn2.disabled = true;
	document.form1.btn3.disabled = true;
	document.form1.elements["btn" + user_num].disabled = false;
	sai_start();
}

function sai_start() {
	r = Math.floor(Math.random() * 6) + 1;
	if (user_num != pre_num || pre_r == 0) document.getElementById("sai" + user_num).innerHTML = r;
	timer = setTimeout("sai_start()", 100);
}

// 残りのマスを計算する関数
function getLeftVal() {
	// サイコロの値を取得
	var number = document.getElementById("sai0").textContent;
	// 最初のマスはgoal値から引いていく
	if (leftValue === 0) {
		leftValue = goal - number;
	} else {
		leftValue = leftValue - number;
	}
	// 計算結果をid=leftvalに表示
	document.getElementById("leftVal").innerHTML = leftValue;
}
