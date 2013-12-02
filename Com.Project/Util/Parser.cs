using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Text;

namespace Com.Actoz.Util
{
    public static class Parser
    {
        public static T ParseMe<T>(this Object target, T def)//(this T target)
        {
            if(target==null || Convert.IsDBNull(target))
                return def;
            else
            {
                return  (T)Convert.ChangeType(target, def.GetType());
                
            }
        }
    }
}
