
function nxGameGUI(strLayerID, n4Width, n4Height)
{
	NxControl.apply(this, arguments);
	this.setWidth(n4Width);
	this.setHeight(n4Height);
	this.setBG('');
	this.statPlayer = null;
	this.gameToolBar= null;
	this.charcterInfoWindow = null;
	var gameUI = this;
	
	this.show = function()
	{
		this.statPlayer = new nxStateUnit('statPlayer', this.parent.playUnit);
		this.statPlayer.setLeft(10);
		this.statPlayer.setTop(5);
		this.add(this.statPlayer);
		this.statPlayer.show();
		
		this.gameToolBar = new nxToolBar('gameToolBar');
		this.add(this.gameToolBar);
		this.gameToolBar.show();
		
		
		//캐릭정보버튼슬롯
		this.charcterInfoWindow = new nxCharacterInfo('charcterInfoWindow');
		this.add(this.charcterInfoWindow);
		
		this.slotCharacter = new nxUiSlot('slotCharacter', "C");
		this.add(this.slotCharacter);
		this.slotCharacter.isUseDragnDrop = false;
		this.slotCharacter.setLocation(595,415);
		this.slotCharacter.show();
		this.charcterInfoWindowButton = new nxUiButton('charcterInfoWindowButton', "/img/rpg/ui/Ui-charactercreate-races_human-male.png");
		this.slotCharacter.insertButton(this.charcterInfoWindowButton);
		this.charcterInfoWindowButton.show();
		this.slotCharacter.onClick.add
		(
			function (sender, args)
			{
				if(gameUI.charcterInfoWindow.Visible)
					gameUI.charcterInfoWindow.hide();
				else
					gameUI.charcterInfoWindow.show();
			}
		)
		
		//인벤토리버튼슬롯-nxInventory
		
		this.InventoryWindow = new nxInventory('InventoryWindow');
		this.add(this.InventoryWindow);
		
		this.slotInventory = new nxUiSlot('slotCharacter', "I");
		this.add(this.slotInventory);
		this.slotInventory.isUseDragnDrop = false;
		this.slotInventory.setLocation(630,415);
		this.slotInventory.show();
		this.inventoryButton = new nxUiButton('inventoryButton', "/img/rpg/ui/Inv_box_02.png");
		this.slotInventory.insertButton(this.inventoryButton);
		this.inventoryButton.show();
		this.slotInventory.onClick.add
		(
			function (sender, args)
			{
				if(gameUI.InventoryWindow.Visible)
					gameUI.InventoryWindow.hide();
				else
					gameUI.InventoryWindow.show();
			}
		)
		
				
		this._show();
	}
	
}
nxGameGUI.prototype = new NxControl();
nxGameGUI.prototype.constructor = nxGameGUI;


