const express=require('express');
const app= express();
const port=8080;
const mongoose=require('mongoose');
const Chat=require('./models/chats.js');
const path=require('path');
const methodoverride=require('method-override');
 
app.use(methodoverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));

main()
.then(()=>{ console.log("connection is successful")})
.catch((err)=>{ console.log(err)});

async function main(){
 await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//index route to display all chats
app.get('/chats',async (req,res)=>{
   let chats= await Chat.find({});
   res.render('index.ejs',{chats});
});
//new chat route to create a new chat
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
});
//create route to save new chat to database
app.post('/chats', (req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    console.log(newChat);
    newChat.save()
    .then((res)=>{
        console.log("New chat saved:", res);
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect('/chats');
});
//edit route
app.get('/chats/:id/edit',async (req,res)=>{
    let {id}=req.params;
  let chat=  await Chat.findById(id)
    res.render('edit.ejs',{chat});
});
//update route
app.put('/chats/:id',async (req,res)=>{
    let {id}=req.params;
    let {msg: newmsg}=req.body;
    await Chat.findByIdAndUpdate(id,{msg:newmsg}, {runValidators:true,new: true});
    res.redirect('/chats');
});
//delete route
app.delete('/chats/:id',async (req,res)=>{
    let {id}=req.params;
   let del = await Chat.findByIdAndDelete(id);
console.log("Deleted chat:", del);  
   res.redirect('/chats');
});
//root route
app.get('/',(req,res)=>{
    res.send("Root is working");
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});
