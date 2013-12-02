
-- ====================================================================
-- Author:	<    >
-- Create date: < 2013.07.9 >
-- Description:	<     >
-- ====================================================================
CREATE PROCEDURE [dbo].[proc_AddFriend]
	 @frk_n4ErrorCode	int				=NULL	OUTPUT,
	 @frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	 @frk_isRequiresNewTransaction		tinyint	= 1,	

	 @user_sn_my				bigint
    ,@sns_sn_my					bigint
	,@sns_name_my				nvarchar(40) = ''
    ,@character_sn_my			bigint
	,@character_nick_my			nvarchar(40)
    ,@character_level_my		tinyint
	,@last_update_my			datetime

    ,@user_sn_friend			bigint
    ,@sns_sn_friend				bigint
	,@sns_name_friend			nvarchar(40) = ''
    ,@character_sn_friend		bigint
    ,@character_nick_friend		nvarchar(40)
    ,@character_level_friend	tinyint
	,@last_update_friend		datetime

    ,@sns_type					tinyint

	,@friend_max_limit			int = 50 OUTPUT
AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/

IF @friend_max_limit< (SELECT COUNT(*) FROM [dbo].[HL_Friends] with(nolock) WHERE [user_sn_my]=@user_sn_my AND [character_sn_my]=@character_sn_my)
BEGIN
	SET	@frk_n4ErrorCode = 209005;
	SET	@frk_strErrorText = 'OVER_FRIEND_MAX_LIMIT'
	goto lblFail 
END


IF EXISTS (SELECT TOP 1 '*' FROM [dbo].[HL_Friends] with(nolock) WHERE [user_sn_my]=@user_sn_my AND [character_sn_my]=@character_sn_my AND [user_sn_friend]=@user_sn_friend AND [character_sn_friend]=@character_sn_friend)
BEGIN
	SET	@frk_n4ErrorCode = 209002;
	SET	@frk_strErrorText = 'EXIST_FRIEND'
	goto lblFail 
END

IF EXISTS (SELECT TOP 1 '*' FROM [dbo].[HL_Friends] with(nolock) WHERE [user_sn_my]=@user_sn_friend AND [character_sn_my]=@character_sn_friend AND [user_sn_friend]=@user_sn_my AND [character_sn_friend]=@character_sn_my)
BEGIN
	SET	@frk_n4ErrorCode = 209002;
	SET	@frk_strErrorText = 'EXIST_FRIEND'
	goto lblFail 
END



INSERT INTO [dbo].[HL_Friends]
           ([user_sn_my]
           ,[sns_sn_my]
		   ,[sns_name_my]
           ,[character_sn_my]
           ,[user_sn_friend]
           ,[sns_sn_friend]
		   ,[sns_name_friend]
           ,[character_sn_friend]
           ,[character_nick_friend]
           ,[character_level_friend]
           ,[last_update_friend]
           ,[sns_type]
           ,[dateCreate])
     VALUES
           (@user_sn_my
           ,@sns_sn_my
		   ,@sns_name_my
           ,@character_sn_my
           ,@user_sn_friend
           ,@sns_sn_friend
		   ,@sns_name_friend
           ,@character_sn_friend
           ,@character_nick_friend
           ,@character_level_friend
           ,GETDATE()
           ,@sns_type
           ,GETDATE())

INSERT INTO [dbo].[HL_Friends]
           ([user_sn_my]
           ,[sns_sn_my]
		   ,[sns_name_my]
           ,[character_sn_my]
           ,[user_sn_friend]
           ,[sns_sn_friend]
		   ,[sns_name_friend] 
           ,[character_sn_friend]
           ,[character_nick_friend]
           ,[character_level_friend]
           ,[last_update_friend]
           ,[sns_type]
           ,[dateCreate])
     VALUES
           (@user_sn_friend
           ,@sns_sn_friend
		   ,@sns_name_friend
           ,@character_sn_friend
           ,@user_sn_my
           ,@sns_sn_my
		   ,@sns_name_my
           ,@character_sn_my
           ,@character_nick_my
           ,@character_level_my
           ,GETDATE()
           ,@sns_type
           ,GETDATE())


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