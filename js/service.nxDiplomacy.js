
function nxDiplomacyDialog(strLayerID)
{
	NxControl.apply(this, arguments);
		
	this.setWidth(420);
	this.setHeight(580);
	this.setLeft(1050);
	this.setTop(30);
	this.setLayerIndex(nxLayer.n4Layer_Dialog);
	this.setBG('#E8EBEE');

	this.childWin = new NxControl('childWin');
	this.add(this.childWin);
	this.childWin.setWidth(400);
	this.childWin.setHeight(550);
	this.childWin.setLeft(10);
	this.childWin.setTop(20);
	this.childWin.setLayerIndex(this.getLayerIndex()+1);
	this.childWin.show();

	setTimeout('mainMethod.countDown();', 2000);
		
	this.LoadWindow=function(n4BuildingSN)
	{
		var strURL = document.location.href.indexOf('nexen.pe.kr')>=0?'http://nexen.pe.kr/inGame/nxCastleInfo.aspx':'http://localhost/inGame/nxCastleInfo.aspx';
		var cmd = new nxCommand(strURL, this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_RemoveBuilding);
		if(n4BuildingSN!=null)
			cmd.addParam("n4BuildingSN", n4BuildingSN);
		cmd.execute(callBackLoadWindow);
		function callBackLoadWindow(xml, strText, DiplomacyDialog)
		{
			DiplomacyDialog.childWin.setText(strText);
			mainMethod.menuView(mainMethod.selectedIndex);
		}
	}
	this.LoadWindow(null);
		
	//--�巡�׾� ���
	this.barTitle = new NxControl('barTitle'+this.id);
	this.add(this.barTitle);
	this.barTitle.setWidth(this.getWidth());
	this.barTitle.setHeight(20);
	this.barTitle.setBG('#AEB1B5');
	this.barTitle.show();
	this.barTitle.frmLayer.style.cursor='pointer';
	this.isDragStart = false;
	function downHandler(e)
	{
		nxStatic.mainMenu.bX = document.dX-nxStatic.mainMenu.getLeft();
		nxStatic.mainMenu.bY = document.dY-nxStatic.mainMenu.getTop();
		nxStatic.mainMenu.isDragStart = true;
	}
	function upHandler(e)
	{
		nxStatic.mainMenu.isDragStart = false;
	}
	function moveHandler(e)
	{
		if(nxStatic.mainMenu.isDragStart)
		{
			nxStatic.mainMenu.setLeft(document.dX-nxStatic.mainMenu.bX);
			nxStatic.mainMenu.setTop(document.dY-nxStatic.mainMenu.bY);
		}
	}
	if(document.all)
	{
		this.barTitle.frmLayer.attachEvent("onmousedown", downHandler);
		document.attachEvent("onmouseup", upHandler);
		document.attachEvent("onmousemove", moveHandler);
	}
	else
	{
		this.barTitle.frmLayer.addEventListener("mousedown",downHandler,true);
		document.addEventListener("mouseup",upHandler,true);
		document.addEventListener("mousemove",moveHandler,true);
	}	
}
nxDiplomacyDialog.prototype = new NxControl();
nxDiplomacyDialog.prototype.constructor = nxNationSelectDialog;