function nxCharacterInfo(strLayerID, playUnit)
{
	NxControl.apply(this, arguments);
	var CharacterInfo = this;
	this.Visible = false;
	this.playUnit = nxGameMain.gameGround.playUnit;
	this.setBG('black');
	this.setWidth(350);
	this.setHeight(360);
	this.setLeft(10);
	this.setTop(80);
	this.infoLayer = new NxControl('infoLayer_'+strLayerID);//저작권: 네이버 펠론(lucifel321) 
	this.add(this.infoLayer);
	this.infoLayer.setWidth(180);
	this.infoLayer.setHeight(340);
	this.infoLayer.setLeft(10);
	this.infoLayer.setTop(10);
	this.infoLayer.src = "/img/rpg/ui/chrInfo.png";
	this.infoLayer.show();
		
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
		ctl.setFontSize(12);
		ctl.show();
		return ctl;
	}
	
	this.boxHead = new nxUiEquipSlot('boxHead', null, '/img/rpg/ui/Ui-paperdoll-slot-head.png',gameItemCode.head,2);
	this.add(this.boxHead);
	this.boxHead.setLocation(85,30);
	this.boxHead.show();
	this.boxBody = new nxUiEquipSlot('boxBody',  null, '/img/rpg/ui/Ui-paperdoll-slot-tabard.png',gameItemCode.armor,3);
	this.add(this.boxBody);
	this.boxBody.setLocation(95,85);
	this.boxBody.show();
	this.boxRightHand = new nxUiEquipSlot('boxRightHand',  null, '/img/rpg/ui/Ui-paperdoll-slot-mainhand.png',gameItemCode.weapon, 0);
	this.add(this.boxRightHand);
	this.boxRightHand.setLocation(30,140);
	this.boxRightHand.show();
	this.boxLeftHand = new nxUiEquipSlot('boxLeftHand',  null, '/img/rpg/ui/Ui-paperdoll-slot-secondaryhand.png',gameItemCode.subWeapon, 1);
	this.add(this.boxLeftHand);
	this.boxLeftHand.setLocation(140,140);
	this.boxLeftHand.show();
	this.boxBelt = new nxUiEquipSlot('boxBelt', null,  '/img/rpg/ui/Ui-paperdoll-slot-waist.png',gameItemCode.belt,4);
	this.add(this.boxBelt);
	this.boxBelt.setLocation(95,145);
	this.boxBelt.show();
	this.boxLfinger = new nxUiEquipSlot('boxLfinger',  null, '/img/rpg/ui/Ui-paperdoll-slot-rfinger.png',gameItemCode.ring,5);
	this.add(this.boxLfinger);
	this.boxLfinger.setLocation(155,10);
	this.boxLfinger.show();
	this.boxRfinger = new nxUiEquipSlot('boxRfinger',  null, '/img/rpg/ui/Ui-paperdoll-slot-rfinger.png',gameItemCode.ring,6);
	this.add(this.boxRfinger);
	this.boxRfinger.setLocation(155,42);
	this.boxRfinger.show();
	this.boxRelic = new nxUiEquipSlot('boxRelic',  null, '/img/rpg/ui/Ui-paperdoll-slot-relic.png',gameItemCode.relic,7);
	this.add(this.boxRelic);
	this.boxRelic.setLocation(155,74);
	this.boxRelic.show();
	

	this.lblCharacterName	= this.createControl('lblCharacterName', 200, 20, 100, 20, this.playUnit.strCharacterName);
	this.lblCharacterLev	= this.createControl('lblCharacterLev', 200, 40, 100, 20, '레벨');
	this.lblCharacterStr	= this.createControl('lblCharacterStr', 200, 70, 100, 20, '힘');
	this.lblCharacterAgil	= this.createControl('lblCharacterAgil', 200, 90, 100, 20, '민첩');
	this.lblCharacterInt	= this.createControl('lblCharacterInt', 200, 110, 100, 20, '지능');
	this.lblCharacterCon	= this.createControl('lblCharacterCon', 200, 130, 100, 20, '체력');
	this.lblCharacterHP		= this.createControl('lblCharacterHP', 200, 160, 100, 20, '생명력');
	this.lblCharacterMP		= this.createControl('lblCharacterMP', 200, 180, 100, 20, '마법력');
	this.lblCharacterPower	= this.createControl('lblCharacterPower', 200, 210, 100, 20, '물리공격력');
	this.lblCharacterSpellPower		= this.createControl('lblCharacterSpellPower', 200, 230, 100, 20, '마법공격력');
	this.lblCharacterArmor			= this.createControl('lblCharacterArmor'	 , 200, 250, 100, 20, '방어력');
	this.lblCharacterCritical		= this.createControl('lblCharacterCritical'		, 200, 270, 100, 20, '치명타(%)');
	this.lblCharacterSpellCritical	= this.createControl('lblCharacterSpellCritical', 200, 290, 100, 20, '마법극대화(%)');
	this.lblCharacterDodge			= this.createControl('lblCharacterDodge'		, 200, 310, 100, 20, '회피(%)');
	this.lblCharacterPrevent		= this.createControl('lblCharacterPrevent'		, 200, 330, 100, 20, '막기(%)');
		
	
	this.lblValCharacterLev		= this.createControl('lblValCharacterLev', 250, 40, 100, 20, '0');
	this.lblValCharacterStr		= this.createControl('lblValCharacterStr', 250, 70, 100, 20, '0');
	this.lblValCharacterAgil		= this.createControl('lblValCharacterAgil', 250, 90, 100, 20, '0');
	this.lblValCharacterInt		= this.createControl('lblValCharacterInt', 250, 110, 100, 20, '0');
	this.lblValCharacterCon		= this.createControl('lblValCharacterCon', 250, 130, 100, 20, '0');
	this.lblValCharacterHP		= this.createControl('lblValCharacterHP',  250, 160, 100, 20, '0');
	this.lblValCharacterMP		= this.createControl('lblValCharacterMP',  250, 180, 100, 20, '0');
	this.lblValCharacterPower	    = this.createControl('lblValCharacterPower'     , 300, 210, 100, 20, '0');
	this.lblValCharacterSpellPower	= this.createControl('lblValCharacterSpellPower', 300, 230, 100, 20, '0');
	this.lblValCharacterArmor			= this.createControl('lblValCharacterArmor'	 , 300, 250, 100, 20, '0');
	this.lblValCharacterCritical		= this.createControl('lblValCharacterCritical'		, 300, 270, 100, 20, '0');
	this.lblValCharacterSpellCritical	= this.createControl('lblValCharacterSpellCritical', 300, 290, 100, 20, '0');
	this.lblValCharacterDodge			= this.createControl('lblValCharacterDodge'		, 300, 310, 100, 20, '0');
	this.lblValCharacterPrevent			= this.createControl('lblValCharacterPrevent'		, 300, 330, 100, 20, '0');
	
	this.updateCharacterInfo=function()
	{
		this.lblValCharacterLev.setText(this.playUnit.n4Level);	
		this.lblValCharacterStr.setText(this.playUnit.n4Str);
		this.lblValCharacterAgil.setText(this.playUnit.n4Agil);
		this.lblValCharacterInt.setText(this.playUnit.n4Int);
		this.lblValCharacterCon.setText(this.playUnit.n4Conf);
		this.lblValCharacterHP.setText(this.playUnit.n4HPMax);
		this.lblValCharacterMP.setText(this.playUnit.n4MPMax);
		this.lblValCharacterPower.setText(this.playUnit.n4Power);
		this.lblValCharacterSpellPower.setText( this.playUnit.n4SpellPower);
		this.lblValCharacterArmor.setText( addCommas(this.playUnit.n4Armor) );
		this.lblValCharacterArmor.setAlt(this.playUnit.n4ArmorPer+"% 데미지 흡수");
		this.lblValCharacterCritical.setText(this.playUnit.n4Critical);
		this.lblValCharacterSpellCritical.setText(this.playUnit.n4SpellCritical);
		this.lblValCharacterDodge.setText(this.playUnit.n4Dodge);
		this.lblValCharacterPrevent.setText(this.playUnit.n4Prevent);
	}
	this.playUnit.onUnitUpdate.add
	(
		function()
		{
			CharacterInfo.updateCharacterInfo();
		}
	);
	
	this.onShow = new NxEventDelegate(this);
		
	this.show=function()
	{
		this.Visible = true;
		this.updateCharacterInfo();
		//var np = new NxPlayer(sndFile);
		//np.play();
		//np=null;
		this._show();
		this.onShow.execute();
	}
	this.hide=function()
	{
		this.Visible = false;
		this._hide();
	}
}
nxCharacterInfo.prototype = new NxControl();
nxCharacterInfo.prototype.constructor = nxCharacterInfo;

