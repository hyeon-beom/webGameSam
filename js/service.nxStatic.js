var nxStatic = new function _nxStatic()
{
	this.mainContainer	= null;
	this.gameUser		= null;
	this.mainMenu		= null;
	this.n4CellWidth = 100;
	this.n4CellHeight= 100;
	
	this.n4WidthCastle = 160;
	this.n4WidthBase   = 8
	
	this.objBuildings = new Array();
	this.ignoreControlID = false;
	
	this.msgArray = new Array();
	this.sortArray = new Array();
	
	//-------------팝업
	this.nxPopupMenu	= null;
	this.setPopup=function(popup)
	{
		this.closePopup();
		this.nxPopupMenu = popup;
	}
	this.closePopup=function()
	{
		if(this.nxPopupMenu!=null)
		{
			this.nxPopupMenu.hide();
			//this.nxPopupMenu.unload();
		}
	}
	//------------다이어로그
	this.nxDialog	= null;
	this.setDialog=function(Dialog)
	{
		this.closePopup();
		this.closeDialog();
		this.nxDialog = Dialog;
	}
	this.closeDialog=function()
	{
		if(this.nxDialog!=null)
		{
			try
			{
				this.nxDialog.unload();
				this.nxDialog.hide();	
			}catch(e2){}
			
		}
	}
	//------------input다이어로그
	this.nxInputDialog	= null;
	this.closeInputDialog=function()
	{
		if(this.nxInputDialog!=null)
		{
			try
			{
				this.nxInputDialog.unload();
				this.nxInputDialog.hide();	
			}catch(e2){}
			
		}
	}
	//------------알림(Notice)

	this.arrNoticeWindows = new Array();
	this.addNotice=function(objNotice)
	{
	  this.arrNoticeWindows[this.arrNoticeWindows.length]=objNotice;
	}
	this.removeNotice=function()
	{
		for(var i=this.arrNoticeWindows.length-1;i>=0;i--)
		{
			if(this.arrNoticeWindows[i])
			{
				this.arrNoticeWindows[i].unload();
				this.arrNoticeWindows[i] = null;
				return;
			}
		}
		this.arrNoticeWindows = new Array();
	}
	//----------컨펌	this.n4ConfirmIndex = 0;/
	this.closeConfirm=function(n4ConfirmIndex)
	{
		var strID  = 'confirm_'+ n4ConfirmIndex;
		document.getElementById(strID).NxControl.unload();
	}
	
	//----------쿼리아이디
	this.n1QueryID_GetListBuilding	= 1;
	this.n1QueryID_CreateBuilding	= 2;
	this.n1QueryID_RemoveBuilding	= 3;
	this.n1QueryID_GeneralGetList	= 4;
	this.n1QueryID_GetInfoBuilding	= 5;
	this.n1QueryID_BuildingProduceStart	= 6;
	this.n1QueryID_GameUserGetInfo		= 7;
	this.n1QueryID_BuildingUpgradeStart	= 8;
	this.n1QueryID_GetOutPriceJob	= 9;
	this.n1QueryID_merchantSell		= 10;
	this.n1QueryID_merchantBuy		= 11;
	this.n1QueryID_insaRequest		= 12;
	this.n1QueryID_insaCut			= 13;
	this.n1QueryID_insaGeneralPrize	= 14;
	this.n1QueryID_GeneralGetInfo	= 15;
	this.n1QueryID_GeneralUpdate	= 16;
	this.n1QueryID_combat_armyGetList	= 17;
	this.n1QueryID_combat_armyGetInfo	= 18;
	this.n1QueryID_combat_armyCreateUpdate	= 19;
	this.n1QueryID_combat_armyTrainingStart	= 20;
	this.n1QueryID_combat_Nation_GetList	= 21;
	this.n1QueryID_combat_KundanCreate		= 22;
	this.n1QueryID_system_msgGetList		= 23;
	this.n1QueryID_combat_LogGetList		= 24;
	this.n1QueryID_combat_GameUserGetinfo	= 25;
	this.n1QueryID_diplomacy_write			= 26;
	this.n1QueryID_diplomacy_list			= 27;
	this.n1QueryID_diplomacy_read			= 28;
	this.n1QueryID_diplomacy_update			= 29;
	this.n1QueryID_itemMasterGetList		= 30;
	this.n1QueryID_itemGeneralGetList		= 31;
	this.n1QueryID_itemGiveGeneral			= 32;
	this.n1QueryID_itemTakeGeneral			= 33;
	this.n1QueryID_politicsTaxUpdate		= 34;
	this.n1QueryID_politicsGive				= 35;
	this.n1QueryID_PoliticsTaxTake			= 36;
	this.n1QueryID_SearchName				= 37;
	this.n1QueryID_GeneralCreate			= 38;
	this.n1QueryID_itemSell					= 39;
	this.n1QueryID_itemInchant				= 40;
	this.n1QueryID_itemInchantTest			= 41;
	this.n1QueryID_itemSellMulti			= 42;
	
	
	
	//----------건물코드
	//0-성채, 1-거점,2-농장,3-마구간,4-대장간,5-병영,6-궁노
	this.n4BuildingCode_Castle	= 0;
	this.n4BuildingCode_Base	= 1;
	this.n4BuildingCode_Farm	= 2;
	this.n4BuildingCode_Horse	= 3;
	this.n4BuildingCode_BlackSM = 4;
	this.n4BuildingCode_Barrack = 5;
	this.n4BuildingCode_Tower	= 6;
	
	this.n4BuildingCode_Kangjok	= 100;
	this.n4BuildingCode_HwangKun= 101;
	this.n4BuildingCode_Hyungno	= 102;
	this.n4BuildingCode_CrossArmy= 103;
	
	//---------건물작업코드
	this.n1BuildingStatus_ready		= 0;
	this.n1BuildingStatus_work		= 1;
	this.n1BuildingStatus_upgrade	= 2;
	this.n1BuildingStatus_Inchant	= 3;
	//--------codeProcuct
	this.n1CodeProduct_rice	= 1;
	this.n1CodeProduct_horse= 2;
	this.n1CodeProduct_spear= 3;
	this.n1CodeProduct_soldier	= 4;
	this.n1CodeProduct_bow		= 5;
	
	//--장수직급코
	this.n1CodeGeneralGradeNO		= 0
	this.n1CodeGeneralGradeMukwan	= 1
	this.n1CodeGeneralGradeMunkwan	= 2
	this.n1CodeGeneralGradeGeneral	= 3
	this.n1CodeGeneralGradeKunsa	= 4
	this.n1CodeGeneralGradeKunju	= 5
	
	//--부대 병과
	this.n1CodeCombatArmyType_sword	= 1
	this.n1CodeCombatArmyType_spear	= 2
	this.n1CodeCombatArmyType_horse	= 3
	this.n1CodeCombatArmyType_bow	= 4
	
	//--장수 작업코드
	this.n1CodeWorking_rest			= 0
	this.n1CodeWorking_product		= 1
	this.n1CodeWorking_develop		= 2
	this.n1CodeWorking_insa			= 3
	this.n1CodeWorking_kunjuRest	= 4

	//--부대상태
	this.n1CodeArmyStatus_rest		= 0;
	this.n1CodeArmyStatus_traing	= 1;
	this.n1CodeArmyStatus_move		= 2;
	this.n1CodeArmyStatus_combat	= 3;
	//--외교코드
	this.n1CodeDiplomacyAlly		= 1;
	this.n1CodeDiplomacyBreakAlly	= 2;
	this.n1CodeDiplomacyFriendy		= 3;
	this.n1CodeDiplomacySurrender	= 4;
	this.n1CodeDiplomacyHelp		= 5;
	
	this.arrCodeWoriking = new Array();
	this.arrCodeWoriking[0]	='휴식'
	this.arrCodeWoriking[1]	='생산'
	this.arrCodeWoriking[2]	='개발'
	this.arrCodeWoriking[3]	='등용'
	this.arrCodeWoriking[4]	='군주휴식'
	this.arrCodeWoriking[5]	='훈련'
	this.arrCodeWoriking[6]	='출병'
	this.arrCodeWoriking[7]	='외교'
	this.arrCodeWoriking[8]	='이동'
	this.arrCodeWoriking[9]	='모병'
	
	
	this.getIcon=function(n4Code, width, height, alt)
	{
		var src = 'http://nexen.pe.kr/img/icon/';
		width = width?width:15;
		height= height?height:15;
		alt   = alt?alt:'';
		var arrImg = new Array();
		arrImg[1] = 'icon_sword.png';
		arrImg[2] = 'icon_spear.png';
		arrImg[3] = 'icon_horse.png';
		arrImg[4] = 'icon_bow.png';
		arrImg[5] = 'icon_tower.png';
		arrImg[6] = 'icon_bow.png';
		arrImg[7] = 'icon_gold.png';
		arrImg[8] = 'icon_soldier.png';
		arrImg[9] = 'icon_bread.png';
		arrImg[10] = '';
		
		return "<IMG src='"+src+arrImg[n4Code]+"' width='"+width+"' height='"+height+"' alt='"+alt+"' title='"+alt+"'  border=0 />"
	}
	
	this.isAdmin=function()
	{
		return this.gameUser.n4MasterSN==1?true:false;
	}
	
}

String.prototype.trim = function() {return this.replace(/(^\s*)|(\s*$)|($\s*)/g, "");} 