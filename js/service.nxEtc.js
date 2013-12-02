function nxScrollText(strLayerID, n4Interval)
{
	NxControl.apply(this, arguments);
	
	this.n4Interval = n4Interval?n4Interval:200;
	this.n4Index = 0;
	this.strText = '';
	this.setText=function(strText)
	{
		this.n4Index=0;
		this.frmLayer.innerHTML = strText;
		this.strText = strText;
		this.doScroll();
	}
	
	this.doScroll=function()
	{
		this.n4Index++;
		this.frmLayer.innerHTML = this.strText.substring(0,this.n4Index);
		if(this.strText.length>this.n4Index)		
			setTimeout("try{document.getElementById('"+this.id+"').NxControl.doScroll();}catch(e){}", this.n4Interval);
	}
}
NxControl.prototype = new NxControl();
NxControl.prototype.constructor = NxControl;

function nxGeneralFaceControl(strLayerID, owner, n4GeneralSN)
{
	NxControl.apply(this, arguments);
	
	if(!n4GeneralSN)
		return;
	
	this.setWidth(64);
	this.setHeight(82);
	this.setLeft(0);
	this.setTop(0);
	//this.src = 'http://nexen.pe.kr/img/face/general/10.jpg';
	this.setLayerIndex(10000);//nxLayer.n4Layer_ButtonText);
	this.n4GeneralSN	= n4GeneralSN;
	this.strGeneralName = '';
	
	this.loadPic=function(n4GeneralSN)
	{
		this.n4GeneralSN=n4GeneralSN?n4GeneralSN:this.n4GeneralSN
		var cmd = new nxCommand(null, this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetInfo);
		cmd.addParam("n4GeneralSN", this.n4GeneralSN);
		cmd.execute(callBackGeneralInfo);
	}
	
	function callBackGeneralInfo(xml, strText, FaceControl)
	{
		var ds = new NxDataSet(xml);
		FaceControl.src = 'http://nexen.pe.kr/img/face/general/'+ds.rows[0].get("strGeneralPicName");
		FaceControl.strGeneralName = ds.rows[0].get("strGeneralName");
		FaceControl.show();
		
	}
	
	if(!n4GeneralSN)
		return;
	else
		this.loadPic(n4GeneralSN);
	
}	
nxAmountBar.prototype = new NxControl();
nxAmountBar.prototype.constructor = nxAmountBar;

function nxMasterFaceControl(strLayerID, owner, n4MasterSN)
{
	NxControl.apply(this, arguments);
	
	this.setWidth(64);
	this.setHeight(82);
	this.setLeft(0);
	this.setTop(0);
	//this.src = 'http://nexen.pe.kr/img/face/general/10.jpg';
	this.setLayerIndex(10000);//nxLayer.n4Layer_ButtonText);
	this.n4MasterSN = n4MasterSN;
	this.strMasterName = '';
	this.owner = owner;
	
	this.loadPic=function(n4MasterSN)
	{
		this.n4MasterSN=n4MasterSN?n4MasterSN:this.n4MasterSN
		var cmd = new nxCommand(null, this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_GameUserGetinfo);
		cmd.addParam("n4MasterSN", this.n4MasterSN);
		cmd.execute(callBackGeneralInfo);
	}
	
	this.onBinding=function(owner, FaceControl)
	{
	
	}
	
	function callBackGeneralInfo(xml, strText, FaceControl)
	{
		var ds = new NxDataSet(xml);
		FaceControl.src = 'http://nexen.pe.kr/img/face/master/'+ds.rows[0].get("strGeneralPicName");
		FaceControl.strMasterName = ds.rows[0].get("strMasterName");
		FaceControl.show();
		FaceControl.onBinding(owner, FaceControl);
	}
	if(n4MasterSN)
		this.loadPic(n4MasterSN);
		
	
	
}	
nxAmountBar.prototype = new NxControl();
nxAmountBar.prototype.constructor = nxAmountBar;