function nxStateUnit(strLayerID, playUnit)
{
	NxControl.apply(this, arguments);
	
	this.playUnit = playUnit;
	this.setWidth(200);
	this.setHeight(60);
	this.setBG('');
		
	this.picUnit = new NxControl('picUnit');	
	this.add(this.picUnit);
	this.picUnit.style.border= "2px solid #E28A36";
	this.picUnit.setWidth(60);
	this.picUnit.setHeight(56);
	this.picUnit.src = this.playUnit.getFaceImage();
	this.picUnit.setBG('black');
	this.picUnit.show();
	
	this.lblName = new NxControl('lblName');	
	this.add(this.lblName);
	this.lblName.setFontSize(15);
	this.lblName.setLeft(64);
	this.lblName.setTop(0);
	this.lblName.setWidth(134);
	this.lblName.setHeight(18);
	this.lblName.style.textAlign="center";
	this.lblName.style.fontWeight	= 'bold';
	this.lblName.setText(this.playUnit.strCharacterName);
	this.lblName.setBG('');
	this.lblName.show();
	
	this.lifeBar = new nxStateBar('lifeBar', this, 'red', true);
	this.add(this.lifeBar);
	this.lifeBar.setLeft(64);
	this.lifeBar.setTop(19);
	this.lifeBar.setWidth(134);
	this.lifeBar.setHeight(18);
	this.lifeBar.show();
	this.lifeBar.update(this.playUnit.n4HPMax, this.playUnit.n4HP);
	
	this.manaBar = new nxStateBar('lifeBar', this, 'blue', true);
	this.add(this.manaBar);
	this.manaBar.setLeft(64);
	this.manaBar.setTop(37);
	this.manaBar.setWidth(134);
	this.manaBar.setHeight(18);
	this.manaBar.show();
	this.manaBar.update(this.playUnit.n4MPMax, this.playUnit.n4MP);
	
	
	this.playUnit.onUnitUpdate.add
	(
		function(owner)
		{
			var stat = nx(strLayerID);
			stat.lifeBar.update(owner.n4HPMax, owner.n4HP);
			stat.manaBar.update(owner.n4MPMax, owner.n4MP);
		}
	);
	playUnit.onUnitUpdate.execute();
	//playUnit.onUpdate();
	
	
}
nxStateUnit.prototype = new NxControl();
nxStateUnit.prototype.constructor = nxStateUnit;

