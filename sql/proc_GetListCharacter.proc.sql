
CREATE PROCEDURE [dbo].[proc_GetListCharacter]
	 @frk_n4ErrorCode	int				=NULL	OUTPUT,
	 @frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	 @frk_isRequiresNewTransaction		tinyint	= 1,	

	 @nickname_search	nvarchar(40)
AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/

	IF  @nickname_search<>''
	BEGIN
		SELECT TOP 100 
			[character_sn]
		  ,[user_sn]
		  ,sns_sn 
		  ,[nickname]
		  ,[exp]
		  /*
		  ,[gold]
		  ,[weapon_type]
		  ,[weapon]
		  ,[armor]
		  ,[necklace]
		  ,[ring]
		  ,[amulet]
		  ,[pet]
		  ,[skills]
		  ,[ap]
		  ,[ap_update_time]
		  */
		  ,[last_login_date]
		  ,[reg_date]
		  ,[use]
	  FROM [dbo].[HL_CharacterInfo] with(nolock,index(IX_HL_CharacterInfo_nickname_use))
	  WHERE nickname like @nickname_search + '%' AND [USE]=0 order by nickname
	END
	ELSE
	BEGIN
		SELECT TOP 100 
			[character_sn]
		  ,[user_sn]
		  ,sns_sn 
		  ,[nickname]
		  ,[exp]
		  /*
		  ,[gold]
		  ,[weapon_type]
		  ,[weapon]
		  ,[armor]
		  ,[necklace]
		  ,[ring]
		  ,[amulet]
		  ,[pet]
		  ,[skills]
		  ,[ap]
		  ,[ap_update_time]
		  */
		  ,[last_login_date]
		  ,[reg_date]
		  ,[use]
	  FROM [dbo].[HL_CharacterInfo] with(nolock,index(IX_HL_CharacterInfo_isuse)) WHERE  [USE]=0 order by NEWID()
	END

/*********************************************************************/
END TRY
BEGIN CATCH
	SET		@frk_n4ErrorCode = -1 --error_number()
	SET		@frk_strErrorText = error_message()
	goto lblFail
END CATCH
if @frk_n4ErrorCode<>0 or @@ERROR<>0 goto lblFail
lblSuccess:
	if @frk_isRequiresNewTransaction=1 commit tran
	SET		rowcount 0
	SET		@frk_n4ErrorCode = 0
	SET		@frk_strErrorText = ''
	RETURN	0
lblFail:
	if @frk_isRequiresNewTransaction=1 rollback tran
	SET		rowcount 0
	SET		@frk_n4ErrorCode = @frk_n4ErrorCode
	SET		@frk_strErrorText = convert( varchar(11), @frk_n4ErrorCode ) + ' : ' + @frk_strErrorText
	RETURN	@frk_n4ErrorCode
/*********************************************************************/
END