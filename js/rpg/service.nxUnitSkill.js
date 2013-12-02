
function nxUnitSkill(playUnit)
{
	if(!playUnit)
		return ;
		
	this.playUnit	= playUnit;
	this.imgBG		= playUnit.parent;
	this.n4KnockBack= 0;
	this.n4SkillDamage = 0;
	this.n4SkillCoolTime		= 1000;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4SoundPlayTime		= 5000;
	this.n1SkillType			= 0;//0-물리, 1-마법
	
	this.n4NeedHP = 0;
	this.n4NeedMP = 0;
	
	this.onPlay	= new NxEventDelegate(this);
	this.play=function()
	{
		this.onPlay.execute();
		if(this.getDropItem())
			return true;
		
		if(this.isEnoughResource())
		{
			this.playEffectSound();
			this.playUnit.setMotion(nxUnitMotion.NormalAttack);
			this.useResource();
			this.doSpell();
			this.move();		
			this.giveDamage();
			return true;
		}
		else
			return false;
			
		
	}
	this.getDropItem=function(){return false;}
	this.isEnoughResource=function()
	{
		if(this.playUnit.n4HP>this.n4NeedHP && this.playUnit.n4MP>this.n4NeedMP)
			return true;
		else
			return false;
	}
	this.useResource=function()
	{
		this.playUnit.n4HP	-= this.n4NeedHP;
		this.playUnit.n4MP	-= this.n4NeedMP;
		this.playUnit.onUpdate();
	}
	this.getTargetUnits=function()
	{
		var rect = this.getRectAttackRegion();
		var units = rect.getUnitsInRect();
		return units;
	}
	this.giveDamage=function()
	{
		var units = this.getTargetUnits();
		for(var i=0;i<units.length;i++)
		{
			if(units[i]!=this.playUnit && units[i].isEnemy(this.playUnit))
			{
				if(!this.isAvoid(units[i]))
				{
					units[i].receiveDamage(this.getDamage(), this.playUnit,this);
					if(units[i].n1MotionDirection!=this.playUnit.n1MotionDirection)
					{
						units[i].doLater("doWound(true)", 100);
						units[i].slip(false,this.n4KnockBack,50);
					}
					else
					{
						units[i].doLater("doWound(false)", 100);
						units[i].slip(true,this.n4KnockBack,50);
					}
				}
					
			}
		}
	}
	this.doSpell=function(){}
	this.getRectAttackRegion=function()
	{
		return this.playUnit.getAttackRect();
	}
	this.move=function()
	{
		//if(this.playUnit.isMyUnit)
		//	this.playUnit.slip(true,10,50);
	}
	this.geteffectSound=function()
	{
		return "attack1.mp3";
	}
	this.playEffectSound=function()
	{
		var sndFile = this.geteffectSound();
		if(sndFile!=null)
		{
			var np = new NxPlayer(sndFile, this.n4SoundPlayTime);
			np.play();
			np=null;
		}
	}
	this.getDamage=function(){return (this.playUnit.getPower()+this.n4SkillDamage)*this.getCritical();}
	this.getCritical=function()
	{
		return this.playUnit.n4Critical>=this.getRand()?2:1;
	}
	this.isAvoid=function(targetPlayUnit)
	{
		var rnd = this.getRand();
		if(targetPlayUnit.n4Dodge>=rnd)
		{
			targetPlayUnit.doDodge();
			return true;
		}
		else if(targetPlayUnit.n4Prevent>=rnd)
		{
			targetPlayUnit.doPrevent();
			return true;
		}
		else
			return false;
	}
	this.getRand=function()
	{
		return Math.floor(Math.random() * 100)+1;
	}
	
	this.getPixelDistance=function(pos1, pos2)
	{
		var x = Math.abs(pos1.x-pos2.x);
		var y = Math.abs(pos1.y-pos2.y);

		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
	}
	
	this.getSkillIcon=function(){return "/img/rpg/spell/Ability_warrior_incite.png";}
	this.strTooltip = "n/a";
	
}
function nxSkillNormalAttack(playUnit)
{
	nxUnitSkill.apply(this, arguments);
	this.n4SkillCoolTime		= 200;
	this.n4SkillCoolTimeGlobal	= 200;
	this.n4SoundPlayTime		= 1000;
	
	this.strTooltip = "<b>일반공격</b><br>손에 쥔 무기로 근접한 적을 공격합니다.";
	thisSkill = this;
	
	this.getDropItem=function()
	{
		var drops = nxGameMain.gameGround.droppedItems;
		var pPos  = playUnit.getPosition();
		for(var i=0;i<drops.length;i++)
		{
			if(drops[i]!=null)
			{
				var item = drops[i];
				var n4Dis = parseInt( this.getPixelDistance(pPos, item.getPosition()) );
				if(n4Dis<70)
				{
					item.putInven();
					return true;
				//else
				//	alert(n4Dis);
					//
				}
			}
		}
		
		return false;
	}
	/*
	if(playUnit.isMyUnit)
	{
		this.onPlay.add
		(
			function()
			{
				thisSkill.getDropItem();
			}
		)
	}
	*/
}
nxUnitSkill.prototype = new nxUnitSkill();
nxUnitSkill.prototype.constructor = nxUnitSkill;