function nxStateBar(strLayerID, owner, strColor, isUseTextStat)
{
	nxBar.apply(this, arguments);
	this.style.border= "1px solid #E28A36";
		
	this.lblText = null;
	
	this.update=function(n4Max, n4Now)
	{
		if(n4Max<=0 || n4Now==0)
			this.setPer(0);
		else
		{
			var val = parseInt( (n4Now/n4Max)*100);
			this.setPer( val  );
		}
		
		if(this.lblText==null && isUseTextStat)
		{
			this.lblText = new NxControl('lblText');
			this.add(this.lblText);
			this.lblText.setFontSize(13);
			this.lblText.style.textAlign="center";
			this.lblText.setWidth(this.getWidth());
			this.lblText.setHeight(this.getHeight());
			this.lblText.setBG('');
			this.lblText.show();
		}
		else if(isUseTextStat)
			this.lblText.setText(n4Now+"/"+n4Max);
	}	
}	
nxStateBar.prototype = new NxControl();
nxStateBar.prototype.constructor = nxStateBar;

function nxToolBar(strLayerID)
{
	NxControl.apply(this, arguments);
	var thisToolBar = this;
	this.setBG('');
	this.src = "/img/rpg/bg/toolbar.png";
	
	
	
	this.show=function()
	{
		this.setWidth(600);
		this.setHeight(70);
		this.setTop(this.parent.getHeight()-this.getHeight()-5);
		this.setWidth(this.parent.getWidth());
		this.moveCenter();
		
		this.createBtn(114,34,'nxSpellEnergyBolt');//Q
		this.createBtn(160,34,'nxSpellLightning');//W
		this.createBtn(204,34,'nxSkillBackStep');//E
		this.createBtn(249,34,'nxSpellDagger');//A
		this.createBtn(294,34,'nxSkillNormalAttack');//S
		this.createBtn(339,34,'nxSkillDashAttack');//D
		this.createBtn(384,34,'nxSpellCallLightning');//1
		this.createBtn(429,34);//.setSkill(null);//2
		this.createBtn(473,34);//.setSkill(null);//3
		this.createBtn(518,34);//.setSkill(null);//4
		this.createBtn(562,34);//.setSkill(null);//5
		this.createBtn(607,34);//.setSkill(null);//6
		this.createBtn(653,34);//.setSkill(null);//7
		
		this._show();
	}
	
	this.btns = new Array();
	this.btnsBystrKey = new Array();
	this.btnsByKey = new Array();
	this.btnHotKeys = new Array("Q","W","E","A","S","D","1","2","3","4","5","6","7");
	this.n4BtnIndex = 0;
	this.createBtn=function(n4Left, n4Top, strSkillClassName)
	{
		var slot = new nxUiSlot('slot_'+this.n4BtnIndex, this.btnHotKeys[this.n4BtnIndex], null);
		this.add(slot);
		slot.setLayerIndex(10);
		slot.setLeft(n4Left);
		slot.setTop(n4Top);
		slot.show();
		
		if(strSkillClassName)
		{
			var btn= new nxToolBarButton('btn_'+this.n4BtnIndex);
			slot.insertButton(btn)
			btn.setSkill(strSkillClassName);
			this.btns[this.n4BtnIndex]=btn;
			this.btnsBystrKey[ this.btnHotKeys[this.n4BtnIndex] ] = btn;
		}
		this.n4BtnIndex++;
	}
	
	nxGameMain.gameGround.playUnit.onKeyDown.add
	(
		function(sender, args)
		{
			thisToolBar.onPlayerKeyDown(sender, args);
		}
	);
	
	
	this.onPlayerKeyDown=function(sender, args)
	{
		var strCode = String.fromCharCode( parseInt(args[0]) ).trim();
		
	}
	
	this.doWaitGloba=function(sender, n4MilliSeconds)
	{
		for(var i=0;i<this.btns.length;i++)
		{
			if(this.btns[i]!=sender 
			&& this.btns[i].innerSkill!=null
			&& this.btns[i].n4WaitMilliSeconds<n4MilliSeconds
			)
				this.btns[i].doWait(n4MilliSeconds);	
		}
	}	
}	
nxToolBar.prototype = new NxControl();
nxToolBar.prototype.constructor = nxToolBar;


