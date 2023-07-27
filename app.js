
const express=require('express');
const app=express();
const port=3000;

const mysql=require('mysql2/promise');

var cnnctn;
var strResult;
//
function displayResult(recieve_rows,FLGbrowser){
  
  var strBuffResult="";
  for(var i=0;i<recieve_rows.length;i++ ){
    a_row=recieve_rows[i];
    //console.log((i+1)+'*****'+a_row.syu_ymd+','+a_row.bin_kb+','+a_row.haibun_mad+','+a_row.ad_ten_no+','+a_row.haiso_course+','+a_row.haiso_order+','+a_row.ten_no+','+a_row.ten_nm_kanji);
    //console.log((i+1)+'*****'+a_row.syu_ymd+','+a_row.bin_kb+','+a_row.haibun_mad);
    strBuffResult='<br>'+(i+1)+'*****'+a_row.syu_ymd+','+a_row.bin_kb+','+a_row.haibun_mad+','+a_row.ad_ten_no+','+a_row.haiso_course+','+a_row.haiso_order+','+a_row.ten_no+','+a_row.ten_nm_kanji;
    //strBuffResult='<br>'+(i+1)+'*****'+a_row.syu_ymd+','+a_row.bin_kb+','+a_row.haibun_mad;
    console.log(strBuffResult);
    strResult=strResult+strBuffResult;
    /**if(FLGbrowser){
        app.get('/',(request,response)=>{
          //response.send(strResult);
          request.send(strResult);
        })
  
        console.log('again '+strResult);
    }else{
      console.log('no record');
    }**/
    
}
console.log('exit loop  :'+strBuffResult);
console.log('count  :'+recieve_rows.length);
}
//
(async()=>{
  cnnctn=await mysql.createConnection({
  host:'public.nhumf.tyo2.database-hosting.conoha.io',
  user:'nhumf_sion',
  password:'Noriyuki6403',
  database:'nhumf_sion'
})
try{
  console.log('connected!');
  //const strSQL='select distinct syu_ymd,bin_kb,haibun_mad from select_locale_child_202212011001_cp_csv order by syu_ymd,bin_kb,haibun_mad';
  const strSQL='select syu_ymd,bin_kb,haibun_mad,ad_ten_no,haiso_course,haiso_order,ten_no,ten_nm_kanji from select_locale_child_202212011001_cp_csv order by syu_ymd,bin_kb,haibun_mad,ad_ten_no,haiso_course,haiso_order';

  const [rows,fields]=await cnnctn.execute(strSQL);
  strResult="";
  displayResult(rows,true);
}
catch(e){
  console.log('*****+++++*****');
  console.log(e);
  console.log('*****');
}
finally{}
})();

//
console.log(strResult)
app.get('/',(req,res)=>res.send('Hello world.'+strResult));
app.listen(port,()=>console.log('Example app listening on port '+ port+' !'));