function nxSkillNone(playUnit)
{
	nxUnitSkill.apply(this, arguments);
	this.n4SkillCoolTime		= 0;
	this.n4SkillCoolTimeGlobal	= 0;
	this.strTooltip = "비어있는 슬롯";
	this.play=function(){return true;}
	this.getSkillIcon=function(){return null;}
}
nxSkillNone.prototype = new nxUnitSkill();
nxSkillNone.prototype.constructor = nxSkillNone;

function nxSkillDashAttack(playUnit)
{
	nxUnitSkill.apply(this, arguments);
	this.n4SkillDamage=10;
	this.n4SkillCoolTime		= 5000;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4NeedHP = 0;
	this.n4NeedMP = 10;
		
	this.move=function()
	{
		this.playUnit.slip(true,200,50);
	}
	this.getDamage=function(){return (this.playUnit.getPower()+this.n4SkillDamage)*this.getCritical();}
	this.getSkillIcon=function(){return "/img/rpg/spell/Ability_warrior_unrelentingassault.png";}
	this.strTooltip = "<b>단공참</b><br>앞으로 빠르게 몸을 날려 적을 공격합니다..";
}
nxSkillDashAttack.prototype = new nxUnitSkill();
nxSkillDashAttack.prototype.constructor = nxSkillDashAttack;


var n4BoltIndex		= 0;
function nxSpellEnergyBolt(playUnit)
{
	nxUnitSkill.apply(this, arguments);
	this.n4SkillDamage = 5;
	this.n4SkillCoolTime		= 1500;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4NeedHP = 0;
	this.n4NeedMP = 20;
	this.n1SkillType= 1;
		
	this.move=function(){return null;}
	this.geteffectSound=function()
	{
		return "magicEnergyBolt.mp3";
	}
	this.n4ThrowDistance	= 400;
	this.n4Sight			= 400;
	
	this.doSpell=function()
	{
		n4BoltIndex++
		this.bolt = this.getBoltObject();
		var rectBoltFly = this.getBoltRect();
		this.bolt.fire(rectBoltFly);
	}
	this.giveDamage=function(){}//근접물리공격이 아니므로 이부분은 무시
	this.getDamage=function(){return (this.playUnit.getSpellPower()+this.n4SkillDamage)*this.getCritical();}
	this.getCritical=function()
	{
		return this.playUnit.n4SpellCritical>=this.getRand()?2:1;
	}
	this.getBoltObject=function()
	{
		var bolt = new nxBoltEnergy(this.playUnit.id + '_bolt_' + n4BoltIndex, this.playUnit);
		var SpellEnergyBolt = this;
		bolt.onHitTarget.add
		(
			function(nxBolt, args)//nxBolt, unit
			{
				var damagedUnit = args[0];
				damagedUnit.receiveDamage(SpellEnergyBolt.getDamage(), SpellEnergyBolt.playUnit,SpellEnergyBolt);
				damagedUnit.doLater("doWound()", 100);
				if(damagedUnit.n4HP<=0)
					damagedUnit.doLater("doDie()", 500);
				nxBolt.unload();
			}
		)
		
		return bolt;
	}
	this.getBoltRect=function()
	{
		if( this.playUnit.n1MotionDirection	== nxUnitMotion.DirectionBase )
		{
			rectBoltFly = new nxRectangle(
											this.playUnit.getPosition().x+40
											, this.playUnit.getPosition().y-70
											, this.n4ThrowDistance
											, 50
											)
		}
		else
		{
			rectBoltFly = new nxRectangle(
											this.playUnit.getPosition().x-this.n4ThrowDistance-40
											, this.playUnit.getPosition().y-70
											, this.n4ThrowDistance
											, 50
											)
		}
		return rectBoltFly;
	}
	
	this.getSkillIcon=function(){return "/img/rpg/spell/Spell_arcane_arcane04.png";}
	this.strTooltip = "<b>탄지신공</b><br>작은 에너지섬광을 날려 적을 공격합니다.";
}
nxSpellEnergyBolt.prototype = new nxUnitSkill();
nxSpellEnergyBolt.prototype.constructor = nxSpellEnergyBolt;