function nxUiSlot(strLayerID, strHotKey, imgSrc)
{
	NxControl.apply(this, arguments);
	//스킬, 착용가능장비, 소모품, 재료
	this.maskSlotType	= parseInt(0x01<<1) + parseInt(0x01<<10) + parseInt(0x01<<20) + parseInt(0x01<<30);
	this.playUnit		= nxGameMain.gameGround.playUnit;
	var thisSlot		= this;
	this.setBG('');
	this.isUseDragnDrop = true;
	this.strHotKey		= strHotKey;
	this.src = imgSrc!=null?imgSrc:'/img/rpg/ui/Ui-paperdoll-slot-blank.png';
	this.btnIcon = null;
		
	this.insertButton=function(btnIcon)
	{
		if(btnIcon!=this.btnIcon)
		{
			if(btnIcon!=null)
			{
				this.btnIcon = null;
				this.btnIcon = btnIcon;
				this.add(btnIcon);
				this.btnIcon.show();
			}
			else
				this.btnIcon = null;
			this.onSlotItemChanged(btnIcon);		
		}
	}
	this.onSlotItemChanged=function(btnIcon){}
	this.onShow = new NxEventDelegate(this);
	this.isEnableDropItem=function(objBtn)
	{
		if(!objBtn)
			return false;
		else
		{
			//alert( this.maskSlotType +'/'+ objBtn.maskBtnType );
			return parseInt(this.maskSlotType&objBtn.maskBtnType)>0?true:false;
		}
	}
	this.show=function()
	{
		this.setWidth(32);
		this.setHeight(30);
		this._show();
		
		if(this.strHotKey!=null)
		{
			if(this.imgHotKey!=null)
				this.imgHotKey.unload();	
			this.imgHotKey = new NxControl('imgHotKey');
			this.add(this.imgHotKey);
			this.imgHotKey.setWidth(18);
			this.imgHotKey.setHeight(18);
			this.imgHotKey.setLeft(20);
			this.imgHotKey.setBG('');
			this.imgHotKey.style.fontWeight	= 'bold';
			this.imgHotKey.setText(this.strHotKey);
			this.imgHotKey.setLayerIndex(10);
			this.imgHotKey.show();
		}
		
		this.onClick		= this.onClick==null? new NxEventDelegate(this):this.onClick;
		this.onClick.add
		(
			function()
			{
				if(thisSlot.btnIcon!=null)
				{
					thisSlot.btnIcon.onClick.execute();	
				}
			}
		)
		nxGameMain.gameGround.playUnit.onKeyDown.add
		(
			function(sender, args)
			{
				var strCode = String.fromCharCode( parseInt(args[0]) ).trim();//e.charCodeAt(0) 
				if(thisSlot.strHotKey==strCode)
				{
					thisSlot.onClick.execute(new Array(strCode, null));
				}
			}
		);
		
		thisSlot.onDrop.add
		(
			function()
			{
				if(document.dragUiObject!=null)
				{
					var dragedButton =  document.dragUiObject.innerControl;
					var fromSlot = document.dragUiObject.innerControl.parent;
					if( thisSlot.isEnableDropItem(dragedButton) )
					{
						document.dragUiObject.innerControl.setSize(document.dragUiObject.getWidth(), document.dragUiObject.getHeight());
						
						fromSlot.insertButton(thisSlot.btnIcon);
						thisSlot.insertButton( dragedButton );
						thisSlot.doLater("removeDragIcon()",200);
					}
				}
			}
		)
		
		this.onShow.execute();
		
	}
	
	
	
	//--각종 마우스 이벤트 시작-----------------------------------------
	this.onClick		= new NxEventDelegate(this);
	this.onMouseDown	= new NxEventDelegate(this);
	this.onMouseUp		= new NxEventDelegate(this);
	this.onMouseMove	= new NxEventDelegate(this);
	this.onDrag			= new NxEventDelegate(this);
	this.onDrop			= new NxEventDelegate(this);	
	
	this.isDragStart = false;
	this.isDown = 0;
	function downHandler(e)
	{
		thisSlot.isDown = 1;
		thisSlot.onMouseDown.execute();
		thisSlot.doLater("dragStart()",100);
	}
	this.dragStart=function()
	{
		if(!thisSlot.isUseDragnDrop)
			return;
		if(thisSlot.btnIcon!=null && thisSlot.isDown == 1)
		{
			if(document.dragUiObject!=null)
			{
				document.dragUiObject.innerControl.setSize(document.dragUiObject.getWidth(), document.dragUiObject.getHeight());
				document.dragUiObject.unload();
				document.dragUiObject = null;
			}
			document.dragUiObject = new NxControl('dragUiObject');
			document.dragUiObject.innerControl = thisSlot.btnIcon;
			document.dragUiObject.src = thisSlot.btnIcon.src;
			document.dragUiObject.setSize( thisSlot.btnIcon.getWidth(), thisSlot.btnIcon.getHeight() );
			document.dragUiObject.setLocation( document.dX+10, document.dY+10 );
			document.dragUiObject.setLayerIndex(10000);
			document.dragUiObject.setBG('');
			document.dragUiObject.show();
			document.dragUiObject.innerControl.setSize(0, 0);
			thisSlot.isDragStart = true;
		}
	}
	this.frmLayer.onmouseup=function(e)
	{
		//debug(this.NxControl.id);
		if(this.NxControl.isDown==1 && this.NxControl.isDragStart == false)
			thisSlot.onClick.execute();
		else if(thisSlot.isUseDragnDrop && document.dragUiObject!=null)
		{
			if(document.dragUiObject.innerControl.parent.isDragStart)
				thisSlot.onDrop.execute();	
		}
		thisSlot.onMouseUp.execute();
		thisSlot.isDown = 0;
	}
	function upHandler(e)
	{
		if(document.dragUiObject)
		{
			thisSlot.doLater("removeDragIcon()",200);
		}
		
	}
	this.removeDragIcon=function()
	{
		if(document.dragUiObject)
		{	
			document.dragUiObject.innerControl.setSize(document.dragUiObject.getWidth(), document.dragUiObject.getHeight());
			document.dragUiObject.innerControl.parent.isDragStart = false;
			document.dragUiObject.unload();
		}
		document.dragUiObject = null;
	}
	function moveHandler(e)
	{
		thisSlot.onMouseMove.execute();
		
		if(document.dragUiObject)
		{
			if(document.dragUiObject.innerControl.parent.isDragStart)
			{
				document.dragUiObject.setLocation(document.dX+10, document.dY+10);
			}
		}
	}
	function outHandler(e)
	{
		thisSlot.isDown = 0;
	}
	
	if(document.all)
	{
		this.frmLayer.onmousedown=function()
		{
			//this.NxControl.downHandler(null);
		}
		this.frmLayer.attachEvent("onmousedown", downHandler);
		document.attachEvent("onmouseup", upHandler);
		document.attachEvent("onmousemove", moveHandler);
		document.attachEvent("onmouseout", outHandler);
		
	}
	else
	{
		this.frmLayer.addEventListener("mousedown",downHandler,true);
		document.addEventListener("mouseup",upHandler,true);
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseout",outHandler,true);
	}
	//--각종 마우스 이벤트 종료-----------------------------------------
}
nxUiSlot.prototype = new NxControl();
nxUiSlot.prototype.constructor = nxUiSlot;


