

function nxPlayUnit(strLayerID)
{
	NxControl.apply(this, arguments);

	this.setWidth(250);
	this.setHeight(250);
	this.setBG('');
	this.arrMotions = new Array(); //nxMotion
	this.n1MotionIndex  = 0;
	this.n1MotionCode	= nxUnitMotion.Stand;//0-정지
	this.n1MotionDirection	= nxUnitMotion.DirectionBase;//정방향 ->
	this.arrMoveDirection	= new Array(0,0,0,0);//좌우상하
	this.n1MoveAmountPixel	= 2;
	this.isUseWeapon		= true;

	//--body
	this.bodyControl = new NxControl("nxBodyControl_"+this.id);
	this.bodyControl.setWidth(250);
	this.bodyControl.setHeight(250);
	this.bodyControl.setBG('');
	this.add(this.bodyControl);
	this.bodyControl.show();

	//--weapon
	this.weaponControl = new nxWeaponControl("nxWeaponControl_"+this.id);
	this.weaponControl.setWidth(250);
	this.weaponControl.setHeight(250);
	this.add(this.weaponControl);
	if(this.isUseWeapon)
		this.weaponControl.show();

	this.imgageArray = new Array();
	this.setBody=function(src)
	{
		if(!this.imgageArray[src])
		{
			this.imgageArray[src] = new NxControl(src);
			this.imgageArray[src].setBG('');
			this.imgageArray[src].src = src;
			this.imgageArray[src].setWidth(this.getWidth());
			this.imgageArray[src].setHeight(this.getHeight());
		}
		this.bodyControl.setText("");
		this.bodyControl.add(this.imgageArray[src]);
		this.imgageArray[src].show();
		this.bodyControl.show();
	}

//<--쓰레드----------------------------------------------------------------------------
	this.n4MotionThreadIndex = 0
	this.motionThread = function(n1MotionCode, n4ThreadIndex)
	{
		if(n4ThreadIndex<this.n4MotionThreadIndex || n4ThreadIndex==null)
			return;
		if(n4ThreadIndex>this.n4MotionThreadIndex)
			this.n4MotionThreadIndex = n4ThreadIndex;
		if(n1MotionCode!=this.n1MotionCode)
			return;

		var motion	= this.arrMotions[this.n1MotionIndex]
		var src		= this.n1MotionDirection==nxUnitMotion.DirectionBase ? motion.strImgSrc : motion.strImgSrcInvert;
		this.setBody(src);
		if(this.isUseWeapon)
		{
			this.weaponControl.show();
			this.weaponControl.setWeaponImage(src);
		}
		else
			this.weaponControl.hide();

		if( this.arrMotions[this.n1MotionIndex+1] )
		{
			this.n1MotionIndex++;
			var n4Sleep = motion.n4Sleep;
			setTimeout("document.getElementById('"+this.id+"').NxControl.motionThread("+n1MotionCode+", "+n4ThreadIndex+")", n4Sleep);
		}
		else if(motion.isRepeat)
		{
			this.n1MotionIndex = 0;
			var n4Sleep = motion.n4Sleep;
			setTimeout("document.getElementById('"+this.id+"').NxControl.motionThread("+n1MotionCode+","+n4ThreadIndex+")" , n4Sleep);
		}
		else if(!motion.isRepeat)//모션종료 시 기본 포즈
		{
			this.setMotion(nxUnitMotion.Stand);
		}
		window.status='화면이 깜빡이신다면 파이어폭스를 사용해보세요. ^^';

	}
	this.moveThread = function()
	{
		if(this.arrMoveDirection[0]==1)
			this.setLeft(this.getLeft()-this.n1MoveAmountPixel);
		else if(this.arrMoveDirection[1]==1)
			this.setLeft(this.getLeft()+this.n1MoveAmountPixel);
		else if(this.arrMoveDirection[2]==1)
			this.setTop(this.getTop()-this.n1MoveAmountPixel);
		else if(this.arrMoveDirection[3]==1)
			this.setTop(this.getTop()+this.n1MoveAmountPixel);

		setTimeout("document.getElementById('"+this.id+"').NxControl.moveThread()", 10);
		
	}
//---쓰레드 끝---------------------------------------------------------------------------->

//---모션설정
	this.setMotion = function(n1MotionCode)
	{
		if(this.n1MotionCode==n1MotionCode && this.arrMotions[0])
			return;
		

		if(n1MotionCode==nxUnitMotion.Stand)
			this.arrMotions=this.getBaseMotion();	
		else if(n1MotionCode==nxUnitMotion.Walk)
		{
			this.n1MoveAmountPixel	= 2;
			this.arrMotions=this.getWorkMotion();
		}
		else if(n1MotionCode==nxUnitMotion.Run)
		{
			this.n1MoveAmountPixel	= 4;
			this.arrMotions=this.getRunMotion();
		}
		else if(n1MotionCode==nxUnitMotion.NormalAttack)
		{
			this.arrMotions=this.getNormalAttackMotion();
		}
		
				
		this.n1MotionIndex = 0;
		this.n1MotionCode=n1MotionCode;
		this.motionThread(n1MotionCode, this.n4MotionThreadIndex+1);
	}
//--모션설정 끝

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/stand_00.png", false, 1000);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/stand_01.png", true, 1000);
		
		return MotionArray;
	}
	this.getWorkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("/img/rpg/warrior/walk_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/walk_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/walk_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/walk_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/walk_04.png", false, 100);
		MotionArray[5] = new nxMotion("../img/rpg/warrior/walk_05.png", false, 100);
		MotionArray[6] = new nxMotion("../img/rpg/warrior/walk_06.png", true, 100);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/run00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/run00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/run00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/run00_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/run00_04.png", false, 100);
		MotionArray[5] = new nxMotion("../img/rpg/warrior/run00_05.png", true, 100);
		
		return MotionArray;
	}
	this.getNormalAttackMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/attack00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/attack00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/attack00_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/attack00_03.png", false, 300);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/attack00_04.png", false, 500);

		return MotionArray;
	}
