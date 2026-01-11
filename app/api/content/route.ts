import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const {title, url, type, source, domain, tags, categoryId} = await req.json();


        return NextResponse.json({
        
    })
    }catch(e){

    }
}

export async function GET(req: NextRequest){
    return NextResponse.json({
        
    })
}