function nxBar(strLayerID, owner, strColor)
{
	NxControl.apply(this, arguments);
	
	this.setBG('black');
	this.bar = new NxControl('bar_'+this.id);
	this.add(this.bar);
	this.style.border= "1px solid black";	
	this.isReverse = false;
	
	this.setPer=function(n4Val)	
	{
		var width = n4Val==0?0:parseInt(this.getWidth()*(n4Val/100));
		this.bar.setWidth( width );
		if(this.isReverse)
			this.bar.setLeft(this.getWidth()-width);
	}
	
	this.show=function()
	{
		this.bar.setWidth(this.getWidth());
		this.bar.setHeight(this.getHeight());
		this.bar.setBG(strColor);
		this.bar.show();
		this._show();
	}
}	
nxBar.prototype = new NxControl();
nxBar.prototype.constructor = nxBar;


function nxAmountBar(strLayerID, owner)
{
	NxControl.apply(this, arguments);
	this.n4Value	= 0;
	this.n4MaxValue = 100;
	this.n1SelectedIndex = 0;
	this.isClick	= false;
	
	if(!strLayerID)
		return;
	if(!owner)
	{
		alert(this.id+' nxAmountBar의 소유자가 없습니다.');
		return;
	}
	this.setWidth(100);
	this.setHeight(30);
	this.setBG('red');
	
	
	this.nxBtns = new Array()
	for(var i=0;i<10;i++)
	{
		var btn = new NxControl('btn_+'+i+'_'+this.id);
		this.add(btn);
		this.nxBtns[i] = btn;
		btn.style.border= "1px solid #FCEEEE";
		btn.setBG('');//#75B570
		btn.setWidth(10);
		btn.setHeight(30);
		btn.setLeft(i*15 );
		btn.n4Seq = i+1;
		btn.show();
		btn.frmLayer.onmousemove=function()
		{
			this.NxControl.parent.bindBtn(this.NxControl);
		}
		
	}
	this.selectBtn=function(n1SelectedIndex)
	{
		this.bindBtn(this.nxBtns[n1SelectedIndex]);
	}
	this.bindBtn=function(sender)
	{
		var isInBound = true;
		
		try
		{
			sender.parent.n4Value = parseInt(sender.n4Seq*(sender.parent.n4MaxValue/10));	
			sender.parent.onvaluechange(sender.parent.n4Value, sender.parent);
			
			for(var i=0;i<=sender.parent.nxBtns.length;i++)
			{
				sender.parent.nxBtns[i].setBG( isInBound?'#75B570':'' );
				if(sender.parent.nxBtns[i]==sender)
				{
					isInBound=false;
					this.n1SelectedIndex = i;	
				}
				
			}
			
		}catch(ee){}
	}
	this.setValue=function(n4Value)
	{
		var idx = parseInt(n4Value/this.n4MaxValue*10)-1;
		if(n4Value==0)
		{
			for(var i=0;i<10;i++)
			{
				this.nxBtns[i].setBG('');//#75B570
			}
			this.n4Value = 0;
			this.onvaluechange(0, this);
		}
		else
			this.bindBtn(this.nxBtns[idx]);
	}
	this.onvaluechange=function(n4Value, sender){}///*이곳을 내외부에서 재정의한다.*/
	
	this.show = function()
	{
		this.setWidth(145);
		this.setHeight(30);
		this.setBG('black');
		this._show();
	}
	
}
nxAmountBar.prototype = new NxControl();
nxAmountBar.prototype.constructor = nxAmountBar;

function nxButton(strLayerID,strText, owner, n1FontSize)
{
	if(!strLayerID)
		return;
	NxButton.apply(this, arguments);
	if(n1FontSize!=null)
		this.setFontSize(n1FontSize);
	this.setWidth(80);
	this.setHeight(30);
	this.style.fontSize		= "15px";
	this.src = 'http://nexen.pe.kr/img/button/btn_base.png'
	if(strText)
		this.setTitle(strText);
	this.owner = owner;
	
}
nxButton.prototype = new NxControl();
nxButton.prototype.constructor = nxButton;