//<--모션배열 끝--------------------------------------------------------------------------

//<!--쓰레드 시작-------------------------------------------------------------------------
	this.setMotion(nxUnitMotion.Stand);
	this.moveThread();
//--쓰레드 시작-------------------------------------------------------------------------->
	
//<---키 이벤트----------------------------------------------------------------------------
	this.dateLastKeyDate = new Date();
	this.n4LastKeyCode	= 0;
	this.receiveKeyDownEvent = function(keyCode)
	{
		//document.getElementById('debugLayer').innerHTML = document.getElementById('debugLayer').innerHTML+"<BR>"+keyCode;
		if(keyCode>=37 && keyCode<=40)//이동키
		{
			var dateNow = new Date();
			var n1NowMin	= dateNow.getMinutes();
			var n1NowSec	= dateNow.getSeconds();
			var n1LstMin	= this.dateLastKeyDate.getMinutes();
			var n1LastSec	= this.dateLastKeyDate.getSeconds();

			var isDoubleKey = false;
			if(this.n4LastKeyCode==keyCode && n1NowMin==n1LstMin && Math.abs(n1NowSec-n1LastSec)<=1)
				isDoubleKey = true;//alert(this.n4LastKeyCode+'/'+keyCode+' '+n1NowMin+'/'+n1LstMin+' '+(n1NowSec-n1LastSec));
				

			if(keyCode==37)
			{
				this.arrMoveDirection[0]=1;
				this.n1MotionDirection	= nxUnitMotion.DirectionInvert;
			}
			else if(keyCode==38)
				this.arrMoveDirection[2]=1;
			else if(keyCode==39)
			{
				this.arrMoveDirection[1]=1;
				this.n1MotionDirection	= nxUnitMotion.DirectionBase;
			}
			else if(keyCode==40)
				this.arrMoveDirection[3]=1;

			if(!isDoubleKey)
				this.setMotion(nxUnitMotion.Walk);	
			else
				this.setMotion(nxUnitMotion.Run);	
			
			this.n4LastKeyCode	 = keyCode;
			this.dateLastKeyDate = new Date();
		}
		else if(keyCode==83)
			this.setMotion(nxUnitMotion.NormalAttack);
		else if(keyCode==82)
			this.isUseWeapon		= this.isUseWeapon?false:true;

		
	}
	this.receiveKeyUpEvent = function(keyCode)
	{
		if(keyCode>=37 && keyCode<=40)//이동키
		{
			if(keyCode==37)
				this.arrMoveDirection[0]=0;
			else if(keyCode==38)
				this.arrMoveDirection[2]=0;
			else if(keyCode==39)
				this.arrMoveDirection[1]=0;
			else if(keyCode==40)
				this.arrMoveDirection[3]=0;
		
			if(this.arrMoveDirection[0]==0 && this.arrMoveDirection[1]==0 && this.arrMoveDirection[2]==0 && this.arrMoveDirection[3]==0)
				this.setMotion(nxUnitMotion.Stand);
		}

		
	}
	this.receiveKeyPressEvent = function(keyCode)
	{
		//alert(keyCode);
	}
//---키 이벤트 끝---------------------------------------------------------------------------->

}
nxPlayUnit.prototype = new NxControl();
nxPlayUnit.prototype.constructor = nxPlayUnit;

function nxWeaponControl(strLayerID)
{
	NxControl.apply(this, arguments);
	this.setBG('');
	this.strWeapon = 'deathblow';

	this.setBody=function(src)
	{
		this.setText("<img src='"+src+"' width=100% height=100% />");
	}

	this.setWeapon=function(strWeapon)
	{
		this.strWeapon = strWeapon;
	}

	this.setWeaponImage=function(srcMotion)
	{
		var keyIndex = srcMotion.lastIndexOf('/');
		var strMotion = srcMotion.substring(keyIndex+1);
		var strWeaponMotion = 'weapon/'+this.strWeapon+'_'+strMotion;
		srcMotion = srcMotion.split(strMotion).join(strWeaponMotion);
		//alert(srcMotion);

		this.setBody(srcMotion);
	}
}
nxWeaponControl.prototype = new NxControl();
nxWeaponControl.prototype.constructor = nxWeaponControl;


var nxUnitMotion = new function _nxUnitMotion()
{
	this.Stand	= 0;
	this.Walk	= 1;
	this.Run	= 2;
	this.NormalAttack	= 3;

	this.DirectionBase	=0;
	this.DirectionInvert=1;
}
var nxUnitWeapon = new function _nxUnitWeapon()
{
	this.deathBlow = "deathblow";
}

function nxMotion(strImgSrc, isRepeat, n4Sleep)
{
	this.strImgSrc		= strImgSrc;
	this.strImgSrcInvert= strImgSrc.split('.png').join('_invert.png');
	this.isRepeat	= isRepeat;
	this.n4Sleep	= !n4Sleep ? 500 : n4Sleep;
}