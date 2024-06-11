use('edusynx')
// db.users.find()
db.students.find({},{clas: 1, _id:0})
// db.classes.find()
db.attendances.find()

