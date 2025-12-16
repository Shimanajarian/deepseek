export const maxDuration=60;
import connectToDB from '@/config/db';
import Chat from '@/models/Chat';
import { getAuth } from '@clerk/nextjs/server';
import { OpenRouter } from '@openrouter/sdk';
import { NextResponse } from 'next/server';



const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  },
});

export async function POST(req) {
try{
const {userId}=getAuth(req);
// extract chatId and prompt from the request body
const {chatId,prompt}=await req.json();
if(!userId){
    return NextResponse.json({success:false,message:'User not authenticated'});
}

// Find the chat document in the database basded on chatId and userId
connectToDB()
const data= await Chat.findOne({_id:chatId,userId});
// create a user message object
const userPrompt={
    role:'user',
    content:prompt,
    timestamp:Date.now()
};
data.messages.push(userPrompt);
// call openrouter api to get a chat completion
const completion = await openRouter.chat.send({
  model: 'openai/gpt-4o',
  messages: [
    {
      role: 'user',
      content: prompt,
    },
  ],
  stream: false,
});

const message=completion.choices[0].message;
message.timestamp=Date.now();
data.messages.push(message);
data.save();
return NextResponse.json({success:true,data:message});
    }catch(error){
      return NextResponse.json({success:false,error:error.message});
    }
}