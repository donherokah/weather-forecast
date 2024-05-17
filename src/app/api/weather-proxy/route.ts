import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request){
  try{
    const reqBody = await request.json();
    
    const res = await axios.get(`
    https://api.open-meteo.com/v1/forecast?latitude=${reqBody.latitude}&longitude=${reqBody.longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,rain_sum
    `);
    console.log('hi foxy res', res.data);
        
        const response = NextResponse.json(res.data);
        return response;

    } 
    catch(error:any){  
      console.log('no foxy =>',error.response)
        return NextResponse.json({error: error.response.data.reason},{status: error.response.data.statusCode})
    }
}