function nxUiButton(strLayerID, imgSrc)
{
	NxControl.apply(this, arguments);
	
	//스킬1, 착용가능장비10, 소모품20, 재료30
	this.maskBtnType	= parseInt(0x01<<1);
	this.style.cursor	= 'pointer';
	this.playUnit		= nxGameMain.gameGround.playUnit;
	var thisButton		= this;
	this.enableStatus = 0x01;
	this.setBG('');
	if(imgSrc)
		this.src = imgSrc;
		
	this.show=function(isShowOnly)
	{
		this.setWidth(32);
		this.setHeight(30);
		this._show();
		
		this.onClick= !this.onClick?new NxEventDelegate(this):this.onClick;
		this.onClick.add
		(
			function(sender, args){	thisButton.run();	}
		)
				
	}
	this.onClick		= new NxEventDelegate(this);
	this.run=function(){}
	this.n4WaitSeconds = 0;
	this.n4WaitMilliSeconds = 0;
	this.doWait=function (n4MilliSecond)
	{
		this.enableStatus = 0x00;
		this.setAlpha(80);
		this.n4WaitSeconds		= n4MilliSecond>0?parseInt(n4MilliSecond/1000):0;
		this.n4WaitMilliSeconds = n4MilliSecond;
		if(this.n4WaitSeconds>0)
		{
			this.setCountImage(this.n4WaitSeconds);
			var n4NexetMilliSecond = n4MilliSecond-1000;
			this.doLater("doWait("+n4NexetMilliSecond+")", 1000);
		}
		else
		{
			this.doLater("doReady()",n4MilliSecond);
		}
	}
	this.doReady=function()
	{
		this.enableStatus = 0x01;
		this.setAlpha(100);
		if(this.imgWaitCount!=null)
		{
			this.imgWaitCount.unload();
			this.imgWaitCount =null;
		}
	}
	this.imgWaitCount  = null;
	this.setCountImage=function(n4Count)
	{
		if(this.imgWaitCount==null)
		{
			this.imgWaitCount =	new NxControl('imgWaitCount_'+this.id);
			this.add(this.imgWaitCount);
			this.imgWaitCount.setLayerIndex(2);
			this.imgWaitCount.setBG('');
			this.imgWaitCount.setWidth(this.getWidth());
			this.imgWaitCount.setHeight(this.getHeight());
			this.imgWaitCount.style.fontWeight	= 'bold';
			this.imgWaitCount.setFontSize(22);
			this.imgWaitCount.show();
		}
		this.imgWaitCount.setText("<center>"+n4Count+"</cneter>");
		
	}
}
nxUiButton.prototype = new NxControl();
nxUiButton.prototype.constructor = nxUiButton;


