CREATE PROCEDURE [dbo].[proc_InventoryInput]
	@frk_n4ErrorCode	int				=NULL	OUTPUT,
	@frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	@frk_isRequiresNewTransaction		tinyint	= 1,	

	@user_sn		bigint,
	@character_sn	bigint,

	@item_index		int		output,
	@item_level		tinyint output,
	@item_type		tinyint=0 output,
	@addon_index	int		=0 output, 
	@max_count		int, 
	@input_count	int output,

	@isNeedVerify	bit = 1,
	
	
	@item_uid		bigint = 0 output,	
	@count			int = 0 output,
	@is_over_count	bit = 0 output,
	@is_over_inven  bit = 0 output,
	@ap_remaining			int	= null OUTPUT,
	@ap_seconds_remaining	int = null OUTPUT,
	@remain_gold			int = null OUTPUT, 	
	@inven_max			int = 30		output, 
	@inven_current		int = null		output 
AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/

	IF @isNeedVerify=1 AND dbo.fn_IsExistsCharacter(@user_sn, @character_sn)=0 -- 상위 프로시저에서 검증을 했다면 패스한다.
	BEGIN
		SET	@frk_n4ErrorCode = 102;
		SET	@frk_strErrorText = 'NOT_EXIST_CHARACTER'
		goto lblFail 
	END

	SET @count = @input_count;

	IF @item_type=100 -- GEM
	BEGIN
		SET	@frk_n4ErrorCode = 1001;
		SET	@frk_strErrorText = 'WRONG_TYPE'
		goto lblFail 
	END
	ELSE IF @item_type=99 -- 골드
	BEGIN
		UPDATE dbo.HL_CharacterInfo SET gold=gold+@input_count,@remain_gold=gold WHERE user_sn=@user_sn AND character_sn=@character_sn
		SET @count = @remain_gold
	END
	ELSE IF @item_type=98 -- AP
	BEGIN
		EXECUTE [dbo].[proc_UpdateAp] 
		 @frk_n4ErrorCode		= @frk_n4ErrorCode OUTPUT
		,@frk_strErrorText			= @frk_strErrorText OUTPUT
		,@frk_isRequiresNewTransaction=0
		,@user_sn				= @user_sn
		,@character_sn			= @character_sn 
		,@ap_add				= @input_count
		,@ap_remaining			= @ap_remaining			OUTPUT
		,@ap_seconds_remaining	= @ap_seconds_remaining	OUTPUT
		IF @frk_n4ErrorCode<>0 GOTO lblFail
		SET @count = @ap_remaining
	END
	ELSE IF @max_count > 1
		BEGIN
			IF EXISTS (SELECT TOP 1 '*' FROM HL_Inventory with(nolock, index(IX_HL_Inventory_charactersn_item_index_itemlevel_count)) WHERE character_sn=@character_sn AND item_index=@item_index AND item_level=@item_level) --AND [count] < @max_count )
				BEGIN
					DECLARE @inven_sn bigint;
					DECLARE @have_count int;
					DECLARE @total_count int;
					SELECT TOP 1 @inven_sn = sn , @have_count = [count] FROM HL_Inventory with(nolock, index(IX_HL_Inventory_charactersn_item_index_itemlevel_count))  WHERE @character_sn = character_sn AND @item_index = item_index AND item_level=@item_level        -- AND [count] < @max_count

					IF @max_count < @have_count + @input_count
					BEGIN
						SET @total_count = @max_count
						SET @is_over_count = 1
					END
					ELSE 
						SET @total_count = @have_count + @input_count

					UPDATE HL_Inventory SET [count] = @total_count WHERE @character_sn = character_sn AND @inven_sn = sn

					SET @item_uid = @inven_sn;
					SET @count = @total_count;
				END
			ELSE
				BEGIN
					EXEC [dbo].[proc_CreateSeq]	@frk_n4ErrorCode = @frk_n4ErrorCode OUTPUT,	@frk_strErrorText = @frk_strErrorText OUTPUT
					, @user_sn = @user_sn
					, @code_seq_field = 2
					, @sn = @item_uid OUTPUT
					INSERT INTO HL_Inventory
					(
					sn,
					user_sn,
					character_sn, 
					item_index, 
					item_level,
					item_type,
					addon_index,
					[count], 
					reg_date) 
					VALUES
					(
					@item_uid,
					@user_sn,
					@character_sn,
					@item_index,
					@item_level,
					@item_type,
					@addon_index,
					@input_count,
					getdate());
					
					
				END
		END
	ELSE
		BEGIN
			--SET @item_uid = [dbo].fn_GenerateItemSn(@user_sn) --SCOPE_IDENTITY();
			EXEC [dbo].[proc_CreateSeq]	@frk_n4ErrorCode = @frk_n4ErrorCode OUTPUT,	@frk_strErrorText = @frk_strErrorText OUTPUT
			, @user_sn = @user_sn
			, @code_seq_field = 2
			, @sn = @item_uid OUTPUT
			INSERT INTO HL_Inventory
			(sn,
			user_sn,
			character_sn, 
			item_index, 
			item_level,
			item_type,
			[count], 
			reg_date) 
			VALUES
			(@item_uid,
			@user_sn,
			@character_sn,
			@item_index,
			@item_level,
			@item_type,
			@input_count,
			getdate());
					
			
		END

	 
	SELECT @inven_current=sum(case when [dbo].fn_IsUnRealItem(item_type)=1 then 0 else 1 end ) FROM HL_Inventory with(nolock, index(IX_HL_Inventory_charactersn)) WHERE character_sn = @character_sn

	IF([dbo].fn_IsUnRealItem(@item_type)=0 AND @inven_current > @inven_max)
	BEGIN
		SET @is_over_inven =1
		SET @frk_n4ErrorCode = 203003;		-- FULL_INVENTORY
		SET	@frk_strErrorText = 'FULL_INVENTORY'
		goto lblFail
	END

	IF @remain_gold IS NULL
	BEGIN
		SELECT @remain_gold=gold FROM dbo.HL_CharacterInfo with(nolock) WHERE user_sn=@user_sn AND character_sn=@character_sn
	END
	IF @ap_remaining IS NULL
	BEGIN
		EXECUTE [dbo].[proc_UpdateAp] 
		 @frk_n4ErrorCode			= @frk_n4ErrorCode OUTPUT
		,@frk_strErrorText			= @frk_strErrorText OUTPUT
		,@frk_isRequiresNewTransaction=0
		,@user_sn				= @user_sn
		,@character_sn			= @character_sn 
		,@ap_add				= 0
		,@ap_remaining			= @ap_remaining			OUTPUT
		,@ap_seconds_remaining	= @ap_seconds_remaining	OUTPUT
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
