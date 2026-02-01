const mongoose=require('mongoose');
const Chat=require('./models/chats.js');
main()
.then(()=>{ console.log("connection is successful")})
.catch((err)=>{ console.log(err)});

async function main(){
 await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
    
Chat.insertMany([
    {
        from:"Charlie",
        to:"Dave",
        msg:"Hey Dave! Charlie here.",
        created_at:new Date(),
    },
    {
        from:"Eve",
        to:"Frank",
        msg:"Hi Frank! It's Eve.",
        created_at:new Date(),
    },
    {
        from:"Grace",
        to:"Heidi",
        msg:"Hello Heidi! Grace speaking.",
        created_at:new Date(),
    }
])
.then((res)=>{
    console.log("Multiple chats inserted:", res);
})
.catch((err)=>{
    console.log(err);
});