function nxSpellDagger(playUnit)
{
	nxSpellEnergyBolt.apply(this, arguments);
	this.n4SkillCoolTime		= 1500;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4NeedHP = 0;
	this.n4NeedMP = 5;
	this.n1SkillType			= 0;
		
	this.move=function(){return null;}
	this.geteffectSound=function()
	{
		return "throwDagger1.mp3";
	}
	this.getDamage=function(){return (this.playUnit.getPower()+this.n4SkillDamage)*this.getCritical();}
	this.getBoltObject=function()
	{
		var bolt = new nxBolt(this.playUnit.id + '_bolt_' + n4BoltIndex, this.playUnit);
		var nxSpellDagger = this;
		bolt.onHitTarget.add
		(
			function(nxBolt, args)//nxBolt, unit
			{
				var damagedUnit = args[0];
				if(!nxSpellDagger.isAvoid(damagedUnit))
				{
					damagedUnit.receiveDamage(nxSpellDagger.getDamage(), nxSpellDagger.playUnit, nxSpellDagger);
					damagedUnit.doLater("doWound()", 100);
					if(damagedUnit.n4HP<=0)
						damagedUnit.doLater("doDie()", 500);
					
				}
				nxBolt.unload();
			}
		)
		
		return bolt;
	}
	this.getSkillIcon=function(){return "/img/rpg/spell/Ability_rogue_fanofknives.png";}
	this.strTooltip = "<b>투척</b><br>단검을 던져 적을 공격합니다.";
}
nxSpellDagger.prototype = new nxUnitSkill();
nxSpellDagger.prototype.constructor = nxSpellDagger;


function nxSpellLightning(playUnit)
{
	nxSpellEnergyBolt.apply(this, arguments);
	this.n4KnockBack	= 100;
	this.n4SkillDamage	= 50;
	this.n4SkillCoolTime		= 6000;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4NeedHP = 0;
	this.n4NeedMP = 50;
		
	this.getBoltRect=function(){return null;}
	this.play=function()
	{
		if(this.isEnoughResource())
		{
			this.playEffectSound();
			this.playUnit.setMotion(nxUnitMotion.NormalAttack);
			this.useResource();
			this.doSpell();
			this.move();		
			this.giveDamage();
			return true;
		}
		else
			return false;
	}
	this.doSpell=function()
	{
		n4BoltIndex++
		this.bolt = this.getBoltObject();
		var rectBoltFly = this.getBoltRect();
		this.bolt.fire(rectBoltFly);
	}
	this.getDamage=function(){return (this.playUnit.getSpellPower()+this.n4SkillDamage)*this.getCritical();}
	this.getCritical=function()
	{
		return this.playUnit.n4SpellCritical>=this.getRand()?2:1;
	}
	this.geteffectSound=function()
	{
		return "lightning.mp3";
	}
	this.getBoltObject=function()
	{
		var spell = new nxDropSpell(this.playUnit.id + '_bolt_' + n4BoltIndex, this.playUnit);
		var SpellLightning = this;
		spell.onHitTarget.add
		(
			function(DropSpell, args)//nxDropSpell, unit
			{
				var damagedUnit = args[0];
				damagedUnit.receiveDamage(SpellLightning.getDamage(), SpellLightning.playUnit, SpellLightning);
				damagedUnit.doLater("doWound()", 100);
				if(damagedUnit.n4HP<=0)
					damagedUnit.doLater("doDie()", 500);
				else
					damagedUnit.slip(false,SpellLightning.n4KnockBack,50);
				
			}
		)
		
		return spell;
	}
	this.getSkillIcon=function(){return "/img/rpg/spell/Spell_shaman_thunderstorm.png";}
	this.strTooltip = "<b>낙뢰</b><br>근거리에 강력한 번개를 소환하여 다수의 적을 공격합니다. 공격받은 대상은 뒤로 밀려납니다.";
}
nxSpellLightning.prototype = new nxUnitSkill();
nxSpellLightning.prototype.constructor = nxSpellLightning;



