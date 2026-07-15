import { supabase } from "@/lib/supabase/client";
export async function POST(req:Request){


const {id}=await req.json();


const {data,error}=await supabase
.from("conversations")
.insert({

id,

title:"新聊天"

})
.select();


console.log(
"创建结果:",
data,
error
);


return Response.json({

success:true

});


}