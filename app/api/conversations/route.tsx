import { supabase } from "@/lib/supabase/client";


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