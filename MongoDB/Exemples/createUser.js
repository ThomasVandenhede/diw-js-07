db.createUser(
  {
    user: "debile",
    pwd: "123456",
    roles: [
      {
        role: "userAdminAnyDatabase",
        db: "admin"
      }, {
        role: "readWriteAnyDatabase",
        db: "admin"
      }
    ]
  }
)
