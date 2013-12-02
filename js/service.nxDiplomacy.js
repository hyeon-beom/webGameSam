
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
		
	//--드래그앤 드랍
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
	this.getNowCastleSN=function()//이건 거점도 포함된다
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
		Alert('requestContsruct', '갈색 화면의 원하는 위치(공터)를 클릭하세요.', nxStatic.gameUser.n4KunsaSN);
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
			
				

				var strText = n1BuildingStatus==1?'생산중': n1BuildingStatus==2?'업그레이드':'제련';
				
				timers[i].setAttribute("seconds", seconds-1);

				if(seconds>0)			
					timers[i].innerHTML = '<span style="color:yellow;">'+n4Hour+'시간 '+n4Min+"분 "+n1Sec+'초('+strText+')</span>';
				else
				{
					timers[i].innerHTML = '';
					this.countDownEnd(n4BuildingSN, i);					
					var n4BuildingCode		=parseInt(timers[i].getAttribute("n4BuildingCode"));
					//var n4GeneralSN			= parseInt(timers[i].getAttribute("n4GeneralSN"));
					var n1BuildingStatus	= parseInt(timers[i].getAttribute("n1BuildingStatus"));
					//alert(n4GeneralSN);
					
					var strBuildingName = '농장';
					if(n4BuildingCode==3)
						strBuildingName = "마구간"
					if(n4BuildingCode==4)
						strBuildingName = "대장간"
					if(n4BuildingCode==5)
						strBuildingName = "병영"
					if(n4BuildingCode==6)
						strBuildingName = "궁노"
					
					var strText = n1BuildingStatus==1?'생산이':n1BuildingStatus==2?'업그레이드가':'제련이';
					var strMsg = strBuildingName+"의 "+strText+" 완료되었습니다.";
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
					timers2[i].innerHTML = '<span style="color:yellow;">'+n4Min+"분 "+n1Sec+'초</span>';
				else
				{
					timers2[i].innerHTML = '<span style="color:yellow;">완료</span>';
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
			Confirm(building, '정말 철거하시겠습니까?', distruct);
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
			this.DipDialog = new nxDiplomacyListDialog('nxDipDialog', this, "외교일람");
			this.DipDialog.show();
		}
		
	}
	