function nxTimer(strLayerID, n4Seconds)
{
	if(!strLayerID)
		return;
	if(!n4Seconds)
	{
		alert(this.id+'에 n4Seconds 값이 없습니다.');
		return;		
	}
	NxControl.apply(this, arguments);
	
	this.n4Seconds = n4Seconds;
	this.setWidth(80);
	this.setHeight(30);
	this.setBG('');
	
	this.deCount=function(nxtimer, n4Next)
	{
		try
		{
			if(nxtimer.n4Seconds!=n4Next)
				return;
			
			nxtimer.n4Seconds = parseInt(nxtimer.n4Seconds)-1;
			var n4Hour	= parseInt(nxtimer.n4Seconds/3600);
			var n4Min	= parseInt( (nxtimer.n4Seconds-(n4Hour*3600)) / 60 );
			var n1Sec	= parseInt( (nxtimer.n4Seconds-(n4Hour*3600)) % 60 );
			nxtimer.setText(n4Hour+"시간 "+n4Min+"분 "+n1Sec+'초');
		
			if(nxtimer.n4Seconds>0)
				nxtimer.timer = setTimeout("try{document.getElementById('"+nxtimer.id+"').NxControl.deCount(document.getElementById('"+nxtimer.id+"').NxControl, "+nxtimer.n4Seconds+");}catch(e2){}",1000);
			else
				nxtimer.ontimeout(this);
		}catch(e2){}
	}
	setTimeout("document.getElementById('"+this.id+"').NxControl.deCount(document.getElementById('"+this.id+"').NxControl, "+this.n4Seconds+");",100);
	
	this.ontimeout=function(timer){}
	
}
nxButton.prototype = new NxControl();
nxButton.prototype.constructor = nxButton;


function Alert(strID, strMsg, n4GeneralSN)
{
	strID = strID + '_' + nxStatic.n4ConfirmIndex;
	setTimeout("_Alert('"+strID+"','"+strMsg+"',"+n4GeneralSN+")", 200);
	nxStatic.n4ConfirmIndex++;
}
function Alert2(strID, strMsg, n4GeneralSN)
{
	return _Alert(strID,strMsg, n4GeneralSN );
}
function _Alert(strID,strMsg, n4GeneralSN )
{
	var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+strID, strMsg, n4GeneralSN);
	nw.show();
	
	setTimeout("try{document.getElementById('"+nw.id+"').NxControl.unload();}catch(e){}", 1000*20);

	return nw;
}

function Confirm(owner, strText, callBack, n4GeneralSN)
{
	var strID  = 'confirm_'+nxStatic.n4ConfirmIndex;
	nxStatic.n4ConfirmIndex++;
	var cf = new nxConfirmWindow(strID ,owner, strText, callBack, n4GeneralSN);
	cf.show();
	
	return cf;
}


function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function itemColorByLevel(strName, n4Level,n4Inchant)
{
	var color = "";
	if(n4Level>=16)
		color = "#C82EC3";
	else if(n4Level>=11)
		color = "#F0ED18";
	else if(n4Level>=6)
		color = "#4290F0";
	else 
		color = "#22990B";

	return "<font color='"+color+"'>"+strName+"(+"+n4Inchant+")</font>";
}


function itemInfoViewOver(n4ItemKey)
{
	var strLayerID = "item_viewLayer";
	var ItemViewer = null;
	if(document.getElementById(strLayerID))
	{
		ItemViewer = document.getElementById(strLayerID).NxControl;
		ItemViewer.unload();		
	}
	
	ItemViewer = new NxControl(	strLayerID );
	ItemViewer.style.overflow = "";
	
	function callBackItemData(xml, strText, ItemViewer)
	{
		//alert(strText);
		var ds = new NxDataSet(xml);
		var strItemName = ds.rows[0].get("strItemName");
		var strItemCode = ds.rows[0].get("strItemCode");
		var n4SellPrice = ds.rows[0].get("n4SellPrice");
		var n4ItemLevel = parseInt(ds.rows[0].get("n4ItemLevel"));
		var n4UpStr		= parseInt(ds.rows[0].get("n4UpStr"));
		var n4UpInt		= parseInt(ds.rows[0].get("n4UpInt"));
		var n4UpPoli	= parseInt(ds.rows[0].get("n4UpPoli"));
		var n4UpCharm	= parseInt(ds.rows[0].get("n4UpCharm"));			
		var n4Inchant	= parseInt(ds.rows[0].get("n4Inchant"));			
		var strItemDescript = ds.rows[0].get("strItemDescript");	
		
		var strContent = '<br>';
		strContent+= "&nbsp;"+itemColorByLevel(	strItemName, n4ItemLevel, n4Inchant)+"<br>";
		strContent+= "&nbsp;"+strItemCode+"<br>";
		strContent+= "&nbsp;"+"아이템 레벨 "+n4ItemLevel+"<br><br>";
		strContent+= "&nbsp;"+"무력 "+plusMinues(n4UpStr)+"<br>";
		strContent+= "&nbsp;"+"지력 "+plusMinues(n4UpInt)+"<br>";
		strContent+= "&nbsp;"+"매력 "+plusMinues(n4UpCharm)+"<br>";
		strContent+= "&nbsp;"+"정치 "+plusMinues(n4UpPoli)+"<br>";
		strContent+= "&nbsp;"+"<BR>판매가격:"+addCommas(n4ItemLevel*1000)+"<br><BR>";
		strContent+= "&nbsp;"+"<BR>"+strItemDescript+"<br>";
		
		ItemViewer.setText(strContent);
		ItemViewer.setFontSize(15);
		ItemViewer.setWidth(140);
		ItemViewer.setHeight(200);
		ItemViewer.style.border = "1px solid #52A34C";
		ItemViewer.setAlpha(80);
		ItemViewer.setBG('black');
		ItemViewer.setColor('white');
		ItemViewer.setLayerIndex(nxLayer.n4Layer_Dialog);
		ItemViewer.show();	
	}
	
	var cmd = new nxCommand(null, ItemViewer);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemMasterGetList);
	cmd.addParam("n4ItemKey", n4ItemKey);
	cmd.execute(callBackItemData);
			
	
	ItemViewer.setLeft(document.dX+30);
	ItemViewer.setTop(document.dY+20);
	
	

}
function plusMinues(n4Val)
{
	return n4Val>=0 ? '+'+n4Val : n4Val;
}
function itemInfoViewOut(n4ItemKey)
{
	var strLayerID = "item_viewLayer";
	document.getElementById(strLayerID).NxControl.unload();
}