function nxToolBarButton(strLayerID, imgSrc)//스킬
{
	nxUiButton.apply(this, arguments);
	var thisButton		= this;
	this.strUnitSkillClassName = null;
	this.innerSkill = null;
		
	this.setSkill=function(strUnitSkillClassName)
	{
		if(strUnitSkillClassName==null)
			strUnitSkillClassName = nxSkillNone;
		
		this.strUnitSkillClassName = strUnitSkillClassName;
		this.innerSkill= this.createSkillObject();
		this.src = this.innerSkill.getSkillIcon()?this.innerSkill.getSkillIcon():null;
		this.setTooltip(this.innerSkill.strTooltip,300,40);
		this.show();
		
		
		
	}
	this.run=function(){this.doSkill();}
	this.doSkill=function()
	{
		if( parseInt(this.playUnit.maskMotionCode&0x01<<20)>0 
		&& this.enableStatus&0x01>0)
		
		{
			if( this.createSkillObject().play() )
			{
				this.doWait(this.innerSkill.n4SkillCoolTime);	
				var toolBar = this.parent.parent;
				toolBar.doWaitGloba(this, this.innerSkill.n4SkillCoolTimeGlobal);
			}
		}
	}
	
	this.createSkillObject=function()
	{
		return eval("new "+this.strUnitSkillClassName+"(nxGameMain.gameGround.playUnit)");
	}
	
		
	
}	
nxToolBarButton.prototype = new NxControl();
nxToolBarButton.prototype.constructor = nxToolBarButton;


function nxToolBarItemButton(strLayerID, imgSrc, itemObject)//인벤토리물건버튼
{
	nxUiButton.apply(this, arguments);
	
	//스킬1, 착용가능장비10, 소모품20, 재료30
	this.maskBtnType	= parseInt(0x00<<1)+parseInt(0x01<<10)+parseInt(0x01<<10)+parseInt(0x01<<10);
	this.itemObject = itemObject;
	var thisButton		= this;
	//this.setAlt(itemObject.alt);
	this.setTooltip(itemObject.alt,100,200);
	
	this.run=function()
	{
	
	}
}	
nxToolBarItemButton.prototype = new NxControl();
nxToolBarItemButton.prototype.constructor = nxToolBarItemButton;


function nxUiInvenSlot(strLayerID, strHotKey, imgSrc)
{
	nxUiSlot.apply(this, arguments);
	//스킬, 착용가능장비, 소모품, 재료
	this.maskSlotType	= parseInt(0x00<<1) + parseInt(0x01<<10) + parseInt(0x01<<20) + parseInt(0x01<<30);
	this.invenX = 0;
	this.invenY = 0;
	this.onSlotItemChanged=function(btnIcon)
	{
		nxGameMain.playUnit.setUnitInventoryItem(this.invenX, this.invenY, btnIcon?btnIcon.itemObject:null );
	}
}	
nxUiInvenSlot.prototype = new NxControl();
nxUiInvenSlot.prototype.constructor = nxUiInvenSlot;