var mainMethod = new function _mainMethod()
{
	this.baseInfo_n4BuildingSN = 0;
	this.selectedIndex = 0;
	
	this.menuVisible=function(radioObj)
	{
		
		var n1Tab = parseInt(radioObj.value);
		this.menuView(n1Tab);		
		
	}
	this.menuView=function(n1Tab)
	{
		this.selectedIndex = n1Tab;
		var tblResource = this.c("tblResource");
		var tblBuilding	= this.c("tblBuilding");
		var tblJob		= this.c("tblJob");
		
		tblResource.style.display	= "none";
		tblBuilding.style.display	= "none";
		tblJob.style.display		= "none";
		
		if(n1Tab==0)
			tblResource.style.display = "";
		else if(n1Tab==1)
			tblBuilding.style.display = "";
		else if(n1Tab==2)
			tblJob.style.display	  = "";

		document.getElementsByName('selectInfo')[n1Tab].checked = true;
	}
	this.c=function(id, strTagName)
	{
		if(document.all && strTagName!=null && document.getElementById(id)==null)
		{
			var objs = document.getElementsByTagName(strTagName);
			for(var i=0;i<objs.length;i++)
			{
				var obj = objs[i];
				var strID= obj.getAttribute("id");
				if(id==strID)
					return obj;
			}
			//return null;
		}
		else
		{
			if(document.getElementById(id))
				return document.getElementById(id);
			else
				return null;
		}
			
		
	}
	this.n = function(strTagName, strName)
	{
		var ret = new Array();
		var objs = document.getElementsByTagName(strTagName);
		for(var i=0;i<objs.length;i++)
		{
			var obj = objs[i];
			var name= obj.getAttribute("name");
			if(name==strName)
				ret[ret.length] = obj;
		}
		
		return ret;
		
	}
	this.goHome=function()
	{
		this.c('dropCastleList').selectedIndex=0;
		this.gotoBuilding();
	}
	this.gotoBuilding=function(objSelect, isReload)
	{
		if(objSelect)
			this.gotoBuilding2(objSelect.value, isReload);
		else
			this.gotoBuilding2(this.c('dropCastleList', 'select').value, isReload);
	}
	this.gotoBuilding2=function(strValue, isReload)
	{
		var arrVal = strValue.split('|');
		var n4BuildingSN = parseInt(arrVal[0]);
		isReload = isReload==null?true:isReload;
		
		nxStatic.closePopup();
		nxStatic.mainContainer.n4StartCellX = parseInt(arrVal[1]);
		nxStatic.mainContainer.n4StartCellY = parseInt(arrVal[2]);
		nxStatic.mainContainer.loadBuildings();
		nxStatic.mainContainer.map.setFocus2();
		
		if(isReload)
			nxStatic.mainMenu.LoadWindow(n4BuildingSN);
		this.baseInfo_n4BuildingSN = n4BuildingSN;
	}
	this.gotoBuilding3=function(n4BuildingSN, isReload)
	{
		if(isReload)
			nxStatic.mainMenu.LoadWindow(n4BuildingSN);
		this.baseInfo_n4BuildingSN = n4BuildingSN;
	}
	this.getNowCastleSN=function()//�̰� ������ ���Եȴ�
	{
		var arrVal = this.c('dropCastleList', 'select').value.split('|');
		return parseInt(arrVal[0]);
	}
	this.getNowRealCastleSN=function()
	{
		var arrVal = this.c('dropCastleList', 'select').value.split('|');
		return parseInt(arrVal[3]);
	}

	this.requestContsruct=function()
	{
		this.gotoBuilding();
		Alert('requestContsruct', '���� ȭ���� ���ϴ� ��ġ(����)�� Ŭ���ϼ���.', nxStatic.gameUser.n4KunsaSN);
	}

	this.buildingInchant=function(n4BuildingSN)
	{
		var objBuilding = this.findBuilding(n4BuildingSN);
		if(objBuilding==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.buildingInchant('+n4BuildingSN+');' ,500);
		}
		else
		{
			if(this.dialogInchantInfo)
				this.dialogInchantInfo.unload();

			this.dialogInchantInfo = new nxSmithInfoDialog('nxSmithInfoDialog', objBuilding);
			this.dialogInchantInfo.show();
		}
	}

	this.buildingProduce=function(n4BuildingSN)
	{
		var objBuilding = this.findBuilding(n4BuildingSN);
		if(objBuilding==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.buildingProduce('+n4BuildingSN+');' ,500);
		}
		else
		{
			var dialogInfo = null;
			if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Farm)
				dialogInfo = new nxFarmInfoDialog('nxFarmInfoDialog_', objBuilding,1);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Horse)
				dialogInfo = new nxHorseInfoDialog('nxHorseInfoDialog_', objBuilding,1);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_BlackSM)
				dialogInfo = new nxBlackSMDialog('nxBlackSMDialog_', objBuilding,1);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Barrack)
				dialogInfo = new nxBarrackDialog('nxBarrackDialog_', objBuilding,1);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Tower)
				dialogInfo = new nxTowerInfoDialog('nxTowerInfoDialog_', objBuilding,1);
			
			dialogInfo.show();
		}
	}
	
	this.buildingUpgrade=function(n4BuildingSN)
	{
		var objBuilding = this.findBuilding(n4BuildingSN);
		if(objBuilding==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.buildingUpgrade('+n4BuildingSN+');' ,500);
		}
		else
		{
			var dialogInfo = null;
			if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Farm)
				dialogInfo = new nxFarmInfoDialog('nxFarmInfoDialog_', objBuilding,2);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Horse)
				dialogInfo = new nxHorseInfoDialog('nxHorseInfoDialog_', objBuilding,2);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_BlackSM)
				dialogInfo = new nxBlackSMDialog('nxBlackSMDialog_', objBuilding,2);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Barrack)
				dialogInfo = new nxBarrackDialog('nxBarrackDialog_', objBuilding,2);
			else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Tower)
				dialogInfo = new nxTowerInfoDialog('nxTowerInfoDialog_', objBuilding,2);
			
			dialogInfo.show();
		}
	}

	this.findBuilding=function(n4BuildingSN)
	{
		var building = null;
		for(var i=0; i<nxStatic.objBuildings.length;i++)
		{
			if(parseInt(nxStatic.objBuildings[i].n4BuildingSN)==parseInt(n4BuildingSN))
				return nxStatic.objBuildings[i];
		}
		
		//alert(n4BuildingSN+'/'+nxStatic.objBuildings.length);
		return null;
		
	}
	
			
	this.countDown = function()
	{
		var timers = document.getElementsByName("BuildingTimer");
		if(document.all)//ie,...18 fucker
			timers = this.n("span","BuildingTimer");
		//alert(timers.length);			
		for(var i=0;i<timers.length;i++)
		{
			if(timers[i].innerHTML!='')
			{
				var seconds			= parseInt(timers[i].getAttribute("seconds"));
				var n4BuildingSN	= parseInt(timers[i].getAttribute("n4BuildingSN"));
				var n1BuildingStatus	= parseInt(timers[i].getAttribute("n1BuildingStatus"));
				var n4GeneralSN			= parseInt(timers[i].getAttribute("n4GeneralSN"));
				
				var n4Hour	= parseInt(seconds/3600);
				var n4Min	= parseInt( (seconds-(n4Hour*3600)) / 60 );
				var n1Sec	= parseInt( (seconds-(n4Hour*3600)) % 60 );
			
				

				var strText = n1BuildingStatus==1?'������': n1BuildingStatus==2?'���׷��̵�':'����';
				
				timers[i].setAttribute("seconds", seconds-1);

				if(seconds>0)			
					timers[i].innerHTML = '<span style="color:yellow;">'+n4Hour+'�ð� '+n4Min+"�� "+n1Sec+'��('+strText+')</span>';
				else
				{
					timers[i].innerHTML = '';
					this.countDownEnd(n4BuildingSN, i);					
					var n4BuildingCode		=parseInt(timers[i].getAttribute("n4BuildingCode"));
					//var n4GeneralSN			= parseInt(timers[i].getAttribute("n4GeneralSN"));
					var n1BuildingStatus	= parseInt(timers[i].getAttribute("n1BuildingStatus"));
					//alert(n4GeneralSN);
					
					var strBuildingName = '����';
					if(n4BuildingCode==3)
						strBuildingName = "������"
					if(n4BuildingCode==4)
						strBuildingName = "���尣"
					if(n4BuildingCode==5)
						strBuildingName = "����"
					if(n4BuildingCode==6)
						strBuildingName = "�ó�"
					
					var strText = n1BuildingStatus==1?'������':n1BuildingStatus==2?'���׷��̵尡':'������';
					var strMsg = strBuildingName+"�� "+strText+" �Ϸ�Ǿ����ϴ�.";
					//alert(n4GeneralSN);
					Alert('jobFinish',strMsg, timers[i].getAttribute("n1BuildingStatus")&&n4GeneralSN>0?n4GeneralSN:null);
				}
			}
						
		}

		var timers2 = document.getElementsByName("JobTimer");
		if(document.all)//ie,...18 fucker
			timers2 = this.n("span","JobTimer");
		for(var i=0;i<timers2.length;i++)
		{
			var seconds			= parseInt(timers2[i].getAttribute("seconds"));
			if(seconds>=0)
			{
				var n4Min	= parseInt(seconds/60);
				var n1Sec	= parseInt(seconds%60);
				timers2[i].setAttribute("seconds", seconds-1);

				if(seconds>0)			
					timers2[i].innerHTML = '<span style="color:yellow;">'+n4Min+"�� "+n1Sec+'��</span>';
				else
				{
					timers2[i].innerHTML = '<span style="color:yellow;">�Ϸ�</span>';
				}
			}
		}

		
		setTimeout('mainMethod.countDown()',1000);
	}
	
	this.countDownEnd=function(n4BuildingSN, arrIndex)
	{
		//alert('start:'+arrIndex);
		function callBackCountDownEnd(xml, strText, obj)
		{
			var index = parseInt(obj.arrIndex);
			//alert(strText);
			//alert(index);
			var ds = new NxDataSet(xml);
			var objBuildingLevel		= document.all?mainMethod.n("span","buildingLevel")[index]:document.getElementsByName("buildingLevel")[index];
			var objAvailProductAmount	= document.all?mainMethod.n("span","AvailProductAmount")[index]:document.getElementsByName("AvailProductAmount")[index];
			
			var n4BuildingLevel		= ds.rows[0].get("n4BuildingLevel");
			var n4BuildingExp		= ds.rows[0].get("n4BuildingExp");
			var n4BuildingExpNext	= ds.rows[0].get("n4BuildingExpNext");
			var n4AvailProductAmount	= ds.rows[0].get("n4AvailProductAmount");
			
			
			objBuildingLevel.innerHTML		= "Lev."+n4BuildingLevel+" ("+n4BuildingExp+"/"+n4BuildingExpNext+")";
			objAvailProductAmount.innerHTML	= addCommas(n4AvailProductAmount);
			
		}
		var obj = new Object();
		obj.arrIndex = arrIndex;
		var cmd = new nxCommand(null, obj);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
		cmd.addParam("n4BuildingSN", n4BuildingSN);
		//cmd.print();
		cmd.execute(callBackCountDownEnd);
	}
	
	this.jobStart=function(n4BuildingSN, n1BuildingStatus, seconds)
	{
		var BuildingStatusViewer = this.c("BuildingStatusViewer_"+n4BuildingSN);
		if(BuildingStatusViewer)
		{
			BuildingStatusViewer.setAttribute("seconds", seconds);
			BuildingStatusViewer.setAttribute("n1BuildingStatus", n1BuildingStatus);
			BuildingStatusViewer.innerHTML=seconds;
			
			var building = this.findBuilding(n4BuildingSN);
			building.n1BuildingStatus = parseInt(n1BuildingStatus);
			building.n4TotalSeconds	  = parseInt(seconds);
			building.viewBuidingStatus();
			//alert(building.n1BuildingStatus+'/'+building.n4TotalSeconds);
		}
		
		
	}
	
	this.requestDistruct=function(n4BuildingSN)
	{
		
		var building = this.findBuilding(n4BuildingSN);
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.requestDistruct('+n4BuildingSN+');' ,500);
		}
		else
		{
			function distruct(isTrue, building)
			{
				if(isTrue)
				{
					nxStatic.mainContainer.removeBuildingRequest(building.n4BuildingSN, building);
					nxStatic.mainMenu.LoadWindow(mainMethod.getNowCastleSN());
				}
			}
			Confirm(building, '���� ö���Ͻðڽ��ϱ�?', distruct);
			nxStatic.closePopup();
			
		}
		
		
	}
	
	this.refresh=function()
	{
		nxStatic.mainMenu.LoadWindow(mainMethod.getNowCastleSN());
		nxStatic.gameUser.requestUserInfo();
	}
	
	this.openSystemLog=function()
	{
		if(document.getElementById("nxMsgLogDialog"))
		{
			this.MsgLogDialog.unload();
			this.MsgLogDialog=null;	
		}
		else
		{
			this.MsgLogDialog = new nxMsgLogDialog('nxMsgLogDialog', this);
			this.MsgLogDialog.show();
		}
	}
	
	this.openCombatLog=function()
	{
		if(document.getElementById("nxMsgCombatLogDialog"))
		{
			this.MsgLogDialog.unload();
			this.MsgLogDialog=null;	
		}
		else
		{
			this.MsgLogDialog2 = new nxMsgLogDialog2('nxMsgCombatLogDialog', this, 3);
			this.MsgLogDialog2.show();
		}
		
	}
	
	
	this.openDiplomacy=function()
	{
		if(document.getElementById("nxDipDialog"))
		{
			this.DipDialog.unload();
			this.DipDialog=null;	
		}
		else
		{
			this.DipDialog = new nxDiplomacyListDialog('nxDipDialog', this, "�ܱ��϶�");
			this.DipDialog.show();
		}
		
	}
	
