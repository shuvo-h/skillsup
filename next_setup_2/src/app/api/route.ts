import { NextResponse } from "next/server"

export const GET = async() =>{
    return NextResponse.json({ok:"Okay GET"})
}

export const POST = async(req:Request) =>{
    return NextResponse.json({ok:"Okay POST"})
}

export const DELETE = async() =>{
    return NextResponse.json({ok:"Okay DELETE"})
}

export const PUT = async() =>{
    return NextResponse.json({ok:"Okay PUT"})
}

export const PATCH = async() =>{
    return NextResponse.json({ok:"Okay PATCH"})
}