function nxSpellCallLightning(playUnit)
{
	nxSpellEnergyBolt.apply(this, arguments);
	this.n4KnockBack	= 100;
	this.n4SkillDamage	= 50;
	this.n4SkillCoolTime		= 3000;
	this.n4SkillCoolTimeGlobal	= 1000;
	this.n4NeedHP = 0;
	this.n4NeedMP = 50;
	
	this.getBoltRect=function(){return null;}
	this.play=function()
	{
		if(this.isEnoughResource())
		{
			this.playEffectSound();
			this.playUnit.setMotion(nxUnitMotion.NormalAttack);
			this.useResource();
			this.doSpell();
			this.move();		
			this.giveDamage();
			return true;
		}
		else
			return false;
	}
	this.doSpell=function()
	{
		n4BoltIndex++
		this.bolt = this.getBoltObject();
		var rectBoltFly = this.getBoltRect();
		this.bolt.fire(rectBoltFly);
	}
	this.getDamage=function(){return (this.playUnit.getSpellPower()+this.n4SkillDamage)*this.getCritical();}
	this.getCritical=function()
	{
		return this.playUnit.n4SpellCritical>=this.getRand()?2:1;
	}
	this.geteffectSound=function()
	{
		return "lightning.mp3";
	}
	this.getBoltObject=function()
	{
		var spell = new nxCallLightneingSpell(this.playUnit.id + '_bolt_' + n4BoltIndex, this.playUnit);
		var SpellLightning = this;
		spell.onHitTarget.add
		(
			function(DropSpell, args)//nxCallLightneingSpell, unit
			{
				var damagedUnit = args[0];
				damagedUnit.receiveDamage(SpellLightning.getDamage(), SpellLightning.playUnit,SpellLightning);
				damagedUnit.doLater("doWound()", 100);
				if(damagedUnit.n4HP<=0)
					damagedUnit.doLater("doDie()", 500);
			}
		)
		
		return spell;
	}
	this.getSkillIcon=function(){return "/img/rpg/spell/Spell_lightning_lightningbolt01.png";}
	this.strTooltip = "<b>천벌</b><br>가장 가까운 적에게 번개를 소환하여 공격합니다.";
}
nxSpellCallLightning.prototype = new nxUnitSkill();
nxSpellCallLightning.prototype.constructor = nxSpellCallLightning;


function nxSkillBackStep(playUnit)
{
	nxUnitSkill.apply(this, arguments);
	this.n4SkillCoolTime		= 500;
	this.n4SkillCoolTimeGlobal	= 500;
		
	this.move=function()
	{
		this.playUnit.slip(false,50,50);
	}
	this.getDamage=function(){return 0;}
	this.play=function()
	{
		this.playUnit.setMotion(nxUnitMotion.Jump);
		this.move();
		return true;		
	}
	this.move=function()
	{
		this.playUnit.slip(false,100,50);
	}
	this.getSkillIcon=function(){return "/img/rpg/spell/Ability_hunter_displacement.png";}
	this.strTooltip = "<b>회피</b><br>재빨리 뒤로 점프하여 적과의 거리를 유지합니다.";
}
nxSkillBackStep.prototype = new nxUnitSkill();
nxSkillBackStep.prototype.constructor = nxSkillBackStep;

