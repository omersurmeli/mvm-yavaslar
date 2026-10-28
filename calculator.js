'use strict';
(function(root){
  // DYO Tavan publishes coverage for two coats. Other values are per coat.
  function calculatePaint({area,coats,coverage,baseCoats=1,waste,pack,price=null}){
    if(![area,coats,coverage,baseCoats,pack].every(v=>Number.isFinite(v)&&v>0)||!Number.isFinite(waste)||waste<0||waste>100)return null;
    if(price!==null&&(!Number.isFinite(price)||price<0))return null;
    const needed=area*coats/baseCoats*(1+waste/100)/coverage;
    const ratio=needed/pack;
    const buckets=Math.ceil(ratio-Number.EPSILON*Math.max(1,ratio)*4);
    const purchased=buckets*pack;
    return{needed,buckets,purchased,leftover:Math.max(0,purchased-needed),total:price===null?null:buckets*price};
  }
  const api={calculate:calculatePaint};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.MVM_CALCULATOR=api;
})(typeof window!=='undefined'?window:this);
