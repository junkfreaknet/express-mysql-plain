
const express=require('express');
const app=express();
const port=3000;

const mysql=require('mysql2/promise');

(async()=>{
const cnnctn=  mysql.createConnection({
  host:'public.nhumf.tyo2.database-hosting.conoha.io',
  user:'nhumf_sion',
  password:'Noriyuki6403',
  database:'nhumf_sion'
});
try{
  console.log('connected!');
  strSQL='select distinct syu_ymd from select_locale_child_202212011001_cp_csv';
  await (await cnnctn).execute(strSQL);
  //console.log('*****'+rows[0]);
}
catch(e){
  console.log(e);
  console.log('*****');
}
finally{}
})();

//
app.get('/',(req,res)=>res.send('Hello world.'));
app.listen(port,()=>console.log('Example app listening on port '+ port+' !'));