//-------�޴�����
	this.setArmy=function()//�δ���
	{
		
		var building = this.findBuilding(this.getNowCastleSN());
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.setArmy();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.n4KingSN = building.n4KingSN;
    		this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+building.id, this , null, null, building.n4CastleSN);
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
				var n1ArmyStatus = parseInt(selectedItems[0].row['n1ArmyStatus']);
				if(n1ArmyStatus>1)
				{
					Alert('n1ArmyStatus_fail','�������� �δ��Դϴ�.', nxStatic.gameUser.n4KunsaSN);
					return;
				}
				this.dlg2 = new nxArmyModifyDialog('nxArmyModifyDialog_'+this.id, menuItem, selectedItems[0].row['n4GeneralSN'],menuItem.n4KingSN);
    			this.dlg2.show();
    			this.dlg2.onsubmit = function(menuItem)
				{
					menuItem.dlg.hide();
					menuItem.dlg.unload();
					mainMethod.setArmy();
					mainMethod.refresh();
				}
			}	
		}
		
	}
	
	this.armyTraining=function()
	{
		var building = this.findBuilding(this.getNowCastleSN());
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.armyTraining();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, building.n4CastleSN);
    		this.dlg.strCaption = "�Ʒ�";
    		this.dlg.n1SelectType = 2;
    		this.dlg.button.setTitle('�Ʒ�');
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems, dialogControl)
			{
				if(!selectedItems)
						return;
				var	arrGeneralSN = '';
    			for(var i=0;i<selectedItems.length;i++)
    			{
    				arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    			}
	    		
    			function callBack_n1QueryID_combat_armyTrainingStart(xml, strText, dialogControl)
    			{
    				dialogControl.unload();
    				mainMethod.refresh();
    				Alert('callBack_n1QueryID_combat_armyTrainingStart','�Ʒ��� ���۵Ǿ����ϴ�.', nxStatic.gameUser.n4KunsaSN);
    			}
				var cmd = new nxCommand(null, dialogControl);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyTrainingStart);
				cmd.addParam("arrGeneralSN", arrGeneralSN);
				cmd.execute(callBack_n1QueryID_combat_armyTrainingStart);
				
			}
		}
	}
	
	this.combatStart=function()//�⺴
	{
		var building = this.findBuilding(this.getNowCastleSN());
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.combatStart();' ,500);
		}
		else
		{	
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, building, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, building.n4CastleSN, 1);
    		this.dlg.n1SelectType = 2;
			this.dlg.n1SelectMaxCount = 10;
    		this.dlg.button.setTitle('Ȯ��');
    		this.dlg.strCaption = "������"
    		this.dlg.show();
    		this.dlg.onsubmit = function(building, selectedItems, dialogControl)
			{
				if(!selectedItems)
						return;
				var	arrGeneralSN = '';
    			for(var i=0;i<selectedItems.length;i++)
    			{
    				arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    			}
    			dialogControl.unload()
    			building.arrGeneralSN = arrGeneralSN;
				this.CastleSelect = new nxCastleSelectDialog('CastleSelect', building)
				this.CastleSelect.show();
				this.CastleSelect.onsubmit = function(building, selectedItems, dlg)
    			{
					dlg.unload();
    				if(!selectedItems)
						return;
					building.n4CastleSN_target = selectedItems[0].row['n4BuildingSN'];
					this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� �����մϱ�?",5,1,building.n4CastleSN_target);
    				this.dlgNation.show();
    				this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    				{
    					dlg.unload();
    					if(!selectedItems)
							return;
    					building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    					this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "����", "������ �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterRice>400000?400000:nxStatic.gameUser.n4MasterRice);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						Confirm(building, "���� �⺴�Ͻðڽ��ϱ�?" , callBackCombatConfirm);
    						function callBackCombatConfirm(isTrue, building)
							{
								if(isTrue)
								{
									function callBackChulbyung(xml, strText, building)
									{
										Alert('callBackChulbyung_','�⺴�Ͽ����ϴ�.', nxStatic.gameUser.n4KunsaSN);
										mainMethod.refresh();
										nxStatic.gameUser.requestUserInfo();
									}
									var cmd = new nxCommand(null, building);
									cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
									cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
									cmd.addParam("n4RiceAmount"				, building.n4Value);
									cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
									//cmd.print();
									cmd.execute(callBackChulbyung);
									
									
								}
    						}
    					}
		    			
    				}
					
				}
				
			}
		}
	}
	
	this.pveStart=function()//���
	{
		var building = this.findBuilding(this.getNowCastleSN());
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.pveStart();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, building, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, building.n4CastleSN, 1);
    		this.dlg.n1SelectType = 2;
			this.dlg.n1SelectMaxCount = 10;
    		this.dlg.button.setTitle('Ȯ��');
    		this.dlg.strCaption = "������"
    		this.dlg.show();
    		this.dlg.onsubmit = function(building, selectedItems, dialogControl)
			{
				if(!selectedItems)
						return;
				var	arrGeneralSN = '';
    			for(var i=0;i<selectedItems.length;i++)
    			{
    				arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    			}
    			dialogControl.unload()
    			building.arrGeneralSN = arrGeneralSN;
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� �����մϱ�?",1,0);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    				this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "����", "������ �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterRice>400000?400000:nxStatic.gameUser.n4MasterRice);
    				this.dlgAmount.show();
    				this.dlgAmount.onsubmit = function(building, n4Value)
    				{
    					if(n4Value==0)
    						return;
    					building.n4Value=n4Value;	
    					Confirm(building, "���� �⺴�Ͻðڽ��ϱ�?" , callBackCombatConfirm);
    					function callBackCombatConfirm(isTrue, building)
						{
							if(isTrue)
							{
								function callBackChulbyung(xml, strText, menuItem)
								{
									mainMethod.refresh();
									nxStatic.gameUser.requestUserInfo();
									Alert('callBackChulbyung_','�⺴�Ͽ����ϴ�.', nxStatic.gameUser.n4KunsaSN);
								}
								var cmd = new nxCommand(null, building);
								cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
								cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
								cmd.addParam("n4RiceAmount"				, building.n4Value);
								cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
								//cmd.print();
								cmd.execute(callBackChulbyung);
								
								
							}
    					}
    				}
	    			
    			}
				
			}
		}

	}
	
	this.armyMove=function()//�����̵�
	{
		var building = this.findBuilding(this.getNowCastleSN());
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.armyMove();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, building, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, building.n4CastleSN, 0);
    		this.dlg.n1SelectType = 2;
    		this.dlg.button.setTitle('Ȯ��');
    		this.dlg.strCaption = "������ �̵���Ű�ڽ��ϱ�?"
    		this.dlg.show();
    		this.dlg.onsubmit = function(building, selectedItems, dialogControl)
			{
				if(!selectedItems)
						return;
				var	arrGeneralSN = '';
    			for(var i=0;i<selectedItems.length;i++)
    			{
    				arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    			}
    			dialogControl.unload()
    			building.arrGeneralSN = arrGeneralSN;
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "���� �̵��մϱ�?",6);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
						
					building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    				Confirm(building, "���õ� ����� �δ븦 �̵���Ű�ڽ��ϱ�?" , callBackCombatConfirm);
    				function callBackCombatConfirm(isTrue, building)
					{
						if(isTrue)
						{
							
							function callBackChulbyung(xml, strText, menuItem)
							{
								mainMethod.refresh();
								Alert('callBackChulbyung_','����Ͽ����ϴ�.', nxStatic.gameUser.n4KunsaSN);
							}
							var cmd = new nxCommand(null, building);
							cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
							cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
							cmd.addParam("n4RiceAmount"				, 0);
							cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
							//cmd.print();
							cmd.execute(callBackChulbyung);
							
							
						}
    				}
	    			
    			}
				
			}
		}
	}
	
	this.insaRequest=function()	  //������
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.insaRequest();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this , building.n4CastleSN, 0);
    		this.n4CastleSN = building.n4CastleSN;
    		this.n4MasterSN = building.n4MasterSN;
    		this.dlg.strCaption = "������ ����Ͻðڽ��ϱ�?";
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, menuItem, menuItem.n4CastleSN, menuItem.n4MasterSN);
				menuItem.n4GerneralSN_target = selectedItems[0].row['n4GeneralSN'];
    			this.dlg2.strCaption = "�������� ��Ű�ڽ��ϱ�?";
    			this.dlg2.show();
    			this.dlg2.onsubmit = function(menuItem, selectedItems)
				{
					if(!selectedItems)
						return;
					if(nxStatic.mainContainer.GameUser.n4MasterGold<100)
					{
						Alert('insaAlert_'+menuItem.id, '���� �����մϴ�.');
						nxStatic.closeDialog();
						return;
					}
					
					var building = menuItem.building;
					var n4GerneralSN_target = menuItem.n4GerneralSN_target;
					var n4GerneralSN_sasin	= selectedItems[0].row['n4GeneralSN'];
					menuItem.n4GerneralSN_sasin = selectedItems[0].row['n4GeneralSN'];
					var cmd = new nxCommand(null, menuItem);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaRequest);
					cmd.addParam("n4CastleSN"		, building.n4CastleSN);
					cmd.addParam("n4GeneralSN"			, n4GerneralSN_sasin);
					cmd.addParam("n4GeneralSN_target"	, n4GerneralSN_target);
					//cmd.print();
					cmd.execute(callBackInsaRequest);
					function callBackInsaRequest(xml, strText, menuItem)
					{
						var ds = new NxDataSet(xml);
						var isOK					= ds.rows[0].get("isOK");
						var strGeneralName_target	= ds.rows[0].get("strGeneralName_target");
						var n1Point					= ds.rows[0].get("n1Point");
						nxStatic.closeDialog();
						mainMethod.refresh();
						
						if(isOK=='true')
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<50)
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ��ȣ�� �����Ͽ����ϴ�.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<60)
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'�� ���� ���� �� ������ ���°� ���ϴ�.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<70)
							Alert('callBackInsaRequest_'+menuItem.id, '�ƽ��Ե� '+ strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.',menuItem.n4GerneralSN_sasin);
						else
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.',menuItem.n4GerneralSN_sasin);
					}
					
				}
			}
		}
	}
	
	
	this.generalPrize=function()//����
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.generalPrize();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_'+this.id,'���� �۾��� ������ �� �����ϴ�.');
    			return;    		
    		}	
    		this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this, building.n4CastleSN, building.n4MasterSN, -1, 99);
    		this.n4CastleSN = building.n4CastleSN;
    		this.n4MasterSN = building.n4MasterSN;
    		this.dlg.strCaption = "�������� �ֽðڽ��ϱ�?";
    		this.dlg.n1SelectType = 2;
    		this.dlg.show();
	    	
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
						
				var n4NeedGold = selectedItems.length*100;
				if(parseInt(nxStatic.gameUser.n4MasterGold)<n4NeedGold)
				{
					Alert('callBackInsaPrize_'+menuItem.id, '��('+addCommas(n4NeedGold)+')�� �����մϴ�.');
					return;
				}	
						
				var	arrGeneralSN = '';
    			for(var i=0;i<selectedItems.length;i++)
    			{
    				arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    			}
    			//alert(arrGeneralSN);
				
				var cmd = new nxCommand(null, menuItem);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaGeneralPrize);
				cmd.addParam("arrGeneralSN"	, arrGeneralSN);
				//cmd.print();
				cmd.execute(callBackInsaPrize);
				function callBackInsaPrize(xml, strText, menuItem)
				{
					nxStatic.mainContainer.GameUser.n4MasterRestSec = 300;
					nxStatic.closeDialog();
					mainMethod.refresh();
					Alert('callBackInsaPrize_'+menuItem.id, '������ �漺���� �ö����ϴ�.');
				}
				

			}
		}
	}
	
	
	this.insaModify=function(n4GeneralSN)//�Ӹ�
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.insaModify("+n4GeneralSN+");' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this, 0, building.n4MasterSN, -1);
    		this.n4CastleSN = building.n4CastleSN;
    		this.n4MasterSN = building.n4MasterSN;
    		this.dlg.strCaption = "������ �����Ͻðڽ��ϱ�?";
    		this.dlg.n1SelectType = 1;
    		this.dlg.show();
			
						
    		this.dlg.onsubmit = function(menuItem, selectedItems, n4GeneralSN)
			{
				if(!selectedItems && !n4GeneralSN)
						return;
    			var n4GeneralSN = n4GeneralSN?n4GeneralSN:selectedItems[0].row['n4GeneralSN'];
   				this.dlg2 = new nxSetGeneralDialog('nxSetGeneralDialog_'+menuItem.id, menuItem, n4GeneralSN);
   				this.dlg2.show();
   				this.dlg2.onsubmit = function(menuItem, n4GeneralSN, strSelectedValue, strGeneralPicName)
				{
	   				
					var cmd = new nxCommand(null, menuItem);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralUpdate);
					cmd.addParam("n4GeneralSN"	, n4GeneralSN);
					cmd.addParam("n1Grade"	, strSelectedValue);
					cmd.addParam("strGeneralPicName"	, strGeneralPicName);
					
					//cmd.print();
					cmd.execute(callBackGeneralUpdate);
					function callBackGeneralUpdate(xml, strText, menuItem)
					{
						var ds = new NxDataSet(xml);
						if(ds.rows.length>0)
						{
							var n4Count = parseInt(ds.rows[0].get("n4Count"));
							if(n4Count>=5)
							{
								Alert('callBackGeneralUpdate_'+menuItem.id, '�屺�� 5���� �ʰ��Ͽ� ������ �� �����ϴ�.');
								mainMethod.insaModify();
								return;
							}
						}
						mainMethod.refresh();
						Alert('callBackGeneralUpdate_'+menuItem.id, '������ ������ ����Ǿ����ϴ�.');
						mainMethod.insaModify();
						
					}
					
				}

			}

			//��Ͽ� �����ȣ�� �Դٸ� �ٷ� ����
			if(n4GeneralSN)
				this.dlg.onsubmit(this, null, n4GeneralSN);
		}
	}
	
	
	this.insaFire=function()
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.insaFire();' ,500);
		}
		else
		{
			nxStatic.closePopup();
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this, 0, building.n4MasterSN, -1);
    		this.n4CastleSN = building.n4CastleSN;
    		this.n4MasterSN = building.n4MasterSN;
    		this.dlg.strCaption = "������ �ذ��Ͻðڽ��ϱ�?";
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
				
				var isCustomGeneral = parseInt(selectedItems[0].row["isCustomGeneral"]);
				var n1Working = selectedItems[0].row["n1Working"];
				/*if(isCustomGeneral==1)
				{
					Alert('notCut','�Ź����� �ذ��� �� �����ϴ�.', nxStatic.gameUser.n4KunsaSN);
					return;
				}
				*/
				if(n1Working!='-')
				{
					Alert('notCut','�������� ������ �ذ��� �� �����ϴ�.', nxStatic.gameUser.n4KunsaSN);
					return;
				}
				
						
				Confirm(selectedItems, '�ٽ��ѹ� �������ֽʽÿ�.<BR>���� �ذ��Ͻðڽ��ϱ�?', cutcut);
				function cutcut(isTrue, selectedItems)
				{
					if(isTrue)
					{
						function callBackInsaCut(xml, strText, menuItem)
						{
							mainMethod.refresh();
							Alert('callBackInsaCut', '�ذ��Ͽ����ϴ�.');
						}
						var n4GerneralSN_target = selectedItems[0].row["n4GeneralSN"];
						var cmd = new nxCommand(null, selectedItems);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaCut);
						cmd.addParam("n4GeneralSN_target"	, n4GerneralSN_target);
						//cmd.print();
						cmd.execute(callBackInsaCut);
						
					}
				}

			}
		}
	}
	
	this.nationAllyRequest=function()//���Ϳ�û
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.nationAllyRequest();' ,500);
		}
		else
		{
			nxStatic.closePopup();
			
			if(this.CastleSelect!=null)
			{
				this.CastleSelect.unload();
				this.CastleSelect=null;	
			}
			this.CastleSelect = new nxCastleSelectDialog('CastleSelect', building)
			this.CastleSelect.show();
			this.CastleSelect.onsubmit = function(building, selectedItems, dlg)
    		{
				dlg.unload();
    			if(!selectedItems)
					return;
				building.n4CastleSN_target = selectedItems[0].row['n4BuildingSN'];

    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� ���ָ� �����ϼ���.", 3,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "���Ϳ�û", "���� �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
		    				
    						building.n4Value=n4Value;	
    						Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm, nxStatic.gameUser.n4KunsaSN);
    						function callBackDiplomacyConfirm(isTrue, building)
							{
								if(isTrue)
								{
									
									
									function callBackDiplomacy1(xml, strText, building)
									{
										mainMethod.refresh();
										Alert('callBackDiplomacy1_','�׵��� �츮�� ����� ������� ����� ���ڽ��ϴ�.', building.n4GeneralSN_sasin);
									}
									var cmd = new nxCommand(null, building);
									cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
									cmd.addParam("n1DipType"			, 1);
									cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
									cmd.addParam("strMasterName"		, building.strMasterName_target);
									cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
									cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
									cmd.addParam("n4Gold"				, building.n4Value);
									//cmd.print();
									cmd.execute(callBackDiplomacy1);
									
								}
    						}
		    				
    					}		
						
					}
		    		
		    		
		    		
    			}
			}
		}
	}
	
	this.nationAllyBreak=function()//�����ı�
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.nationAllyBreak();' ,500);
		}
		else
		{
			nxStatic.closePopup();
			if(this.dlgNation!=null)
			{
				this.dlgNation.unload();
				this.dlgNation=null;	
			}
    		this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� ���ָ� �����ϼ���.", 4,1);
    		this.dlgNation.show();
    		this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    		{
    			dlg.unload();
    			if(!selectedItems)
					return;
    			building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    			building.strMasterName_target = selectedItems[0].row['strMasterName'];
    			this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    			this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    			this.dlg2.show();
    			this.dlg2.onsubmit = function(building, selectedItems)
				{
					if(!selectedItems)
						return;
					building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
					building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
					Confirm(building, "������� ������ ���Դϴ�. <BR> ������ ����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm2, nxStatic.gameUser.n4KunsaSN);
    				function callBackDiplomacyConfirm2(isTrue, building)
					{
						if(isTrue)
						{
							function callBackDiplomacy2(xml, strText, building)
							{
								mainMethod.refresh();
								Alert('callBackDiplomacy2_','������� �漺���� �϶��Ͽ����ϴ�.');
							}
							var cmd = new nxCommand(null, building);
							cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
							cmd.addParam("n1DipType"			, 2);
							cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
							cmd.addParam("strMasterName"		, building.strMasterName_target);
							cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
							cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
							cmd.addParam("n4Gold"				, 0);
							//cmd.print();
							cmd.execute(callBackDiplomacy2);
								
						}
    				}	
					
				}
    		}
		}
	}
	
	this.nationFriendly=function()//ģ��
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.nationFriendly();' ,500);
		}
		else
		{
			nxStatic.closePopup();
			if(this.CastleSelect!=null)
			{
				this.CastleSelect.unload();
				this.CastleSelect=null;	
			}
			this.CastleSelect = new nxCastleSelectDialog('CastleSelect', building)
			this.CastleSelect.show();
			this.CastleSelect.onsubmit = function(building, selectedItems, dlg)
    		{
				dlg.unload();
    			if(!selectedItems)
					return;
				building.n4CastleSN_target = selectedItems[0].row['n4BuildingSN'];

				if(this.dlgNation!=null)
				{
					this.dlgNation.unload();
					this.dlgNation=null;	
				}
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id,building, "��� ���ָ� �����ϼ���.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "ģ��", "���� �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
							building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    						Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm3);
    						function callBackDiplomacyConfirm3(isTrue, building)
							{

									if(isTrue)
									{
										function callBackDiplomacy3(xml, strText, building)
										{
											mainMethod.refresh();
											Alert('callBackDiplomacy3_', '�ٳ������ �ϰڽ��ϴ�.', building.n4GeneralSN_sasin);
										}
										var cmd = new nxCommand(null, building);
										cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
										cmd.addParam("n1DipType"			, 3);
										cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
										cmd.addParam("strMasterName"		, building.strMasterName_target);
										cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
										cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
										cmd.addParam("n4Gold"				, building.n4Value);
										//cmd.print();
										cmd.execute(callBackDiplomacy3);
											
									}

    						}
		    				
    					}		
						
					}
    			}
			}
		}
	}
	
	this.nationRequestSurrender=function()//�׺��ǰ�
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.nationRequestSurrender();' ,500);
		}
		else
		{
			nxStatic.closePopup();
			if(this.CastleSelect!=null)
			{
				this.CastleSelect.unload();
				this.CastleSelect=null;	
			}
			this.CastleSelect = new nxCastleSelectDialog('CastleSelect', building)
			this.CastleSelect.show();
			this.CastleSelect.onsubmit = function(building, selectedItems, dlg)
    		{
				dlg.unload();
    			if(!selectedItems)
					return;
				building.n4CastleSN_target = selectedItems[0].row['n4BuildingSN'];
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� ���ָ� �����ϼ���.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
						Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm4);
    					function callBackDiplomacyConfirm4(isTrue, building)
						{
							if(isTrue)
							{
								function callBackDiplomacy4(xml, strText, building)
								{
									mainMethod.refresh();
									Alert('callBackDiplomacy4_','���� �׺����� ���� ���Դϴ�.');
								}
								var cmd = new nxCommand(null, building);
								cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
								cmd.addParam("n1DipType"			, 4);
								cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
								cmd.addParam("strMasterName"		, building.strMasterName_target);
								cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
								cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
								cmd.addParam("n4Gold"				, 0);
								//cmd.print();
								cmd.execute(callBackDiplomacy4);
									
							}
    					}	
						
					}
    			}
			}
		}
		
	}
	
	this.nationHelpMe=function()//������û
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.nationHelpMe();' ,500);
		}
		else
		{
			nxStatic.closePopup();
			if(this.CastleSelect!=null)
			{
				this.CastleSelect.unload();
				this.CastleSelect=null;	
			}
			this.CastleSelect = new nxCastleSelectDialog('CastleSelect', building)
			this.CastleSelect.show();
			this.CastleSelect.onsubmit = function(building, selectedItems, dlg)
    		{
				dlg.unload();
    			if(!selectedItems)
					return;
				building.n4CastleSN_target = selectedItems[0].row['n4BuildingSN'];
			
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� ���ָ� �����ϼ���.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "������û", "������ �󸶳� ��û�Ͻðڽ��ϱ�?", 10000);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
							building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    						Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm5);
    						function callBackDiplomacyConfirm5(isTrue, building)
							{

									if(isTrue)
									{
										function callBackDiplomacy5(xml, strText, building)
										{
											mainMethod.refresh();
											Alert('callBackDiplomacy5_',building.strMasterName_target+'���� �츮�� �����ֽ� ���Դϴ�.', building.n4GeneralSN_sasin);
										}
										var cmd = new nxCommand(null, building);
										cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
										cmd.addParam("n1DipType"			, 5);
										cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
										cmd.addParam("strMasterName"		, building.strMasterName_target);
										cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
										cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
										cmd.addParam("n4Gold"				, building.n4Value);
										//cmd.print();
										cmd.execute(callBackDiplomacy5);
											
									}

    						}
		    				
    					}		
						
					}
    			}
			}
		}
	}
	
	this.generalList=function()
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.generalList();' ,500);
		}
		else
		{
			if(this.dialogGeneral)
				this.dialogGeneral.unload();
			this.dialogGeneral = new nxGeneralInfoDialog('dialogGeneral_'+this.id
				, building.n4CastleSN, building.n4MasterSN, building);
			this.dialogGeneral.show();
		}
	}
	
	this.fighterList=function()
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.fighterList();' ,500);
		}
		else
		{
			if(this.dialogFighter)
				this.dialogFighter.unload();
			this.dialogFighter = new nxGeneralInfoDialog('dialogFighter_'+this.id
				, building.n4CastleSN, 0, building);
			this.dialogFighter.show();
		}
	}
	
	this.bizRiceBuy=function()//���� ����
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.bizRiceBuy();' ,500);
		}
		else
		{
			if(this.dlg)
    			this.dlg.unload();
    			
    		mainMethod.refresh();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+building.id, building, 0);
    		this.dlg.show();
		}
	}
	
	this.bizRiceSell=function()//�����Ű�
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.bizRiceSell();' ,500);
		}
		else
		{
			if(this.dlg)
    			this.dlg.unload();
    		mainMethod.refresh();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+building.id, building, 1);
    		this.dlg.show();
		}
	}
	
	this.castleTaxModify=function()//��������
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.castleTaxModify();' ,500);
		}
		else
		{
			if(parseInt(building.n4BuildingCode)!=0)
			{
				Alert('castleTaxModify', '���������� ����� �� �ִ� ����Դϴ�.');
				return;
			}
			
			
			nxStatic.closePopup();
			if(this.popupTax!=null)
			{
				this.popupTax.unload();
				this.popupTax=null;	
			}
			this.popupTax = new nxTaxDialog('popupTax', building);
			this.popupTax.show();
			this.popupTax.onsubmit = function(building, n4Value)
			{	
				if(parseInt(building.n1PerTax)==parseInt(n4Value))
					return;
			
				var strMsg = "������ "+n4Value+"%�� �����մϱ�?";
				if(n4Value>5)
					strMsg = "���� ���� ��� ������ �ʽ��ϴ�.<br>�ν��� �����Ͻʽÿ�.<br><br>�̴�� �����մϱ�? ";
				building.n1PerTax_tmp=n4Value;
				Confirm(building, strMsg , callBackTaxConfirm, nxStatic.gameUser.n4KunsaSN);
    			function callBackTaxConfirm(isTrue, building)
				{
					if(isTrue)
					{
						function calBackTaxModify()
						{
							Alert('callBackTaxConfirmAlert','������ ����Ǿ����ϴ�.');
							mainMethod.refresh();
						}
						var cmd = new nxCommand(null, building);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_politicsTaxUpdate);
						cmd.addParam("n4CastleSN"	, building.n4CastleSN);
						cmd.addParam("n1PerTax"		, building.n1PerTax_tmp);
						//cmd.print();
						cmd.execute(calBackTaxModify);
						building.n1PerTax=building.n1PerTax_tmp;					
					}
    			}
				
				
			}
		}
	}
	
	this.castleZenPrize=function()//�ֹμ���
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.castleZenPrize();' ,500);
		}
		else
		{
			if(parseInt(building.n4BuildingCode)!=0)
			{
				Alert('castleTaxModify', '���������� ����� �� �ִ� ����Դϴ�.');
				return;
			}
			
			nxStatic.closePopup();
			//if(building.n4ZenCount<=10000)
			//{
			//	Alert('noOne','������ �׷� �ʿ䰡 �����ϴ�.');
			//	return;
			//}
			if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_'+this.id,'���� �۾��� ������ �� �����ϴ�.');
    			return;    		
    		}	
			if(this.popupGive!=null)
			{
				this.popupGive.unload();
				this.popupGive=null;	
			}		
			this.popupGive = new nxGiveDialog('popupGive', building);
			this.popupGive.show();
			this.popupGive.onsubmit = function(building, n4Value)
			{	if(n4Value==0)
					return;
				var strMsg = "���� "+addCommas(n4Value)+"�� �ֹε鿡�� �������ݴϴ�.";
				building.n4RiceAmount=n4Value;
				Confirm(building, strMsg , callBackGiveConfirm);
    			function callBackGiveConfirm(isTrue, building)
				{
					if(isTrue)
					{
						
						function callBackGive(xml, strText, building)
						{
							var ds = new NxDataSet(xml);
							building.n1LikeZen = parseInt(ds.rows[0].get("n1LikeZen"));
							mainMethod.refresh();
							Alert('callBackTaxConfirmAlert','������ '+building.n1LikeZen+'�� ����Ͽ����ϴ�.');
						}
						
						var cmd = new nxCommand(null, building);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_politicsGive);
						cmd.addParam("n4CastleSN"	, building.n4CastleSN);
						cmd.addParam("n4RiceAmount"		, building.n4RiceAmount);
						//cmd.print();
						cmd.execute(callBackGive);
						
						
						
					}
    			}
				
				
			}
		}
	}
	
	this.castleTaxForceTake=function()
	{
		var building = this.findBuilding(this.getNowCastleSN());
		this.building = building;
		if(building==null)
		{
			this.gotoBuilding(null, false);
			setTimeout('mainMethod.castleTaxForceTake();' ,500);
		}
		else
		{
			if(parseInt(building.n4BuildingCode)!=0)
			{
				Alert('castleTaxModify', '���������� ����� �� �ִ� ����Դϴ�.');
				return;
			}
			if(building.n4ZenCount<=10000)
			{
				Alert('noOne','�α��� �ʹ� �����ϴ�.');
				return;
			}
			if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_','���� �۾��� ������ �� �����ϴ�.');
    			return;    		
    		}
    			
			
			nxStatic.closePopup();
			function callBackForceTakeConfirm(isTrue, building)
			{
				if(isTrue)
				{
					function callBackTaxForce(xml, strText, building)
					{
						Alert('callBackTaxConfirmAlert','�ӽ�¡���� �Ϸ��Ͽ����ϴ�.');
						building.n1LikeZen = building.n1LikeZen>10 ? building.n1LikeZen-10 : 0;
						mainMethod.refresh();
					}
									
					var cmd = new nxCommand(null, building);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_PoliticsTaxTake);
					cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
					cmd.addParam("n4CastleSN"			, building.n4BuildingSN);
					//cmd.print();
					cmd.execute(callBackTaxForce);
					
				}
    		}
    		
			Confirm(building, "���� �̷��Ա��� �Ͻðڽ��ϱ�?" , callBackForceTakeConfirm);
    		
		}
	}
	
	this.insaCustomCreate=function()
	{
		this.CreateGeneralDialog = new nxCreateGeneralDialog('CreateGeneralDialog', this);
		this.CreateGeneralDialog.show();
	}
	
//--�޴� ��	


/*
	var building = this.findBuilding(this.getNowCastleSN());
	this.building = building;
	if(building==null)
	{
		this.gotoBuilding(null, false);
		setTimeout('mainMethod.setArmy();' ,500);
	}
	else
	{
	
	}
	
	
*/

	
}

