//-------메뉴시작
	this.setArmy=function()//부대편성
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
					Alert('n1ArmyStatus_fail','출전중인 부대입니다.', nxStatic.gameUser.n4KunsaSN);
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
    		this.dlg.strCaption = "훈련";
    		this.dlg.n1SelectType = 2;
    		this.dlg.button.setTitle('훈련');
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
    				Alert('callBack_n1QueryID_combat_armyTrainingStart','훈련이 시작되었습니다.', nxStatic.gameUser.n4KunsaSN);
    			}
				var cmd = new nxCommand(null, dialogControl);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyTrainingStart);
				cmd.addParam("arrGeneralSN", arrGeneralSN);
				cmd.execute(callBack_n1QueryID_combat_armyTrainingStart);
				
			}
		}
	}
	
	this.combatStart=function()//출병
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
    		this.dlg.button.setTitle('확인');
    		this.dlg.strCaption = "군단편성"
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
					this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "어디를 공격합니까?",5,1,building.n4CastleSN_target);
    				this.dlgNation.show();
    				this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    				{
    					dlg.unload();
    					if(!selectedItems)
							return;
    					building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    					this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "군량", "군량을 얼마나 가져가시겠습니까?", nxStatic.gameUser.n4MasterRice>400000?400000:nxStatic.gameUser.n4MasterRice);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						Confirm(building, "정말 출병하시겠습니까?" , callBackCombatConfirm);
    						function callBackCombatConfirm(isTrue, building)
							{
								if(isTrue)
								{
									function callBackChulbyung(xml, strText, building)
									{
										Alert('callBackChulbyung_','출병하였습니다.', nxStatic.gameUser.n4KunsaSN);
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
	
	this.pveStart=function()//토벌
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
    		this.dlg.button.setTitle('확인');
    		this.dlg.strCaption = "군단편성"
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
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "어디를 공격합니까?",1,0);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    				this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "군량", "군량을 얼마나 가져가시겠습니까?", nxStatic.gameUser.n4MasterRice>400000?400000:nxStatic.gameUser.n4MasterRice);
    				this.dlgAmount.show();
    				this.dlgAmount.onsubmit = function(building, n4Value)
    				{
    					if(n4Value==0)
    						return;
    					building.n4Value=n4Value;	
    					Confirm(building, "정말 출병하시겠습니까?" , callBackCombatConfirm);
    					function callBackCombatConfirm(isTrue, building)
						{
							if(isTrue)
							{
								function callBackChulbyung(xml, strText, menuItem)
								{
									mainMethod.refresh();
									nxStatic.gameUser.requestUserInfo();
									Alert('callBackChulbyung_','출병하였습니다.', nxStatic.gameUser.n4KunsaSN);
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
	
	this.armyMove=function()//군사이동
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
    		this.dlg.button.setTitle('확인');
    		this.dlg.strCaption = "누구를 이동시키겠습니까?"
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
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "어디로 이동합니까?",6);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
						
					building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    				Confirm(building, "선택된 장수와 부대를 이동시키겠습니까?" , callBackCombatConfirm);
    				function callBackCombatConfirm(isTrue, building)
					{
						if(isTrue)
						{
							
							function callBackChulbyung(xml, strText, menuItem)
							{
								mainMethod.refresh();
								Alert('callBackChulbyung_','출발하였습니다.', nxStatic.gameUser.n4KunsaSN);
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
	
	this.insaRequest=function()	  //무장등용
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
    		this.dlg.strCaption = "누구를 등용하시겠습니까?";
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, menuItem, menuItem.n4CastleSN, menuItem.n4MasterSN);
				menuItem.n4GerneralSN_target = selectedItems[0].row['n4GeneralSN'];
    			this.dlg2.strCaption = "누구에게 시키겠습니까?";
    			this.dlg2.show();
    			this.dlg2.onsubmit = function(menuItem, selectedItems)
				{
					if(!selectedItems)
						return;
					if(nxStatic.mainContainer.GameUser.n4MasterGold<100)
					{
						Alert('insaAlert_'+menuItem.id, '금이 부족합니다.');
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
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'을(를) 등용하는데 성공하였습니다.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<50)
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'은(는) 단호히 거절하였습니다.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<60)
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'은 뜻을 같이 할 마음이 없는가 봅니다.',menuItem.n4GerneralSN_sasin);
						else if(n1Point<70)
							Alert('callBackInsaRequest_'+menuItem.id, '아쉽게도 '+ strGeneralName_target+'을(를) 등용하는데 실패하였습니다.',menuItem.n4GerneralSN_sasin);
						else
							Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'을(를) 등용하는데 실패하였습니다.',menuItem.n4GerneralSN_sasin);
					}
					
				}
			}
		}
	}
	
	
	this.generalPrize=function()//포상
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
    			Alert('cant_'+this.id,'아직 작업을 수행할 수 없습니다.');
    			return;    		
    		}	
    		this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this, building.n4CastleSN, building.n4MasterSN, -1, 99);
    		this.n4CastleSN = building.n4CastleSN;
    		this.n4MasterSN = building.n4MasterSN;
    		this.dlg.strCaption = "누구에게 주시겠습니까?";
    		this.dlg.n1SelectType = 2;
    		this.dlg.show();
	    	
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
						
				var n4NeedGold = selectedItems.length*100;
				if(parseInt(nxStatic.gameUser.n4MasterGold)<n4NeedGold)
				{
					Alert('callBackInsaPrize_'+menuItem.id, '금('+addCommas(n4NeedGold)+')이 부족합니다.');
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
					Alert('callBackInsaPrize_'+menuItem.id, '무장의 충성도가 올랐습니다.');
				}
				

			}
		}
	}
	
	
	this.insaModify=function(n4GeneralSN)//임명
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
    		this.dlg.strCaption = "누구를 변경하시겠습니까?";
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
								Alert('callBackGeneralUpdate_'+menuItem.id, '장군은 5명을 초과하여 지정할 수 없습니다.');
								mainMethod.insaModify();
								return;
							}
						}
						mainMethod.refresh();
						Alert('callBackGeneralUpdate_'+menuItem.id, '무장의 정보가 변경되었습니다.');
						mainMethod.insaModify();
						
					}
					
				}

			}

			//목록에 장수번호가 왔다면 바로 열자
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
    		this.dlg.strCaption = "누구를 해고하시겠습니까?";
    		this.dlg.show();
    		this.dlg.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
						return;
				
				var isCustomGeneral = parseInt(selectedItems[0].row["isCustomGeneral"]);
				var n1Working = selectedItems[0].row["n1Working"];
				/*if(isCustomGeneral==1)
				{
					Alert('notCut','신무장은 해고할 수 없습니다.', nxStatic.gameUser.n4KunsaSN);
					return;
				}
				*/
				if(n1Working!='-')
				{
					Alert('notCut','업무중인 무장은 해고할 수 없습니다.', nxStatic.gameUser.n4KunsaSN);
					return;
				}
				
						
				Confirm(selectedItems, '다시한번 생각해주십시오.<BR>정말 해고하시겠습니까?', cutcut);
				function cutcut(isTrue, selectedItems)
				{
					if(isTrue)
					{
						function callBackInsaCut(xml, strText, menuItem)
						{
							mainMethod.refresh();
							Alert('callBackInsaCut', '해고하였습니다.');
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
	
	this.nationAllyRequest=function()//동맹요청
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

    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "대상 군주를 선택하세요.", 3,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "누구를 보내시겠습니까?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "동맹요청", "금을 얼마나 가져가시겠습니까?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
		    				
    						building.n4Value=n4Value;	
    						Confirm(building, "사신을 보내시겠습니까?" , callBackDiplomacyConfirm, nxStatic.gameUser.n4KunsaSN);
    						function callBackDiplomacyConfirm(isTrue, building)
							{
								if(isTrue)
								{
									
									
									function callBackDiplomacy1(xml, strText, building)
									{
										mainMethod.refresh();
										Alert('callBackDiplomacy1_','그들을 우리의 든든한 우방으로 만들고 오겠습니다.', building.n4GeneralSN_sasin);
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
	
	this.nationAllyBreak=function()//동맹파기
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
    		this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "대상 군주를 선택하세요.", 4,1);
    		this.dlgNation.show();
    		this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    		{
    			dlg.unload();
    			if(!selectedItems)
					return;
    			building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    			building.strMasterName_target = selectedItems[0].row['strMasterName'];
    			this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    			this.dlg2.strCaption = "누구를 보내시겠습니까?";
    			this.dlg2.show();
    			this.dlg2.onsubmit = function(building, selectedItems)
				{
					if(!selectedItems)
						return;
					building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
					building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
					Confirm(building, "무장들이 동요할 것입니다. <BR> 정말로 사신을 보내시겠습니까?" , callBackDiplomacyConfirm2, nxStatic.gameUser.n4KunsaSN);
    				function callBackDiplomacyConfirm2(isTrue, building)
					{
						if(isTrue)
						{
							function callBackDiplomacy2(xml, strText, building)
							{
								mainMethod.refresh();
								Alert('callBackDiplomacy2_','무장들의 충성도가 하락하였습니다.');
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
	
	this.nationFriendly=function()//친선
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
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id,building, "대상 군주를 선택하세요.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "누구를 보내시겠습니까?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "친선", "금을 얼마나 가져가시겠습니까?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
							building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    						Confirm(building, "사신을 보내시겠습니까?" , callBackDiplomacyConfirm3);
    						function callBackDiplomacyConfirm3(isTrue, building)
							{

									if(isTrue)
									{
										function callBackDiplomacy3(xml, strText, building)
										{
											mainMethod.refresh();
											Alert('callBackDiplomacy3_', '다녀오도록 하겠습니다.', building.n4GeneralSN_sasin);
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
	
	this.nationRequestSurrender=function()//항복권고
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
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "대상 군주를 선택하세요.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "누구를 보내시겠습니까?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
						Confirm(building, "사신을 보내시겠습니까?" , callBackDiplomacyConfirm4);
    					function callBackDiplomacyConfirm4(isTrue, building)
						{
							if(isTrue)
							{
								function callBackDiplomacy4(xml, strText, building)
								{
									mainMethod.refresh();
									Alert('callBackDiplomacy4_','쉽게 항복하지 않을 것입니다.');
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
	
	this.nationHelpMe=function()//원조요청
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
			
    			this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "대상 군주를 선택하세요.", 2,1,building.n4CastleSN_target);
    			this.dlgNation.show();
    			this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    			{
    				dlg.unload();
    				if(!selectedItems)
						return;
    				building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    				building.strMasterName_target = selectedItems[0].row['strMasterName'];
    				this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    				this.dlg2.strCaption = "누구를 보내시겠습니까?";
    				this.dlg2.show();
    				this.dlg2.onsubmit = function(building, selectedItems)
					{
						if(!selectedItems)
							return;
						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
						this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "원조요청", "원조를 얼마나 요청하시겠습니까?", 10000);
    					this.dlgAmount.show();
    					this.dlgAmount.onsubmit = function(building, n4Value)
    					{
    						if(n4Value==0)
    							return;
    						building.n4Value=n4Value;	
    						building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
							building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    						Confirm(building, "사신을 보내시겠습니까?" , callBackDiplomacyConfirm5);
    						function callBackDiplomacyConfirm5(isTrue, building)
							{

									if(isTrue)
									{
										function callBackDiplomacy5(xml, strText, building)
										{
											mainMethod.refresh();
											Alert('callBackDiplomacy5_',building.strMasterName_target+'님은 우리를 도와주실 것입니다.', building.n4GeneralSN_sasin);
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
	
	this.bizRiceBuy=function()//군량 매입
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
	
	this.bizRiceSell=function()//군량매각
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
	
	this.castleTaxModify=function()//세율변경
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
				Alert('castleTaxModify', '본성에서만 사용할 수 있는 명령입니다.');
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
			
				var strMsg = "세율을 "+n4Value+"%로 변경합니까?";
				if(n4Value>5)
					strMsg = "별로 좋은 방법 같지는 않습니다.<br>민심을 생각하십시오.<br><br>이대로 진행합니까? ";
				building.n1PerTax_tmp=n4Value;
				Confirm(building, strMsg , callBackTaxConfirm, nxStatic.gameUser.n4KunsaSN);
    			function callBackTaxConfirm(isTrue, building)
				{
					if(isTrue)
					{
						function calBackTaxModify()
						{
							Alert('callBackTaxConfirmAlert','세율이 변경되었습니다.');
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
	
	this.castleZenPrize=function()//주민선정
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
				Alert('castleTaxModify', '본성에서만 사용할 수 있는 명령입니다.');
				return;
			}
			
			nxStatic.closePopup();
			//if(building.n4ZenCount<=10000)
			//{
			//	Alert('noOne','지금은 그럴 필요가 없습니다.');
			//	return;
			//}
			if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_'+this.id,'아직 작업을 수행할 수 없습니다.');
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
				var strMsg = "군량 "+addCommas(n4Value)+"를 주민들에게 나누어줍니다.";
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
							Alert('callBackTaxConfirmAlert','민충이 '+building.n1LikeZen+'로 상승하였습니다.');
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
				Alert('castleTaxModify', '본성에서만 사용할 수 있는 명령입니다.');
				return;
			}
			if(building.n4ZenCount<=10000)
			{
				Alert('noOne','인구가 너무 적습니다.');
				return;
			}
			if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_','아직 작업을 수행할 수 없습니다.');
    			return;    		
    		}
    			
			
			nxStatic.closePopup();
			function callBackForceTakeConfirm(isTrue, building)
			{
				if(isTrue)
				{
					function callBackTaxForce(xml, strText, building)
					{
						Alert('callBackTaxConfirmAlert','임시징수를 완료하였습니다.');
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
    		
			Confirm(building, "정말 이렇게까지 하시겠습니까?" , callBackForceTakeConfirm);
    		
		}
	}
	
	this.insaCustomCreate=function()
	{
		this.CreateGeneralDialog = new nxCreateGeneralDialog('CreateGeneralDialog', this);
		this.CreateGeneralDialog.show();
	}
	
//--메뉴 끝	


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

























