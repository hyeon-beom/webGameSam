using System;
using System.Text;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Collections;
using System.Collections.Generic;

using System.Linq;
using System.Reflection;


namespace Com.Actoz.Data
{
    /// <summary>
    /// AtzDataSet의 요약 설명입니다.
    /// </summary>
    public class AtzDataSet :  System.Data.DataSet
    {
        public AtzDataSet()
        {
            
        }

        public string this[string strFieldName]
        {
            get
            {
                return this.Tables[0].Rows[0][strFieldName].ToString();
            }
        }

        public string this[int n4TableIndex, string strFieldName]
        {
            get
            {
                return this.Tables[n4TableIndex].Rows[0][strFieldName].ToString();
            }
        }

        public string this[string strTableName, string strFieldName]
        {
            get
            {
                return this.Tables[strTableName].Rows[0][strFieldName].ToString();
            }
        }

        public List<TResult> ToList<TResult>()
        {
            return this.ToList<TResult>(0);
        }

        public List<TResult> ToList<TResult>(int n4TableIndex)
        {
            var ret = new List<TResult>();
            if (this.Tables.Count > n4TableIndex)
            {
                foreach (DataRow row in this.Tables[n4TableIndex].Rows)
                {
                    TResult struct_class = Activator.CreateInstance<TResult>();
                    Type type = struct_class.GetType();
                    List<DataColumn> cols = this.Tables[n4TableIndex].Columns.Cast<DataColumn>().ToList();
                    cols.ForEach(delegate(DataColumn col)
                    {
                        FieldInfo field = type.GetField(col.ColumnName);
                        if (field != null)
                        {
                            object temp = field.GetValue(struct_class);
                            field.SetValue(struct_class, Convert.ChangeType(row[col], field.FieldType));
                        }
                    });

                    ret.Add(struct_class);
                }

            }

            return ret;
        }

        public List<DataRow> ToList(int n4TableIndex)
        {
            var ret = new List<DataRow>();
            foreach (DataRow dr in this.Tables[n4TableIndex].Rows)
                ret.Add(dr);
            return ret;
        }

        public DataRow OUTPUT
        {
            get
            {
                return this.Tables["OUTPUT"].Rows[0];
            }
        }

        public int frk_n4ErrorCode{get{return Convert.ToInt32(OUTPUT["frk_n4ErrorCode"]);}}
        public string frk_strErrorText { get { return OUTPUT["frk_strErrorText"].ToString(); } }

        public string ToJason(DataSet ds)
        {
            StringBuilder sb = new StringBuilder();
            foreach (DataTable dt in ds.Tables)
            {
                if (sb.ToString() == string.Empty)
                    sb.Append("{");
                else
                    sb.Append(",");

                sb.Append("[");//테이블
                int i=0;
                foreach (DataRow row in dt.Rows)
                {
                    if(i>0)
                        sb.Append(",");
                    sb.Append("[");
                    int j = 0;
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (j > 0)
                            sb.Append(",");
                        sb.Append(string.Format("{{ {0}:'{1}' }}", col.ColumnName, row[col.ColumnName].ToString()));
                        j++;
                    }
                    sb.Append("]");
                    i++;
                }
                sb.Append("]");
            }
            sb.Append("}");
            return sb.ToString();
        }
        public string ToJason()
        {
            return this.ToJason(this);
        }
    }
}