function nxUiEquipSlot(strLayerID, strHotKey, imgSrc, n1ItemCode, n1SlotIndex)
{
	nxUiSlot.apply(this, arguments);
	//스킬, 착용가능장비, 소모품, 재료
	this.maskSlotType	= parseInt(0x00<<1) + parseInt(0x01<<10) + parseInt(0x00<<20) + parseInt(0x00<<30);
	var EquipSlot = this;
	this.n1ItemCode		= n1ItemCode;
	this.n1SlotIndex	= n1SlotIndex;
	this.invenX = 0;
	this.invenY = 0;
	
	this.init=function(n1Pulse)
	{
		if(!nxGameMain.playUnit.unitEquipment)
			this.doLater("init("+n1Pulse+")",100);
		else
		{
			if(this.btnIcon)
			{
				this.btnIcon.unload();
				this.btnIcon = null;
			}
			if(nxGameMain.playUnit.unitEquipment[this.n1SlotIndex])
			{
				var objItem = nxGameMain.playUnit.unitEquipment[this.n1SlotIndex];
				var itemBtn = new nxToolBarItemButton(this.id+'_'+this.n1SlotIndex, objItem.strImg, objItem);
				this.insertButton(itemBtn);
			}
			if(n1Pulse==1)
			{
				this.parent.onShow.add
				(
					function()
					{
						EquipSlot.init();
					}
				);
			}
		}
	}
	this.init(1);
	
	this.isEnableDropItem=function(objBtn)
	{
		if(!objBtn)
			return false;
		else
		{
			var isEnable =  parseInt(this.maskSlotType&objBtn.maskBtnType)>0?true:false;
			if(isEnable)
			{
				return this.n1ItemCode==objBtn.itemObject.n1ItemCode?true:false;
			}
		}
	}
		
	this.onSlotItemChanged=function(btnIcon)
	{
		nxGameMain.playUnit.setUnitEquipItem(n1SlotIndex, btnIcon?btnIcon.itemObject:null );
	}
}	
nxUiEquipSlot.prototype = new NxControl();
nxUiEquipSlot.prototype.constructor = nxUiEquipSlot;


function nxInventory(strLayerID)
{
	NxControl.apply(this, arguments);
	this.src = '/img/rpg/ui/inven_bg.png';
	this.Visible = false;
	this.setBG('black');
	this.playUnit = nxGameMain.playUnit;
	this.show=function()
	{
		this.setSize(148, 350);
		this.setLocation(450,80);	
		this.Visible = true;	
		this._show();
		this.reContainItems();
	}
	this.reContainItems=function()
	{
		for(var i=0;i<this.playUnit.unitInventory.length;i++)
		{
			for(var j=0;j<this.playUnit.unitInventory[i].length;j++)
			{
				if(this.slotArray[i][j])
				{
					if(this.slotArray[i][j].btnIcon)
					{
						this.slotArray[i][j].btnIcon.unload();
						this.slotArray[i][j].btnIcon = null;
					}
				}
				if(this.playUnit.unitInventory[i][j])
				{
					var itemBtn = new nxToolBarItemButton(strLayerID+'_invenBtn_'+i+'_'+j, this.playUnit.unitInventory[i][j].strImg, this.playUnit.unitInventory[i][j]);
					this.slotArray[i][j].insertButton(itemBtn);
				}
				
			}
		}
	}
	this.hide=function()
	{
		this.Visible = false;	
		this._hide();
	}
	this.n4SlotIndex =0;
	
	this.createSlot=function(n4Left, n4Top)
	{
		var slot = new nxUiInvenSlot('slot_myInven'+this.n4SlotIndex, null, null);
		this.add(slot);
		slot.setLayerIndex(10);
		slot.setLocation(n4Left, n4Top);
		slot.show();
		this.n4SlotIndex++;
		return slot;
	}
	this.slotArray = new Array();
	this.init=function()
	{
		if(this.playUnit.unitInventory==null)
		{
			this.doLater("init()",100);
			return;	
		}
		
		for(var i=0;i<this.playUnit.unitInventory.length;i++)//
		{
			var slotRow = new Array();
			for(var j=0;j<this.playUnit.unitInventory[i].length;j++)//
			{
				var n4Left  = i*32+10;
				var n4Top	= j*30+25;
				slotRow[j] = this.createSlot(n4Left, n4Top);
				slotRow[j].invenX = i;
				slotRow[j].invenY = j;
				
			}
			this.slotArray[i]=slotRow;
		}
	}
	this.init();

}	
nxInventory.prototype = new NxControl();
nxInventory.prototype.constructor = nxInventory;




