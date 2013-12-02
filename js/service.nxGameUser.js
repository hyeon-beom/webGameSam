
function nxGameUserInfoBar(strLayerID)
{
	NxControl.apply(this, arguments);
	this.setBG('');
	this.setTop(0);
	this.setLeft(25);
	this.setWidth(1400);
	this.setHeight(30);
	this.setLayerIndex(nxLayer.n4Layer_ConfirmWindow);
	
	var barSrc = "http://nexen.pe.kr/img/tile/bar2.png";
	var barTop = new NxControl('barTop');
	barTop.src = barSrc;
	barTop.setBG('');
	barTop.setTop(-10);
	barTop.setLeft(-20);
	barTop.setWidth(1300);
	barTop.setHeight(50);
	barTop.show();
	this.barBottom = new NxControl('barBottom');
	this.barBottom.src = barSrc;
	this.barBottom.setBG('');
	this.barBottom.setTop(710);
	this.barBottom.setLeft(-20);
	this.barBottom.setWidth(1300);
	this.barBottom.setHeight(50);
	this.barBottom.show();
	
	this.btnHonor = new NxButton('btnHonor');
	this.btnHonor.setTop(717);
	this.btnHonor.setLeft(700);
	this.btnHonor.setWidth(140);
	this.btnHonor.setHeight(30);
	this.btnHonor.style.fontSize		= "15px";
	this.btnHonor.src= 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.btnHonor.setTitle("��������");
	this.btnHonor.show();
	this.btnHonor.frmLayer.onclick=function()
	{
		var url = "nxRanking.aspx";
		window.open(url,'rank','width=700,height=800,scrollbars=yes');
	}
	
	this.btnItem = new NxButton('btnItem');
	this.btnItem.setTop(717);
	this.btnItem.setLeft(842);
	this.btnItem.setWidth(140);
	this.btnItem.setHeight(30);
	this.btnItem.style.fontSize		= "15px";
	this.btnItem.src= 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.btnItem.setTitle("���� ������");
	this.btnItem.show();
	this.btnItem.frmLayer.onclick=function()
	{
		if(this.MyItemListDialog!=null)
		{
			this.MyItemListDialog.unload();
			this.MyItemListDialog=null;
		}
		this.MyItemListDialog = new nxMyItemListDialog('MyItemListDialog', this, 2);
		this.MyItemListDialog.show();
	}


	this.btnBoard = new NxButton('btnBoard');
	this.btnBoard.setTop(717);
	this.btnBoard.setLeft(984);
	this.btnBoard.setWidth(140);
	this.btnBoard.setHeight(30);
	this.btnBoard.style.fontSize		= "15px";
	this.btnBoard.src= 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.btnBoard.setTitle("�Խ���");
	this.btnBoard.show();
	this.btnBoard.frmLayer.onclick=function(){window.open("/board/run.asp?board=community","manual","width=850,height=800,scrollbars=yes");}
	
	this.btnManual = new NxButton('btnManual');
	this.btnManual.setTop(717);
	this.btnManual.setLeft(1125);
	this.btnManual.setWidth(140);
	this.btnManual.setHeight(30);
	this.btnManual.style.fontSize		= "15px";
	this.btnManual.src= 'http://nexen.pe.kr/img/button/btn_base02.png';	
	this.btnManual.setTitle("���Ӽ���");
	this.btnManual.show();
	this.btnManual.frmLayer.onclick=function(){window.open("/inGame/nxManual.aspx","manual","width=850,height=800,scrollbars=yes");}
	
	
	
	//----------������
	this.n4MasterGold = 0;
	this.n4MasterRice = 0;
	this.n4MasterHorse	= 0;
	this.n4MasterSoldier= 0;
	this.n4MasterArmySoldier = 0;
	this.n4MasterSpear	= 0;
	this.n4MasterBow	= 0;
	this.n4MasterRestSec= 0;
	this.n1Working		= 0;
	this.n4MasterSN		= 0;
	this.strMasterName	= null;	
	this.n4RegionStartX = 0;
	this.n4RegionStartY = 0;
	this.n4RegionEndX	= 0;
	this.n4RegionEndY	= 0;
	this.n4KunsaSN		= 0;
	this.n4BuildingCount= 0;
	this.n4MaxBuildLimit= 0;
	this.n4CustomGeneralCount	= 0;
	this.n4MaxCustomGenralLimit = 0;
	this.n4GeneralCount	= 0;
	this.n4DipCount		= 0;
	

	
	
	
	//��������
	this.n4Month	= 0;
	this.n4Day		= 0;
	
	//----------���갡����
	this.priceInfo	= new Object(); 
	
	this.createControl = function(strID, n4Left, n4Top, n4Width, n4height,strText)
	{
		var ctl = new NxControl(strID);
		this.add(ctl);
		ctl.setBG('');
		ctl.setText(strText);
		ctl.setTop(n4Top);
		ctl.setLeft(n4Left);
		ctl.setWidth(n4Width);
		ctl.setHeight(n4height);
		ctl.setColor("white");
		ctl.setFontSize(15);
		ctl.show();
		
		return ctl;
	}
	
	
	this.gold	= this.createControl('gold',	50	, 5, 150, 30, '��:'+addCommas(0));
	this.rice	= this.createControl('rice',	200	, 5, 150, 30, '����:0');
	this.horse	= this.createControl('horse',	350	, 5, 150, 30, '����:0');
	this.spear	= this.createControl('spear',	500	, 5, 150, 30, 'â:0');
	this.bow	= this.createControl('bow'	,	650	, 5, 150, 30, '����:0');
	this.soldier= this.createControl('soldier', 780 , 5, 300, 30, '����:0');
	
	this.ctlRest	= this.createControl('ctlRest'	, 50, 10, 200, 40, '���ִ��: 0');
	this.barBottom.add(this.ctlRest);
	this.ctlMonth	= this.createControl('ctlMonth'	, 1080	, 5, 100, 30, '��');
	this.ctlDay		= this.createControl('ctlDay'	, 1160	, 5, 100, 30, '��');
		
	this.requestUserInfo=function()
	{
		var cmd = new nxCommand(null, this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_GameUserGetInfo);
		cmd.execute(callBackUserInfo);
		
		//var n1Rnd = 30;//+Math.floor(Math.random() * 10);//20+X��
		setTimeout("document.getElementById('"+this.id+"').NxControl.requestUserInfo()", 1000*10);
		
		function callBackUserInfo(xml, strText, GameUserInfoBar)
		{
			var ds= new NxDataSet(xml);
			var ds2= new NxDataSet(xml, 1);
			if(!ds.rows[0])
			{
				document.location.reload();//���������
				return;
			}
			
						
			GameUserInfoBar.n4MasterGold = ds.rows[0].get("n4MasterGold");
			GameUserInfoBar.n4MasterRice = ds.rows[0].get("n4MasterRice");
			GameUserInfoBar.n4MasterHorse	= ds.rows[0].get("n4MasterHorse");
			GameUserInfoBar.n4MasterSpear	= ds.rows[0].get("n4MasterSpear");
			GameUserInfoBar.n4MasterBow		= ds.rows[0].get("n4MasterBow");
			GameUserInfoBar.n4MasterSoldier	= ds.rows[0].get("n4MasterSoldier");
			GameUserInfoBar.n4MasterArmySoldier	= ds.rows[0].get("n4MasterArmySoldier");
			
			GameUserInfoBar.n4Year			= ds.rows[0].get("n4Year");
			GameUserInfoBar.n4Month			= ds.rows[0].get("n4Month");
			GameUserInfoBar.n4Day			= ds.rows[0].get("n4Day");
			GameUserInfoBar.n4MasterRestSec = ds.rows[0].get("n4MasterRestSec");
			GameUserInfoBar.n1Working		= ds.rows[0].get("n1Working");
			GameUserInfoBar.n4MasterSN		= ds.rows[0].get("n4MasterSN");
			GameUserInfoBar.n4BuildingCount = parseInt(ds.rows[0].get("n4BuildingCount"));
			GameUserInfoBar.n4MaxBuildLimit = parseInt(ds.rows[0].get("n4MaxBuildLimit"));
			GameUserInfoBar.n4MaxCustomGenralLimit	= parseInt(ds.rows[0].get("n4MaxCustomGenralLimit"));
			GameUserInfoBar.n4CustomGeneralCount	= parseInt(ds.rows[0].get("n4CustomGeneralCount"));
			GameUserInfoBar.n4GeneralCount			= parseInt(ds.rows[0].get("n4GeneralCount"));
			
			
			if(GameUserInfoBar.n4MasterSN!=1)
			{
				GameUserInfoBar.n4RegionStartX = ds.rows[0].get("n4RegionStartX");
				GameUserInfoBar.n4RegionStartY = ds.rows[0].get("n4RegionStartY");
			}
			
			GameUserInfoBar.n4KunsaSN		= parseInt(ds.rows[0].get("n4KunsaSN"))==0?null:parseInt(ds.rows[0].get("n4KunsaSN"));
			GameUserInfoBar.n4DipCount		= parseInt(ds.rows[0].get("n4DipCount"));
			
			if(GameUserInfoBar.strMasterName==null)//ù �α���
			{
				Alert('gameStartMsg', ds.rows[0].get("strMasterName")+'�� ������ ����� �����ֽʽÿ�.<br><br> ù �����̶�� ȭ�� �ϴ��� �Ŵ��� ��ư�� ���� ������ ������ ���ñ� �ٶ��ϴ�.', GameUserInfoBar.n4KunsaSN==null?604:GameUserInfoBar.n4KunsaSN);
				if(GameUserInfoBar.n4DipCount>0)
					Alert('gameStartMsg2', ds.rows[0].get("strMasterName")+'�� ���� ���� �ܱ������� �ֽ��ϴ�. [��������â]�� �ܱ��϶��� Ŭ���Ͽ� Ȯ���Ͻñ� �ٶ��ϴ�.', GameUserInfoBar.n4KunsaSN==null?713:GameUserInfoBar.n4KunsaSN);
					
				//nxStatic.chat = new nxChat('nxChat',  ds.rows[0].get("strMasterName"));
				//nxStatic.chat.show();	
				
				GameUserInfoBar.singleThread(GameUserInfoBar);//�ٸ� ������ ó����				
			}
			GameUserInfoBar.strMasterName	= ds.rows[0].get("strMasterName");
			
			GameUserInfoBar.gold.setText	(nxStatic.getIcon(7,null,null,'��')+'��: '+addCommas(GameUserInfoBar.n4MasterGold));
			GameUserInfoBar.rice.setText	(nxStatic.getIcon(9,null,null,'����')+'����: '+addCommas(GameUserInfoBar.n4MasterRice));
			GameUserInfoBar.horse.setText	(nxStatic.getIcon(3,null,null,'����')+'����: '+addCommas(GameUserInfoBar.n4MasterHorse));
			GameUserInfoBar.spear.setText	(nxStatic.getIcon(2,null,null,'â')+'â: '+addCommas(GameUserInfoBar.n4MasterSpear));
			GameUserInfoBar.bow.setText		(nxStatic.getIcon(4,null,null,'����')+'����: '+addCommas(GameUserInfoBar.n4MasterBow));
			GameUserInfoBar.soldier.setText	(nxStatic.getIcon(8,null,null,'����')+' ������(��ü):'+addCommas(GameUserInfoBar.n4MasterArmySoldier)+'  &nbsp;����:'+addCommas(GameUserInfoBar.n4MasterSoldier));
			
			if(GameUserInfoBar.n4MasterRestSec>0)
			{
				var n4Min	= parseInt(GameUserInfoBar.n4MasterRestSec/60);
				var n1Sec	= parseInt(GameUserInfoBar.n4MasterRestSec%60);
				GameUserInfoBar.ctlRest.setText	('���ִ��: ' + n4Min+"�� "+n1Sec+'��');
			}
			else
				GameUserInfoBar.ctlRest.setText	('');
			
			GameUserInfoBar.ctlMonth.setText('�ؼ��� '+GameUserInfoBar.n4Month+'��');
			GameUserInfoBar.ctlDay.setText	(GameUserInfoBar.n4Day+'��');
			
			
			//���� �޽��� 
			//alert(ds2.rows.length);
			
			if(ds2.rows.length>0)
			{
				var strSubject	= ds2.rows[0].get("strSubject");
				var n4IndexMsg	= parseInt(ds2.rows[0].get("n4IndexMsg"));
				var n1MsgType	= parseInt(ds2.rows[0].get("n1MsgType"));
				
				if(!nxStatic.msgArray[n4IndexMsg])
				{
					if(n1MsgType==2)
						Alert('cobBatMsg2', strSubject+"�� ����Դϴ�.",  GameUserInfoBar.n4KunsaSN);
					else if(n1MsgType==3)
						Alert('cobBatMsg3', strSubject+"�Ͽ����ϴ�.",  GameUserInfoBar.n4KunsaSN);
					
					nxStatic.msgArray[n4IndexMsg] = n4IndexMsg;
				}
			}
						
		}
	}
	
	
	
	//�� ǰ�� ����ܰ��� �����´�.
	this.requestProducePrice=function(n1CodeProduct)
	{
		function callBackCmd(xml, strText, Info)
		{
			var ds = new NxDataSet(xml);
			Info.n4Gold	= parseInt(ds.rows[0].get("n4Gold"));
			Info.n4Rice	= parseInt(ds.rows[0].get("n4Rice"));
			Info.n4Horse= parseInt(ds.rows[0].get("n4Horse"));
		}
		
		this.priceInfo[n1CodeProduct] = new Object();
		var Cmd = new nxCommand(null, this.priceInfo[n1CodeProduct]);
		Cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetOutPriceJob);
		Cmd.addParam("n1CodeProduct"	, n1CodeProduct);
		Cmd.execute(callBackCmd);
	}
	for(var i=1; i<=5; i++)//����! IE�� ������Ÿ�ϸ� ���´� �Ф�
	{
		setTimeout("document.getElementById('"+this.id+"').NxControl.requestProducePrice("+i+")",i*1000);
	}
	
	
	this.singleThread=function(GameUserInfoBar)	
	{
		if(nxStatic.mainContainer.map)
			nxStatic.mainContainer.map.LoadMiniMapBuilding();
		//alert("�ʷε�");	
		var n1Rnd = Math.floor(Math.random() * 10);
		setTimeout("document.getElementById('"+this.id+"').NxControl.singleThread();", 1000*60*2 + n1Rnd);// 2�п� �ѹ� ����.
	}
	this.requestUserInfo();
	
	//setTimeout("document.location.reload();", 1000*60*30);//30�п� �ѹ� ��������
}
nxGameUserInfoBar.prototype = new NxControl();
nxGameUserInfoBar.prototype.constructor = nxGameUserInfoBar;