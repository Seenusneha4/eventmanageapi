const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
var eventmodel=Mongoose.model("events",
new Mongoose.Schema({
    name:String,
    data:String,
    venue:String,
    organiser:String,
    contactno:String
})
)
Mongoose.connect("mongodb+srv://bookapp:3456@cluster0.9e3p4.mongodb.net/EventDb")
app.post("/api/eventapp",(req,res)=>{
    var getname=req.body.name
    var getdate=req.body.date
    var getvenue=req.body.venue
    var getorganiser=req.body.organiser
    var getcontactno=req.body.contactno
   data={"name":getname,"date":getdate,"venue":getvenue,"organiser":getorganiser,"contactno":getcontactno}
   let myevent=new eventmodel(data)
     myevent.save((error,data)=>{
         if(error)
         {
             res.send({"status":"error","data":error})    
 
         }
         else
         {
             res.send({"status":"success","data":data})
         }
 
     })

})

app.get("/api/eventapp",(req,res)=>{
    res.send("welcome")

})

app.listen(6550,(req,res)=>{
    console.log("server running")
})

