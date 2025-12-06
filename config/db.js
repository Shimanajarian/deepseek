import mongoose from 'mongoose';

let cached=global.mongoose || {conn:null, promise:null};

export async function connectToDB(){
    if(cached.conn)  return cached.conn;
    if(!cached.promise){
        cached.promise=(await mongoose.connect(process.env.MONGODB_URL)).then((mongoose)=>mongoose)
       
    }

try{
    cached.conn=await cached.promise;

}catch(error){
console.error('Error connecting to mongoDB:',error)
}


return cached.conn;

}
export default connectToDB