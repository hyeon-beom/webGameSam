using System;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;


using Com.Actoz.Data;

namespace Com.Actoz.DAO
{
    /// <summary>
    /// SPWrapperBase의 요약 설명입니다.
    /// </summary>
    public abstract class SPWrapperBase : Object, IDisposable
    {

        public SqlCommand m_cmd = null;
        public SPWrapperBase()
        {
            this.InitParam();
        }
        public SPWrapperBase(string strSPName)
        {
            this._strSPName = strSPName;
            this.InitParam();
        }

        private string _strSPName = string.Empty;
        protected virtual string strSPName
        {
            get { return this._strSPName; }
        }

        protected virtual object this[string strParamName]
        {
            set
            {
                if (!this.m_cmd.Parameters.Contains(strParamName))
                    throw new Exception(strParamName + " 파라미터는 존재하지 않는 파라미터입니다.");
                else if (value is DataTable)
                {
                    SqlParameter tvpParam = this.m_cmd.Parameters.AddWithValue(
                        strParamName, value);
                    tvpParam.SqlDbType = SqlDbType.Structured;
                }
                else
                    this.m_cmd.Parameters[strParamName].Value = value;
            }
        }

        protected abstract AtzConnectionProvider cnp
        {
            get;
        }

        protected virtual bool isUseFrameworkSP
        {
            get { return true; }
        }

        private AtzDataSet _dsResult = null;
        public AtzDataSet dsResult { get { return _dsResult; } }
        public virtual TResult execute<TResult>()
        {
            TResult struct_class = Activator.CreateInstance<TResult>();
            _dsResult = this.execute();
            DataTable dt = _dsResult.Tables["OUTPUT"];
            DataRow output = dt.Rows[0];

            List<DataColumn> cols = dt.Columns.Cast<DataColumn>().ToList();
            Type type = struct_class.GetType(); 
            cols.ForEach(delegate(DataColumn col) 
            {
                FieldInfo field = type.GetField(col.ColumnName);
                if (field != null && !Convert.IsDBNull(output[col]))
                {
                    object temp = field.GetValue(struct_class);
                    field.SetValue(struct_class, Convert.ChangeType(output[col], field.FieldType));
                }
            });

            return struct_class;
        }

        public virtual AtzDataSet execute()
        {
            SqlConnection cn = this.cnp.GetConnection();
            try
            {
                this.m_cmd.Connection = cn;
                this.m_cmd.CommandTimeout = 5;
                cn.Open();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = this.m_cmd;
                AtzDataSet ds = new AtzDataSet();
                da.Fill(ds);
                da = null;

                #region OUTPUT 파리미터 값 셋팅
                DataTable outputTable = new DataTable("OUTPUT");
                foreach (SqlParameter param in m_cmd.Parameters)
                {
                    if (param.Direction == ParameterDirection.Output || param.Direction == ParameterDirection.InputOutput || param.Direction == ParameterDirection.ReturnValue)
                    {
                        outputTable.Columns.Add(param.ParameterName.Replace("@", string.Empty));
                    }
                }
                if (outputTable.Columns.Count > 0)
                {
                    Object[] row = new object[outputTable.Columns.Count];
                    int i = 0;
                    foreach (SqlParameter param in m_cmd.Parameters)
                    {
                        if (param.Direction == ParameterDirection.Output || param.Direction == ParameterDirection.InputOutput || param.Direction == ParameterDirection.ReturnValue)
                        {
                            row[i] = param.Value;
                            i++;
                        }
                    }
                    outputTable.Rows.Add(row);
                    ds.Tables.Add(outputTable);
                }
                #endregion

                if (this.isUseFrameworkSP)
                {
                    int n4ErrorCode = 0;
                    string strErrorText = string.Empty;
                    try
                    {
                        SqlParameter param_n4ErrorCode = m_cmd.Parameters["@frk_n4ErrorCode"];
                        SqlParameter param_strErrorText = m_cmd.Parameters["@frk_strErrorText"];
                        n4ErrorCode = (int)(param_n4ErrorCode.Value);
                        strErrorText = (string)(param_strErrorText.Value);
                    }
                    catch { }

                    if (n4ErrorCode < 0)
                    {
                        throw new Exception(strErrorText);
                    }
                }


                cn.Close();

                _dsResult = ds;
                return ds;
            }
            catch (Exception e)
            {
                if (paramCaches[this.strSPName] != null)
                    paramCaches.Remove(this.strSPName);
                cn.Close();
                throw e;
            }
            finally
            {
                cn = null;
            }

        }

        public virtual int executeNoneQuery()
        {
            SqlConnection cn = this.cnp.GetConnection();
            int ret = 0;
            try
            {
                this.m_cmd.Connection = cn;
                this.m_cmd.CommandTimeout = 5;
                cn.Open();
                ret =  this.m_cmd.ExecuteNonQuery();
                cn.Close();
            }
            catch (Exception e)
            {
                if (paramCaches[this.strSPName] != null)
                    paramCaches.Remove(this.strSPName);
                cn.Close();
                throw e;
            }
            finally
            {
                cn = null;
            }
            return ret;
        }

        private static Hashtable paramCaches = new Hashtable();

        private void InitParam()
        {
            this.m_cmd = new SqlCommand();
            this.m_cmd.CommandType = System.Data.CommandType.StoredProcedure;
            this.m_cmd.CommandText = strSPName;

            if (paramCaches[this.strSPName] != null)
            {
                ArrayList paramObjs = (ArrayList)paramCaches[this.strSPName];

                foreach (SqlParameter param in paramObjs)
                {
                    SqlParameter newParam = new SqlParameter(param.ParameterName, param.SqlDbType);
                    newParam.Size = param.Size;
                    newParam.Direction = param.Direction;
                    this.m_cmd.Parameters.Add(newParam);
                }

            }
            else
            {
                SqlConnection cn = this.cnp.GetConnection();
                try
                {
                    this.m_cmd.Connection = cn;
                    this.m_cmd.Connection.Open();
                    SqlCommandBuilder.DeriveParameters(m_cmd);

                    ArrayList paramObjs = new ArrayList();
                    foreach (SqlParameter param in this.m_cmd.Parameters)
                    {
                        paramObjs.Add(param);
                    }
                    paramCaches[this.strSPName] = paramObjs;
                }
                catch (Exception e) { throw e; }
                finally
                {
                    cn.Close();
                }
            }
        }

        public void Dispose()
        {
            if(this.m_cmd.Connection.State==ConnectionState.Open)
                this.m_cmd.Connection.Close();
            this.m_cmd = null;
            this._dsResult = null;
        }
    }
}