function checkKoreanOnly( koreanChar ) {
   
   if ( koreanChar == null ) return false ;
   
   for(var i=0; i < koreanChar.length; i++){ 

     var c=koreanChar.charCodeAt(i); 

     //( 0xAC00 <= c && c <= 0xD7A3 ) 초중종성이 모인 한글자 
     //( 0x3131 <= c && c <= 0x318E ) 자음 모음 

     if( !( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ) ) {      
        return false ; 
     }
   }  
   return true ;
}

function tooltipViewOver(strText)
{
	
}
function tooltipViewOut()
{
	
}

function eventPoliCriticalCheck(ds)
{
	var isCritical	= parseInt( ds.rows[0].get("isCritical") );
	var n4GeneralSN = parseInt( ds.rows[0].get("n4GeneralSN") );
	if(isCritical==1)
	{
		Alert('isCritical1','업그레이드 획득 수치가 두배로 증가하였습니다.');
		Alert('isCritical2','뭘 꾸물거리느냐! 빨리빨리 하란 말이다.', n4GeneralSN);
		return true;
	}
	else
		return false
}
function eventPoliCriticalCheckProduct(ds)
{
	var isCritical	= parseInt( ds.rows[0].get("isCritical") );
	var n4GeneralSN = parseInt( ds.rows[0].get("n4GeneralSN") );
	if(isCritical==1)
	{
		Alert('isCritical1','예정 생산량이 두배로 증가하였습니다.');
		Alert('isCritical3','이런일은 제가 적임자이지요.', n4GeneralSN);
		return true;
	}
	else
		return false
}
function eventAvilCheckSoldiers(ds)
{
	var isCritical	= parseInt( ds.rows[0].get("isCritical") );
	var n4GeneralSN = parseInt( ds.rows[0].get("n4GeneralSN") );
	var strGeneralName = ds.rows[0].get("strGeneralName");
	
	if(isCritical==1)
	{
		Alert('isCritical4',strGeneralName+'의 명성을 듣고 지원자들이 대거 몰려들었습니다.', n4GeneralSN);
		return true;
	}
	else
		return false
}

function isNumeric(val)
{
	try
	{
		var tmp = parseInt(val);
		if(val==tmp)
			return true;
		else
			false;
	}
	catch(e)
	{
		return false;
	}
}

function isIE6()
{
	if (window.XMLHttpRequest)  
		return false;
	else
		return true;
}

function nx(strLayerID){return document.getElementById(strLayerID).NxControl;}

function getRand(n4Max, n4Min)
{
	var ret = Math.floor(Math.random() * n4Max);
	return ret<n4Min?n4Min:ret;
}

