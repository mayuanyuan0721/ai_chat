import { supabase } from "@/lib/supabase/client";
import { error } from "console";


export async function DELETE(req:Request) {
    const {searchParams}=new URL(req.url);
    const id=searchParams.get("id")
    if(!id){
        return Response.json({error:"缺少id"},{status:400})
    }
        const {error:msgError}=await supabase
        .from("messages")
        .delete()
        .eq("conversation_id",id)
        if(msgError){
            return Response.json({
                error:msgError.message
            },{
                status:500
            })
        }
        const {error}=await supabase
        .from("conversations")
        .delete()
        .eq("id",id);
        if(error){
            return Response.json({error:error.message},{status:500})
        }
        return Response.json({success:true})
    
}

export async function GET(){

    const { data, error } = await supabase
        .from("conversations")
        .select("id,title,created_at")
        .order("created_at", {
            ascending:true
        });


    console.log("查询结果:", data);
    console.log("查询错误:", error);


    if(error){

        return Response.json(
            {
                error:error.message
            },
            {
                status:500
            }
        );

    }


   return Response.json({

    conversations:data

});

}